"use client";

import { useEffect } from "react";
import { X, Phone, ChevronRight, Mic, MicOff, Loader2, MessageCircle, SkipForward } from "lucide-react";
import { INTRODUCTION_TOUR_SECTIONS } from "@/lib/content/introduction-tour";
import { useNiki } from "./NikiProvider";
import { useNikiVoiceSession } from "./useNikiVoiceSession";
import { nikiGreetingHint } from "@/lib/niki/system-prompt";

export function NikiFloatingWidget() {
  const {
    pageContext,
    isOpen,
    open,
    close,
    introductionTour,
    clearIntroductionTourPendingStart,
    setIntroductionTourSectionIndex,
    endIntroductionTour,
    activateIntroductionTour,
  } = useNiki();
  const session = useNikiVoiceSession(pageContext);

  const hint = nikiGreetingHint(pageContext);
  const isProduct = pageContext.type === "product";
  const isIntroductionTour = introductionTour.active || pageContext.type === "introduction";
  const isSkinAssessment = pageContext.type === "skin-assessment";

  useEffect(() => {
    if (!isOpen && session.isActive) {
      void session.endSession();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isOpen || !introductionTour.pendingStart || session.isRunning) return;
    clearIntroductionTourPendingStart();
    void session.startIntroductionTour();
  }, [
    isOpen,
    introductionTour.pendingStart,
    session.isRunning,
    clearIntroductionTourPendingStart,
    session.startIntroductionTour,
  ]);

  const handleClose = async () => {
    if (session.isRunning) await session.endSession();
    else await session.resetSession();
    if (introductionTour.active) endIntroductionTour();
    close();
  };

  const handleContinueTourSection = () => {
    const next = introductionTour.sectionIndex + 1;
    if (next < INTRODUCTION_TOUR_SECTIONS.length) {
      setIntroductionTourSectionIndex(next);
    }
    session.continueIntroductionTour();
  };

  const handleFabClick = () => {
    if (isOpen) void handleClose();
    else {
      void session.resetSession();
      open();
    }
  };

  const whatsappText = encodeURIComponent(
    pageContext.type === "product" && pageContext.productName
      ? `Hi, I have a question about ${pageContext.productName} from Star Aesthetic Centre.`
      : "Hi, I have a question for Star Aesthetic Centre."
  );

  return (
    <>
      {/* Active call pill — centred */}
      {isOpen && session.isActive && (
        <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 sm:bottom-8">
          <div className="flex items-center gap-4 rounded-full border border-white/10 bg-[#0F2647] px-5 py-3.5 shadow-2xl">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[#C8A882] opacity-20"
                style={{ animationDuration: "1.2s" }}
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#1B3D6E]">
                {session.isMuted ? (
                  <MicOff size={13} className="text-[#C8A882]" />
                ) : (
                  <Mic size={13} className="text-[#C8A882]" />
                )}
              </div>
            </div>
            <span className="whitespace-nowrap text-sm font-medium text-white">
              {session.isMuted
                ? "Muted — Niki is listening"
                : isSkinAssessment
                  ? "Skin assessment — listening…"
                  : isIntroductionTour
                    ? "Introduction tour — listening…"
                    : "Niki is listening…"}
            </span>
            {isIntroductionTour && (
              <button
                type="button"
                onClick={handleContinueTourSection}
                className="rounded-full bg-[#C8A882] px-3.5 py-1.5 text-xs font-semibold text-[#0F2647] transition-colors hover:bg-[#A08060] whitespace-nowrap flex items-center gap-1"
              >
                <SkipForward size={12} />
                Next section
              </button>
            )}
            <button
              type="button"
              onClick={() => session.setIsMuted((m) => !m)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                session.isMuted
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {session.isMuted ? "Unmute" : "Mute"}
            </button>
            <button
              type="button"
              onClick={async () => {
                await session.endSession();
                if (introductionTour.active) endIntroductionTour();
                close();
              }}
              className="rounded-full bg-red-500/20 px-3.5 py-1.5 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/40 whitespace-nowrap"
            >
              End call
            </button>
          </div>
        </div>
      )}

      {/* Chat panel */}
      {isOpen && !session.isActive && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-end p-0 sm:p-4 sm:items-end"
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Niki"
        >
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" onClick={() => void handleClose()} />

          <div
            className="relative flex h-[min(92vh,640px)] w-full flex-col overflow-hidden bg-white shadow-2xl sm:mb-[88px] sm:mr-4 sm:h-auto sm:max-h-[min(85vh,580px)] sm:w-[380px] sm:border sm:border-[#E5E4E0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative shrink-0 bg-gradient-to-br from-[#0F2647] via-[#162E54] to-[#1B3D6E] px-6 pb-6 pt-5">
              <button
                type="button"
                onClick={() => void handleClose()}
                aria-label="Close"
                className="absolute right-4 top-4 p-1 text-white/50 transition-colors hover:text-white"
              >
                <X size={18} />
              </button>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A882]">Star Aesthetic Centre</p>
              <p className="mt-1 font-heading text-xl font-bold text-white">
                {isSkinAssessment ? "Skin Assessment" : "Chat with Niki"}
              </p>
              <p className="mt-1 text-sm text-[#939EBA] leading-snug">{hint}</p>

              {isSkinAssessment && (
                <p className="mt-3 text-xs text-white/80 leading-relaxed">
                  Niki will ask you about your skin concerns, age, skin type, and lifestyle —
                  then recommend the right brand and a personalised regime. Allow microphone
                  access when prompted.
                </p>
              )}

              {isIntroductionTour && (
                <p className="mt-3 text-xs text-white/80 leading-relaxed">
                  Niki announces each section by name, then explains it in plain language. Say
                  &ldquo;no&rdquo; when you have no questions, or tap{" "}
                  <strong className="text-[#C8A882]">Next section</strong> to continue. Allow
                  microphone access when prompted.
                </p>
              )}

              {isProduct && pageContext.productName && (
                <p className="mt-3 line-clamp-2 text-xs text-white/80">
                  Viewing: <span className="font-semibold text-[#C8A882]">{pageContext.productName}</span>
                  {pageContext.productPrice ? ` · ${pageContext.productPrice}` : ""}
                </p>
              )}
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto p-5">
              <div className="mb-5 flex items-center justify-center py-4">
                <div className="relative" style={{ width: 88, height: 88 }}>
                  <span
                    className="absolute inset-0 animate-ping rounded-full bg-[#C8A882] opacity-[0.08]"
                    style={{ animationDuration: "2.4s" }}
                  />
                  <span
                    className="absolute rounded-full bg-[#C8A882] opacity-[0.12]"
                    style={{ inset: 12, animationDuration: "2.4s" }}
                  />
                  <div
                    className="absolute flex items-center justify-center rounded-full bg-[#0F2647] shadow-lg"
                    style={{ inset: 22 }}
                  >
                    {session.isConnecting ? (
                      <Loader2 size={20} className="animate-spin text-[#C8A882]" />
                    ) : (
                      <Mic size={20} className="text-[#C8A882]" />
                    )}
                  </div>
                </div>
              </div>

              <p className="mb-5 text-center text-sm text-[#6B6966] leading-relaxed">
                {session.status === "error"
                  ? session.errorMsg
                  : session.status === "ended"
                    ? "Thanks for chatting! Tap below to start again."
                    : isSkinAssessment
                      ? "Niki will ask about your skin concerns, lifestyle, and health — then recommend the right brand and products for you specifically."
                      : isIntroductionTour
                        ? "Voice-guided introduction — Niki follows the script on this page section by section."
                        : "Voice chat — Niki knows what page you're on and can answer about this product or treatment."}
              </p>

              {isIntroductionTour && introductionTour.active && (
                <div className="mb-4 rounded border border-[#C8A882]/40 bg-[#FFF8F0] px-3 py-2 text-xs text-[#636374]">
                  <p className="font-semibold text-[#0F2647]">
                    Section {introductionTour.sectionIndex + 1} of{" "}
                    {INTRODUCTION_TOUR_SECTIONS.length}:{" "}
                    {INTRODUCTION_TOUR_SECTIONS[introductionTour.sectionIndex]?.title}
                  </p>
                </div>
              )}

              {!session.isRunning ? (
                <button
                  type="button"
                  onClick={() => {
                    if (pageContext.type === "introduction" && !introductionTour.active) {
                      activateIntroductionTour();
                    }
                    void (isSkinAssessment
                      ? session.startSkinAssessment()
                      : isIntroductionTour
                        ? session.startIntroductionTour()
                        : session.startSession());
                  }}
                  className="mb-3 flex w-full items-center justify-center gap-2 bg-[#C8A882] py-3.5 text-sm font-bold text-[#0F2647] transition-colors hover:bg-[#A08060]"
                >
                  <Mic size={16} />
                  {session.status === "error"
                    ? "Try again"
                    : session.status === "ended"
                      ? "Start again"
                      : isSkinAssessment
                        ? "Start skin assessment"
                        : isIntroductionTour
                          ? "Start introduction tour"
                          : "Start voice chat"}
                </button>
              ) : (
                <div className="mb-3 flex items-center justify-center gap-2 py-3.5 text-sm text-[#6B6966]">
                  <Loader2 size={16} className="animate-spin" />
                  Connecting…
                </div>
              )}

              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#E5E4E0]" />
                <span className="text-[10px] uppercase tracking-wider text-[#939EBA]">or</span>
                <div className="h-px flex-1 bg-[#E5E4E0]" />
              </div>

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27315731325"}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 flex items-center justify-between bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1EBD58]"
              >
                <span className="flex items-center gap-2">WhatsApp the clinic</span>
                <ChevronRight size={15} className="opacity-70" />
              </a>

              <a
                href="tel:+27315731325"
                className="mb-2 flex items-center justify-between border border-[#0F2647] px-4 py-3 text-sm font-semibold text-[#0F2647] transition-colors hover:bg-[#0F2647] hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Phone size={15} />
                  Call clinic
                </span>
                <ChevronRight size={15} className="opacity-50" />
              </a>

              <a
                href="/contact"
                className="flex items-center justify-between border border-[#E5E4E0] px-4 py-3 text-sm text-[#6B6966] transition-colors hover:border-[#C8A882]"
              >
                Written enquiry
                <ChevronRight size={15} className="opacity-50" />
              </a>
            </div>

            <p className="shrink-0 border-t border-[#E5E4E0] py-3 text-center text-[10px] text-[#939EBA]">
              Mon–Fri 08:00–17:00 · Sat 08:00–13:00
            </p>
          </div>
        </div>
      )}

      {/* Floating FAB */}
      <div className="fixed bottom-5 right-4 z-[100] sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={handleFabClick}
          aria-label={
            isOpen
              ? "Close chat with Niki"
              : "Chat with Niki — your skin and treatment consultant"
          }
          className={`group relative flex items-stretch overflow-hidden border border-[#A08060]/80 shadow-[0_8px_28px_rgba(200,168,130,0.45)] transition-all duration-300 hover:border-[#8B6F4F] hover:shadow-[0_10px_36px_rgba(200,168,130,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2647] focus-visible:ring-offset-2 ${
            isOpen
              ? "h-12 w-12 justify-center bg-[#0F2647]"
              : "min-h-[52px] max-w-[min(100vw-2rem,280px)] bg-gradient-to-r from-[#D4B896] via-[#C8A882] to-[#B89868] pl-0 pr-4"
          }`}
        >
          {!isOpen && (
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#A08060]/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          )}

          <span
            className={`relative flex shrink-0 items-center justify-center border-r border-[#A08060]/60 bg-[#0F2647] ${
              isOpen ? "h-12 w-12 border-r-0" : "w-12 self-stretch"
            }`}
          >
            {isOpen ? (
              <X size={20} className="text-[#C8A882]" />
            ) : (
              <MessageCircle size={22} className="text-[#C8A882]" strokeWidth={2} />
            )}
          </span>

          {!isOpen && (
            <span className="relative flex flex-col justify-center py-2.5 pl-3 pr-1 text-left">
              <span className="text-[13px] font-bold leading-tight text-[#0F2647]">
                Niki — your skin &amp;
              </span>
              <span className="text-[11px] font-semibold leading-snug text-[#1A1917]/85">
                treatment consultant
              </span>
            </span>
          )}
        </button>
      </div>
    </>
  );
}
