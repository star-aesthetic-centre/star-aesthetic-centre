import React from 'react';

/**
 * Parses a string with **bold markers** and renders the bolded portions
 * as <strong> elements. This lets treatment copy in treatments.json use
 * **keyword** syntax to highlight key phrases for scanners.
 *
 * Example:
 *   "This is a **bold keyword** in a sentence."
 *   → "This is a " <strong>bold keyword</strong> " in a sentence."
 */
export function RichText({
  text,
  className,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  as?: 'span' | 'p' | 'div';
}) {
  // Split on **...** markers — odd-index parts are the bold content
  const parts = text.split(/\*\*(.*?)\*\*/g);

  return (
    <Tag className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-medium text-[#525866] not-italic">
            {part}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </Tag>
  );
}

/**
 * Convenience wrapper — renders as a <p> tag with standard body styling.
 */
export function RichParagraph({
  text,
  className = 'text-[#636374] leading-relaxed',
}: {
  text: string;
  className?: string;
}) {
  return <RichText text={text} as="p" className={className} />;
}
