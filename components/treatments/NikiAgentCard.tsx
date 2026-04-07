'use client';

/**
 * NikiAgentCard — Gemini Live API voice session
 *
 * Uses the official @google/genai SDK (v1.45.0).
 * The SDK handles WebSocket setup internally — onopen fires only when
 * the session is truly ready to receive audio.
 *
 * Audio flow:
 *   Browser mic → resample to 16 kHz PCM → session.sendRealtimeInput()
 *   Gemini audio response → 24 kHz PCM → Web Audio API playback
 *
 * Phase 2: Supabase storage + email to Nikita on session end
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Phone, ChevronRight, Mic, MicOff, Loader2 } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';
import type { Session } from '@google/genai';

// ─── Types ────────────────────────────────────────────────────────────────────

type SessionStatus = 'idle' | 'connecting' | 'active' | 'ended' | 'error';

interface NikiAgentCardProps {
  treatmentName?: string;
  treatmentPage?: string;
}

// ─── System prompt ────────────────────────────────────────────────────────────

function buildSystemPrompt(treatmentName?: string): string {
  const ctx = treatmentName
    ? `The visitor is reading about "${treatmentName}" on the Star Aesthetic Centre website. Lead with your knowledge of this treatment — but answer any question about the clinic.`
    : `The visitor is browsing the Star Aesthetic Centre website. Answer any question about treatments or the clinic.`;

  return `You are Niki — a warm, knowledgeable treatment consultant at Star Aesthetic Centre, a medical aesthetic clinic in Durban, South Africa, led by Dr. Bangalee.

IMPORTANT — DR BANGALEE: Dr. Bangalee is male. Always use he/him/his when referring to him. Never say "she" or "her".

IMPORTANT — GREET FIRST: You must speak first as soon as the session opens. Do not wait for the visitor to speak. Greet them warmly and naturally, for example: "Hi! I'm Niki from Star Aesthetic Centre — lovely to meet you! How can I help you today?" Then wait for their response.

IMPORTANT — PRICES: When mentioning prices, always say the number first, then the word "Rand". For example, R 750 is spoken as "750 Rand", R 3500 is "3500 Rand". Never say "R" as a letter or lead with "rand".

${ctx}

YOUR ROLE
- Answer questions about treatments honestly, clearly, and without pressure
- Help visitors understand which treatment suits their concern
- Capture contact details naturally during conversation
- Offer to arrange a callback with Nikita (clinic manager) or a consultation with Dr. Bangalee
- Never diagnose, prescribe, or make medical promises

YOUR PERSONALITY
- Warm, unhurried, and genuinely helpful
- Short sentences, natural conversation — never read lists aloud
- If you don't know something, say so and offer to have the clinic follow up

CONTACT CAPTURE — do this at the RIGHT moment
- Before moving to contact details, ALWAYS ask: "Is there anything else I can help you with today?"
- Only after the visitor says they have no more questions, naturally capture contact details one at a time:
  1. NAME: If you already know their name from the conversation, DO NOT ask again — confirm it: "I already have your name as [name], is that right?" Only ask "May I get your name?" if you genuinely don't know it yet.
  2. "Are you based in Durban, or chatting from elsewhere?"
  3. "What's the best number to reach you on — WhatsApp works too?"
  4. "Would you like a follow-up email with what we discussed?"
- ALWAYS confirm phone and email back to the visitor before moving on:
  - Phone: "Let me just confirm — your number is [read each digit individually and slowly], is that right?"
  - Email: Say the email as one natural word — NEVER spell it letter by letter. Say: "And your email is ignatiusack@gmail.com, correct?" — always include the @ symbol. If the visitor did not clearly say an @ or domain, ask: "Just to confirm — what comes after the @ sign?"
  - If they correct you, update and confirm again
- PHONE NUMBER RULES: When a visitor uses repeated digit words, interpret them as follows:
  - "double zero/one/two/three/four/five/six/seven/eight/nine" = that digit twice (e.g. "double nine" = 99, "double zero" = 00, "double four" = 44)
  - "triple zero/one/two/three/four/five/six/seven/eight/nine" = that digit three times (e.g. "triple eight" = 888, "triple two" = 222)
  - This applies to ALL digits 0 through 9, for both double and triple
  - Always confirm the reconstructed number digit by digit so the visitor can verify
- Never rush this — wait for natural pauses in conversation

BOOKING
"I can arrange for Nikita — our clinic manager — to call you back. When would suit you best?"

TREATMENTS
- Chemical Peel: texture, tone, pigmentation, fine lines. From 850 Rand per session.
- Pigmentation: dark spots, melasma, uneven tone. Medical peels + lightening agents. From 850 Rand.
- Acne: medical programme — peels, Dermapen, prescription homecare. All skin tones. From 850 Rand.
- Excessive Sweating (Hyperhidrosis): Botox to sweat glands. 6–12 month results. From 3500 Rand per area.

RULES
- Keep responses to 2–3 sentences unless more detail is asked for
- Never quote exact session counts or guarantee results
- End warmly: "It was lovely chatting — the team at Star Aesthetic Centre looks forward to meeting you!"`;
}

// ─── Audio helpers ────────────────────────────────────────────────────────────

function resampleAudio(input: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (fromRate === toRate) return input;
  const ratio  = fromRate / toRate;
  const length = Math.round(input.length / ratio);
  const out    = new Float32Array(length);
  for (let i = 0; i < length; i++) out[i] = input[Math.floor(i * ratio)] ?? 0;
  return out;
}

function float32ToBase64Pcm16(input: Float32Array): string {
  const int16 = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]!));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  const bytes  = new Uint8Array(int16.buffer as ArrayBuffer);
  let binary   = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

function base64Pcm16ToFloat32(b64: string): Float32Array {
  const binary = atob(b64);
  const bytes  = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const int16  = new Int16Array(bytes.buffer as ArrayBuffer);
  const float  = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float[i] = int16[i]! / (int16[i]! < 0 ? 0x8000 : 0x7fff);
  }
  return float;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NikiAgentCard({ treatmentName, treatmentPage }: NikiAgentCardProps) {
  const [isOpen,     setIsOpen]     = useState(false);
  const [status,     setStatus]     = useState<SessionStatus>('idle');
  const [isMuted,    setIsMuted]    = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [errorMsg,   setErrorMsg]   = useState('');

  const sessionRef    = useRef<Session | null>(null);
  const streamRef     = useRef<MediaStream | null>(null);
  const micCtxRef     = useRef<AudioContext | null>(null);
  const playCtxRef    = useRef<AudioContext | null>(null);
  const processorRef  = useRef<ScriptProcessorNode | null>(null);
  const nextPlayTime  = useRef(0);
  const startedAtRef  = useRef('');
  const isMutedRef    = useRef(false);

  // Keep ref in sync with state (processor closure reads ref)
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  useEffect(() => () => { void teardown(false); }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // ── Teardown ────────────────────────────────────────────────────────────────
  const teardown = useCallback(async (save = true) => {
    const session = sessionRef.current;
    sessionRef.current = null;  // Null FIRST — stops processor immediately

    processorRef.current?.disconnect();
    streamRef.current?.getTracks().forEach(t => t.stop());
    micCtxRef.current?.close().catch(() => undefined);
    playCtxRef.current?.close().catch(() => undefined);
    session?.close();

    processorRef.current = null;
    streamRef.current    = null;
    micCtxRef.current    = null;
    playCtxRef.current   = null;
    nextPlayTime.current = 0;

    if (save) {
      try {
        await fetch('/api/niki-session', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId:       crypto.randomUUID(),
            treatmentPage:   treatmentPage ?? treatmentName ?? 'unknown',
            transcript:      transcript.join('\n'),
            contact:         {},
            durationSeconds: Math.round((Date.now() - new Date(startedAtRef.current).getTime()) / 1000),
            startedAt:       startedAtRef.current,
          }),
        });
      } catch { /* non-critical */ }
    }
  }, [transcript, treatmentPage, treatmentName]);

  // ── Play audio from Gemini ──────────────────────────────────────────────────
  const playAudio = useCallback((b64: string) => {
    try {
      if (!playCtxRef.current) {
        playCtxRef.current = new AudioContext({ sampleRate: 24000 });
        nextPlayTime.current = 0;
      }
      const ctx = playCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume().catch(() => undefined);

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
      console.warn('Niki audio playback error:', e);
    }
  }, []);

  // ── Start mic stream → sendRealtimeInput ───────────────────────────────────
  const startMic = useCallback(async (_session: Session) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    streamRef.current = stream;

    const ctx = new AudioContext();
    micCtxRef.current = ctx;

    const source    = ctx.createMediaStreamSource(stream);
    const processor = ctx.createScriptProcessor(2048, 1, 1);
    processorRef.current = processor;

    const silence = ctx.createGain();
    silence.gain.value = 0;

    processor.onaudioprocess = (e) => {
      const live = sessionRef.current;
      if (!live || isMutedRef.current) return;
      const input     = e.inputBuffer.getChannelData(0);
      const resampled = resampleAudio(input, ctx.sampleRate, 16000);
      const b64       = float32ToBase64Pcm16(resampled);
      try {
        live.sendRealtimeInput({ audio: { data: b64, mimeType: 'audio/pcm;rate=16000' } });
      } catch {
        // Session closed mid-callback — teardown will clean up
      }
    };

    source.connect(processor);
    processor.connect(silence);
    silence.connect(ctx.destination);
  }, []);

  // ── Start session ───────────────────────────────────────────────────────────
  const startSession = useCallback(async () => {
    setStatus('connecting');
    setErrorMsg('');
    setTranscript([]);
    startedAtRef.current = new Date().toISOString();

    try {
      const res    = await fetch('/api/gemini-token');
      if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);
      const { apiKey } = await res.json() as { apiKey: string };

      const ai = new GoogleGenAI({ apiKey });

      const session = await ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities:       [Modality.AUDIO],
          outputAudioTranscription: {},   // Niki's words → text
          inputAudioTranscription:  {},   // visitor's words → text
          systemInstruction:        buildSystemPrompt(treatmentName),
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Aoede' },
            },
          },
        },
        callbacks: {
          onopen: () => {
            console.log('✅ Niki session open');
          },

          onmessage: (msg) => {
            // Audio playback
            if (msg.data) playAudio(msg.data);

            // Accumulate Niki's words into full sentences (not word-per-line)
            const nikiText = msg.serverContent?.outputTranscription?.text;
            if (nikiText) {
              setTranscript(prev => {
                const last = prev[prev.length - 1];
                if (last?.startsWith('Niki: ')) {
                  return [...prev.slice(0, -1), last + nikiText];
                }
                return [...prev, `Niki: ${nikiText}`];
              });
            }

            // Accumulate visitor's words into full sentences
            const userText = msg.serverContent?.inputTranscription?.text;
            if (userText) {
              setTranscript(prev => {
                const last = prev[prev.length - 1];
                if (last?.startsWith('Visitor: ')) {
                  return [...prev.slice(0, -1), last + ' ' + userText];
                }
                return [...prev, `Visitor: ${userText}`];
              });
            }
          },

          onerror: (err) => {
            console.error('Niki session error:', err);
            setErrorMsg('Connection error — please try again.');
            setStatus('error');
          },

          onclose: (e: CloseEvent) => {
            console.log(`Niki session closed — code: ${e.code}, reason: "${e.reason}"`);
            setStatus('ended');
          },
        },
      });

      // ── connect() resolved — session is safe to use ───────────────────────
      sessionRef.current = session;
      setStatus('active');

      // Trigger Niki to greet first (like a phone call — agent speaks first)
      setTimeout(() => {
        if (sessionRef.current) {
          try {
            sessionRef.current.sendClientContent({
              turns: [{ role: 'user', parts: [{ text: 'hello' }] }],
              turnComplete: true,
            });
          } catch { /* ignore — Niki will greet when visitor speaks */ }
        }
      }, 600);

      // Start mic
      try {
        await startMic(session);
      } catch (micErr) {
        console.error('Mic error:', micErr);
        setErrorMsg('Microphone access denied — please allow mic and try again.');
        setStatus('error');
        return;
      }

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Niki startSession error:', err);
      setErrorMsg(msg.includes('model') ? 'Model unavailable — please try again shortly.' : 'Could not connect — please check your connection.');
      setStatus('error');
    }
  }, [treatmentName, startMic, playAudio]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleOpen  = () => { setIsOpen(true); setTranscript([]); setStatus('idle'); setErrorMsg(''); };
  const handleClose = async () => { await teardown(true); setIsOpen(false); setStatus('idle'); };
  const handleEnd   = async () => { await teardown(true); setStatus('ended'); setIsOpen(false); };
  const toggleMute  = () => setIsMuted(m => !m);

  const isConnecting = status === 'connecting';
  const isActive     = status === 'active';
  const isRunning    = isConnecting || isActive;

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Sidebar card ── */}
      <button
        onClick={handleOpen}
        aria-label="Chat with Niki"
        className="group w-full text-left cursor-pointer overflow-hidden border border-[#E5E4E0] bg-[#F8F8F7] hover:border-[#C8A882] hover:shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A882]"
      >
        <div className="h-0.5 w-full bg-gradient-to-r from-[#C8A882] to-[#A08060]" />

        <div className="px-6 pt-6 pb-0 text-center">
          <p className="text-[#939EBA] text-[10px] uppercase tracking-[0.18em] mb-2">Your personal guide</p>
          <p className="text-[#1A1917] font-semibold text-[15px] leading-snug">Hi — I&apos;m Niki</p>
          <p className="text-[#6B6966] text-sm mt-1 leading-snug">
            {treatmentName
              ? <><span>Ask me anything about</span><br /><span className="text-[#1A1917] font-medium">{treatmentName}</span></>
              : `I'm here whenever you have a question`}
          </p>
        </div>

        {/* Voice orb */}
        <div className="flex items-center justify-center py-8">
          <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
            <span className="absolute inset-0 rounded-full bg-[#C8A882] opacity-[0.07] animate-ping" style={{ animationDuration: '2.4s' }} />
            <span className="absolute rounded-full bg-[#C8A882] opacity-[0.10] animate-ping" style={{ inset: 8, animationDuration: '2.4s', animationDelay: '0.8s' }} />
            <span className="absolute rounded-full bg-[#C8A882] opacity-[0.14] group-hover:opacity-[0.22] transition-opacity duration-500" style={{ inset: 18 }} />
            <div className="absolute rounded-full bg-[#0F2647] group-hover:bg-[#162E54] flex items-center justify-center transition-colors duration-300 shadow-[0_4px_20px_rgba(15,38,71,0.35)]" style={{ inset: 26 }}>
              <Mic size={16} className="text-[#C8A882]" />
            </div>
          </div>
        </div>

        <div className="pb-6 text-center">
          <span className="text-[11px] text-[#939EBA] tracking-[0.12em] uppercase">Tap to chat</span>
        </div>
      </button>

      {/* ── Active state: floating pill — page stays visible ── */}
      {isOpen && isActive && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[#0F2647] rounded-full px-5 py-3.5 flex items-center gap-4 shadow-2xl border border-white/10">
            {/* Pulsating orb */}
            <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#C8A882] opacity-20 animate-ping" style={{ animationDuration: '1.2s' }} />
              <span className="absolute inset-0 rounded-full bg-[#C8A882] opacity-10 animate-ping" style={{ animationDuration: '1.2s', animationDelay: '0.4s' }} />
              <div className="absolute inset-0 rounded-full bg-[#1B3D6E] flex items-center justify-center">
                {isMuted
                  ? <MicOff size={13} className="text-[#C8A882]" />
                  : <Mic    size={13} className="text-[#C8A882]" />}
              </div>
            </div>

            <span className="text-white text-sm font-medium whitespace-nowrap">
              {isMuted ? 'Muted — Niki is listening' : 'Niki is listening…'}
            </span>

            <button
              onClick={toggleMute}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                isMuted
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>

            <button
              onClick={handleEnd}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold bg-red-500/20 text-red-300 hover:bg-red-500/40 transition-colors whitespace-nowrap"
            >
              End call
            </button>
          </div>
        </div>
      )}

      {/* ── Full modal — shown when not yet active (idle / connecting / ended / error) ── */}
      {isOpen && !isActive && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

          <div className="relative bg-white w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Navy header */}
            <div className="relative bg-[#0F2647] px-8 pt-10 pb-8 flex flex-col items-center gap-5">
              <button onClick={handleClose} aria-label="Close" className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1">
                <X size={18} />
              </button>

              {/* Voice orb */}
              <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
                <span className="absolute inset-0 rounded-full bg-[#C8A882] animate-ping"
                  style={{ opacity: 0.07, animationDuration: '2.8s' }} />
                <span className="absolute rounded-full bg-[#C8A882] animate-ping"
                  style={{ inset: 10, opacity: 0.10, animationDuration: '2.8s', animationDelay: '0.6s' }} />
                <span className="absolute rounded-full bg-[#C8A882]" style={{ inset: 22, opacity: 0.18 }} />
                <div className="absolute rounded-full bg-[#1B3D6E] flex items-center justify-center shadow-lg" style={{ inset: 30 }}>
                  {isConnecting
                    ? <Loader2 size={18} className="text-[#C8A882] animate-spin" />
                    : <Mic size={18} className="text-[#C8A882]" />}
                </div>
              </div>

              <div className="text-center">
                <p className="text-white font-bold text-lg leading-tight">Hi — I&apos;m Niki!</p>
                <p className="text-[#939EBA] text-sm mt-1.5 leading-snug">
                  {isConnecting          ? 'Connecting…'
                  : status === 'ended'   ? 'Thanks for chatting!'
                  : status === 'error'   ? (errorMsg || 'Something went wrong')
                  : treatmentName        ? `I can't wait to chat about ${treatmentName}`
                  : `I'm here whenever you have a question`}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 space-y-3">

              {/* Voice button */}
              {!isRunning ? (
                <button
                  onClick={startSession}
                  className="flex items-center justify-center gap-2 w-full bg-[#0F2647] text-white px-5 py-3.5 text-sm font-semibold hover:bg-[#1B3D6E] transition-colors"
                >
                  <Mic size={15} />
                  {status === 'error' ? 'Try again' : status === 'ended' ? 'Chat again with Niki' : 'Start voice chat with Niki'}
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    disabled={isConnecting}
                    className="flex-1 flex items-center justify-center gap-2 border border-[#E5E4E0] text-[#6B6966] px-4 py-3 text-sm font-medium opacity-40 cursor-not-allowed"
                  >
                    <Loader2 size={14} className="animate-spin" /> Connecting…
                  </button>
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-[#E5E4E0]" />
                <span className="text-[11px] text-[#939EBA] uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-[#E5E4E0]" />
              </div>

              <a href="tel:+27315731325"
                className="flex items-center justify-between w-full border border-[#0F2647] text-[#0F2647] px-5 py-3.5 text-sm font-semibold hover:bg-[#0F2647] hover:text-white transition-colors">
                <span className="flex items-center gap-2"><Phone size={15} />Call the Clinic</span>
                <ChevronRight size={15} className="opacity-50" />
              </a>

              <a href="https://wa.me/27315731325?text=Hi%2C%20I%20have%20a%20question%20about%20a%20treatment"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-[#25D366] text-white px-5 py-3.5 text-sm font-semibold hover:bg-[#1EBD58] transition-colors">
                <span className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </span>
                <ChevronRight size={15} className="opacity-60" />
              </a>

              <a href="/contact"
                className="flex items-center justify-between w-full border border-[#E5E4E0] text-[#6B6966] px-5 py-3.5 text-sm hover:border-[#C8A882] hover:text-[#1A1917] transition-colors">
                Send a written enquiry
                <ChevronRight size={15} className="opacity-50" />
              </a>
            </div>

            <p className="text-xs text-[#6B6966] text-center pb-5">
              Mon–Fri 08:00–17:00 · Sat 08:00–13:00
            </p>
          </div>
        </div>
      )}
    </>
  );
}
