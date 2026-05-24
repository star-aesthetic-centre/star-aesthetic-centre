"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { NikiPageContext } from "@/lib/niki/types";
import { NikiFloatingWidget } from "./NikiFloatingWidget";

const defaultContext: NikiPageContext = { type: "general" };

export type IntroductionTourState = {
  active: boolean;
  pendingStart: boolean;
  sectionIndex: number;
};

type NikiContextValue = {
  pageContext: NikiPageContext;
  setPageContext: (ctx: NikiPageContext) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  introductionTour: IntroductionTourState;
  requestIntroductionTour: () => void;
  activateIntroductionTour: () => void;
  setIntroductionTourSectionIndex: (index: number) => void;
  endIntroductionTour: () => void;
  clearIntroductionTourPendingStart: () => void;
  requestSkinAssessment: () => void;
};

const NikiContext = createContext<NikiContextValue | null>(null);

export function useNiki() {
  const ctx = useContext(NikiContext);
  if (!ctx) throw new Error("useNiki must be used within NikiProvider");
  return ctx;
}

export function NikiProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [pageContext, setPageContext] = useState<NikiPageContext>(defaultContext);
  const [isOpen, setIsOpen] = useState(false);
  const [introductionTour, setIntroductionTour] = useState<IntroductionTourState>({
    active: false,
    pendingStart: false,
    sectionIndex: 0,
  });

  const isAdmin = pathname.startsWith("/admin");

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const activateIntroductionTour = useCallback(() => {
    setPageContext({ type: "introduction", introductionTourSectionIndex: 0 });
    setIntroductionTour((prev) => ({
      active: true,
      pendingStart: prev.pendingStart,
      sectionIndex: prev.sectionIndex,
    }));
  }, []);

  const requestIntroductionTour = useCallback(() => {
    setPageContext({ type: "introduction", introductionTourSectionIndex: 0 });
    setIntroductionTour({ active: true, pendingStart: true, sectionIndex: 0 });
    setIsOpen(true);
  }, []);

  const setIntroductionTourSectionIndex = useCallback((index: number) => {
    setIntroductionTour((prev) => ({ ...prev, sectionIndex: index }));
    setPageContext((prev) =>
      prev.type === "introduction" ? { ...prev, introductionTourSectionIndex: index } : prev
    );
  }, []);

  const endIntroductionTour = useCallback(() => {
    setIntroductionTour({ active: false, pendingStart: false, sectionIndex: 0 });
    setPageContext(defaultContext);
  }, []);

  const clearIntroductionTourPendingStart = useCallback(() => {
    setIntroductionTour((prev) => ({ ...prev, pendingStart: false }));
  }, []);

  const requestSkinAssessment = useCallback(() => {
    setPageContext({ type: "skin-assessment" });
    setIsOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      pageContext,
      setPageContext,
      isOpen,
      open,
      close,
      introductionTour,
      requestIntroductionTour,
      activateIntroductionTour,
      setIntroductionTourSectionIndex,
      endIntroductionTour,
      clearIntroductionTourPendingStart,
      requestSkinAssessment,
    }),
    [
      pageContext,
      isOpen,
      open,
      close,
      introductionTour,
      requestIntroductionTour,
      activateIntroductionTour,
      setIntroductionTourSectionIndex,
      endIntroductionTour,
      clearIntroductionTourPendingStart,
      requestSkinAssessment,
    ]
  );

  return (
    <NikiContext.Provider value={value}>
      {children}
      {!isAdmin && <NikiFloatingWidget />}
    </NikiContext.Provider>
  );
}

/** @deprecated Use NikiPageContextBridge */
export { NikiPageContextBridge as NikiPageSetter } from "./NikiPageContextBridge";
