export function formatZAR(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatZARDetailed(cents: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-ZA");
}

export function formatMonthShort(date: Date): string {
  return date.toLocaleString("en-ZA", { month: "short" });
}
