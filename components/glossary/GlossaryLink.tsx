/**
 * GlossaryLink — server component wrapper for inline glossary tooltips.
 *
 * Usage anywhere in JSX (server or client components):
 *   <GlossaryLink slug="retinol">retinol</GlossaryLink>
 *
 * - Looks up the term from the static glossary data (server-side, zero client bundle cost).
 * - Passes only the needed props to the client tooltip component.
 * - If the slug is not found, renders children as plain text with no tooltip.
 */

import { getGlossaryTerm } from "@/lib/glossary/index";
import { GlossaryTermClient } from "./GlossaryTermClient";

type Props = {
  slug: string;
  children: React.ReactNode;
};

export function GlossaryLink({ slug, children }: Props) {
  const entry = getGlossaryTerm(slug);
  if (!entry) return <>{children}</>;

  return (
    <GlossaryTermClient
      slug={slug}
      term={entry.term}
      shortDesc={entry.shortDescription}
      category={entry.category}
    >
      {children}
    </GlossaryTermClient>
  );
}
