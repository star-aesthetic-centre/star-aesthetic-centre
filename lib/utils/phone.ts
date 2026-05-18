/** Normalize to WhatsApp / E.164 style digits for South Africa (27…). */
export function normalizeZaPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 9) return null;

  if (digits.startsWith("27") && digits.length >= 11) {
    return digits.slice(0, 11);
  }
  if (digits.startsWith("0") && digits.length >= 10) {
    return `27${digits.slice(1, 10)}`;
  }
  if (digits.length === 9) {
    return `27${digits}`;
  }

  return digits.startsWith("27") ? digits : null;
}
