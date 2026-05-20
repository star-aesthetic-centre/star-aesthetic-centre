"use client";

import { useEffect } from "react";
import { useNiki } from "./NikiProvider";
import type { NikiPageContext } from "@/lib/niki/types";

const defaultContext: NikiPageContext = { type: "general" };

/** Injects page-aware context for Niki (product, treatment, etc.). */
export function NikiPageContextBridge(context: NikiPageContext) {
  const { setPageContext } = useNiki();

  useEffect(() => {
    setPageContext(context);
    return () => setPageContext(defaultContext);
  }, [
    setPageContext,
    context.type,
    context.treatmentName,
    context.treatmentPage,
    context.productName,
    context.productBrand,
    context.productPrice,
    context.productSummary,
    context.productSlug,
    context.introductionTourSectionIndex,
  ]);

  return null;
}
