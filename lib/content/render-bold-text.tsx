import { Fragment, type ReactNode } from "react";

/** Renders `**bold**` segments in content strings as <strong>. */
export function renderBoldText(
  text: string,
  strongClassName = "font-semibold text-[#1A1917]"
): ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  if (parts.length === 1) return text;

  return parts.map((part, j) =>
    j % 2 === 1 ? (
      <strong key={j} className={strongClassName}>
        {part}
      </strong>
    ) : (
      <Fragment key={j}>{part}</Fragment>
    )
  );
}
