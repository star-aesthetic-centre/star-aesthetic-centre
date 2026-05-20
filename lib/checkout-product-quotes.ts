/** Extract informal patient comments from product HTML ("What our patients say" sections). */

export type ProductQuote = {
  quote: string;
  attribution: string;
};

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractPatientQuotes(html: string | null, maxQuotes = 3): ProductQuote[] {
  if (!html) return [];

  const lower = html.toLowerCase();
  const marker = lower.indexOf("what our patients say");
  if (marker < 0) return [];

  const section = html.slice(marker, marker + 12000);
  const quotes: ProductQuote[] = [];
  const tdPattern = /<td[^>]*>([\s\S]*?)<\/td>/gi;
  let match: RegExpExecArray | null;

  while ((match = tdPattern.exec(section)) !== null && quotes.length < maxQuotes) {
    const cell = match[1];
    if (!cell.includes('"') && !cell.includes("&ldquo;")) continue;

    const strongMatch = cell.match(/<strong[^>]*>([\s\S]*?)<\/strong>/i);
    const attribution = strongMatch ? stripHtml(strongMatch[1]) : "";
    let quoteText = cell.replace(/<strong[\s\S]*?<\/strong>/gi, "").trim();
    quoteText = stripHtml(quoteText).replace(/^["']|["']$/g, "").trim();

    if (quoteText.length < 20) continue;
    quotes.push({
      quote: quoteText.length > 220 ? `${quoteText.slice(0, 217)}…` : quoteText,
      attribution: attribution || "Patient feedback",
    });
  }

  return quotes;
}
