"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GoogleGenAI, Modality } from "@google/genai";
import type { Session } from "@google/genai";
import type { NikiPageContext, NikiSessionStatus } from "@/lib/niki/types";
import { buildNikiSystemPrompt } from "@/lib/niki/system-prompt";
import { resampleAudio, float32ToBase64Pcm16, base64Pcm16ToFloat32 } from "@/lib/niki/audio";

export function useNikiVoiceSession(pageContext: NikiPageContext) {
  const [status, setStatus] = useState<NikiSessionStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const sessionRef = useRef<Session | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const micCtxRef = useRef<AudioContext | null>(null);
  const playCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextPlayTime = useRef(0);
  const startedAtRef = useRef("");
  const isMutedRef = useRef(false);
  const contextRef = useRef(pageContext);

  useEffect(() => {
    contextRef.current = pageContext;
  }, [pageContext]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const teardown = useCallback(async (save = true, transcriptSnapshot: string[]) => {
    const session = sessionRef.current;
    sessionRef.current = null;

    processorRef.current?.disconnect();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    micCtxRef.current?.close().catch(() => undefined);
    playCtxRef.current?.close().catch(() => undefined);
    session?.close();

    processorRef.current = null;
    streamRef.current = null;
    micCtxRef.current = null;
    playCtxRef.current = null;
    nextPlayTime.current = 0;

    if (save && transcriptSnapshot.length > 0) {
      const ctx = contextRef.current;
      try {
        await fetch("/api/niki-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: crypto.randomUUID(),
            treatmentPage:
              ctx.productSlug
                ? `product:${ctx.productSlug}`
                : ctx.treatmentPage ?? ctx.treatmentName ?? ctx.productName ?? "general",
            transcript: transcriptSnapshot.join("\n"),
            contact: {},
            durationSeconds: startedAtRef.current
              ? Math.round((Date.now() - new Date(startedAtRef.current).getTime()) / 1000)
              : 0,
            startedAt: startedAtRef.current,
          }),
        });
      } catch {
        /* non-critical */
      }
    }
  }, []);

  const playAudio = useCallback((b64: string) => {
    try {
      if (!playCtxRef.current) {
        playCtxRef.current = new AudioContext({ sampleRate: 24000 });
        nextPlayTime.current = 0;
      }
      const ctx = playCtxRef.current;
      if (ctx.state === "suspended") ctx.resume().catch(() => undefined);

      const pcm = base64Pcm16ToFloat32(b64);
      const buf = ctx.createBuffer(1, pcm.length, 24000);
      buf.copyToChannel(pcm as Float32Array<ArrayBuffer>, 0);

      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);

      const startAt = Math.max(ctx.currentTime, nextPlayTime.current);
      src.start(startAt);
      nextPlayTime.current = startAt + buf.duration;
    } catch (e) {
      console.warn("Niki audio playback error:", e);
    }
  }, []);

  const startMic = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    streamRef.current = stream;

    const ctx = new AudioContext();
    micCtxRef.current = ctx;

    const source = ctx.createMediaStreamSource(stream);
    const processor = ctx.createScriptProcessor(2048, 1, 1);
    processorRef.current = processor;

    const silence = ctx.createGain();
    silence.gain.value = 0;

    processor.onaudioprocess = (e) => {
      const live = sessionRef.current;
      if (!live || isMutedRef.current) return;
      const input = e.inputBuffer.getChannelData(0);
      const resampled = resampleAudio(input, ctx.sampleRate, 16000);
      const b64 = float32ToBase64Pcm16(resampled);
      try {
        live.sendRealtimeInput({ audio: { data: b64, mimeType: "audio/pcm;rate=16000" } });
      } catch {
        /* session closed */
      }
    };

    source.connect(processor);
    processor.connect(silence);
    silence.connect(ctx.destination);
  }, []);

  const startSession = useCallback(async () => {
    setStatus("connecting");
    setErrorMsg("");
    setTranscript([]);
    startedAtRef.current = new Date().toISOString();

    try {
      const res = await fetch("/api/gemini-token");
      if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);
      const { apiKey } = (await res.json()) as { apiKey: string };

      const ai = new GoogleGenAI({ apiKey });
      const ctx = contextRef.current;

      const session = await ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          systemInstruction: buildNikiSystemPrompt(ctx),
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Aoede" },
            },
          },
        },
        callbacks: {
          onopen: () => undefined,
          onmessage: (msg) => {
            if (msg.data) playAudio(msg.data);

            const nikiText = msg.serverContent?.outputTranscription?.text;
            if (nikiText) {
              setTranscript((prev) => {
                const last = prev[prev.length - 1];
                if (last?.startsWith("Niki: ")) {
                  return [...prev.slice(0, -1), last + nikiText];
                }
                return [...prev, `Niki: ${nikiText}`];
              });
            }

            const userText = msg.serverContent?.inputTranscription?.text;
            if (userText) {
              setTranscript((prev) => {
                const last = prev[prev.length - 1];
                if (last?.startsWith("Visitor: ")) {
                  return [...prev.slice(0, -1), `${last} ${userText}`];
                }
                return [...prev, `Visitor: ${userText}`];
              });
            }
          },
          onerror: () => {
            setErrorMsg("Connection error — please try again.");
            setStatus("error");
          },
          onclose: () => {
            setStatus("ended");
          },
        },
      });

      sessionRef.current = session;
      setStatus("active");

      setTimeout(() => {
        if (sessionRef.current) {
          try {
            sessionRef.current.sendClientContent({
              turns: [{ role: "user", parts: [{ text: "hello" }] }],
              turnComplete: true,
            });
          } catch {
            /* ignore */
          }
        }
      }, 600);

      try {
        await startMic();
      } catch {
        setErrorMsg("Microphone access denied — please allow mic and try again.");
        setStatus("error");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(
        msg.includes("model")
          ? "Model unavailable — please try again shortly."
          : "Could not connect — please check your connection."
      );
      setStatus("error");
    }
  }, [playAudio, startMic]);

  const endSession = useCallback(async () => {
    const snap = [...transcript];
    await teardown(true, snap);
    setStatus("ended");
  }, [teardown, transcript]);

  const resetSession = useCallback(async () => {
    const snap = [...transcript];
    await teardown(false, snap);
    setStatus("idle");
    setTranscript([]);
    setErrorMsg("");
  }, [teardown, transcript]);

  useEffect(() => {
    return () => {
      void teardown(false, []);
    };
  }, [teardown]);

  return {
    status,
    isMuted,
    setIsMuted,
    transcript,
    errorMsg,
    startSession,
    endSession,
    resetSession,
    isConnecting: status === "connecting",
    isActive: status === "active",
    isRunning: status === "connecting" || status === "active",
  };
}
