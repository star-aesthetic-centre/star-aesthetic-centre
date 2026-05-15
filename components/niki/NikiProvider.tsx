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

type NikiContextValue = {
  pageContext: NikiPageContext;
  setPageContext: (ctx: NikiPageContext) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
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

  const isAdmin = pathname.startsWith("/admin");

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ pageContext, setPageContext, isOpen, open, close }),
    [pageContext, isOpen, open, close]
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
