/** Honeypot + basic spam heuristics for public forms */

const BLOCKED_EMAIL_DOMAINS = [
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "10minutemail.com",
];

export function isHoneypotTripped(value: string | undefined | null): boolean {
  return Boolean(value?.trim());
}

export function isSuspiciousSignupEmail(email: string): boolean {
  const lower = email.toLowerCase();
  const domain = lower.split("@")[1] ?? "";
  if (BLOCKED_EMAIL_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`))) {
    return true;
  }
  if (lower.includes("..") || lower.length > 254) return true;
  return false;
}

export function normalizeSaPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("27") && digits.length >= 11) return `+${digits}`;
  if (digits.startsWith("0") && digits.length >= 10) return `+27${digits.slice(1)}`;
  if (digits.length >= 9) return `+27${digits}`;
  return phone.trim();
}

export function isValidSaPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("27")) return digits.length >= 11 && digits.length <= 12;
  if (digits.startsWith("0")) return digits.length === 10;
  return digits.length >= 9 && digits.length <= 11;
}
