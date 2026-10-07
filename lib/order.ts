import { SITE, REPLY } from '@/config/site';

export interface PaymentDetailField {
  label: string;
  value: string;
}

/**
  Parse a pasted payment detail text block into structured key-value fields.
  Tier 1: "Label: value" lines.
  Tier 2: Known words without colons ("Sort code 00-00-00", "BSB 063-000", "Account 12345678").
  Tier 3: Bare lines become "Detail" or "Wallet Address".
*/
export function parsePaymentDetail(text: string): PaymentDetailField[] {
  if (!text || !text.trim()) return [];

  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const results: PaymentDetailField[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Tier 1: Colon separator
    if (line.includes(':')) {
      const parts = line.split(':');
      const label = parts[0].trim();
      const value = parts.slice(1).join(':').trim();
      if (label && value) {
        results.push({ label, value });
        continue;
      }
    }

    // Tier 2: Common Banking/Crypto patterns
    const bsbMatch = line.match(/BSB\s*[:\-]?\s*([0-9]{3}[\- ]?[0-9]{3})/i);
    if (bsbMatch) {
      results.push({ label: 'BSB Number', value: bsbMatch[1].replace(/\s+/g, '-') });
      continue;
    }

    const acctMatch = line.match(/(Account|Acc)\s*(Number|No|Num)?\s*[:\-]?\s*([0-9]{6,12})/i);
    if (acctMatch) {
      results.push({ label: 'Account Number', value: acctMatch[3] });
      continue;
    }

    const payidMatch = line.match(/(PayID|Osko)\s*[:\-]?\s*([^\s]+)/i);
    if (payidMatch) {
      results.push({ label: 'PayID Mobile/ABN', value: payidMatch[2] });
      continue;
    }

    // Tier 3: Bare line fallback
    const label = lines.length === 1 ? 'Payment Detail' : `Detail #${i + 1}`;
    results.push({ label, value: line });
  }

  return results;
}

export function money(amount: number): string {
  const symbol = REPLY.currency.symbol || '$';
  const locale = REPLY.currency.locale || 'en-AU';
  try {
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return `${symbol}${formatted} AUD`;
  } catch {
    return `${symbol}${amount.toFixed(2)} AUD`;
  }
}

export function paymentMethodParts(methodId: string, amount: number, ref: string) {
  const method = REPLY.paymentMethods.find((m) => m.id === methodId) || REPLY.paymentMethods[0];
  const amtStr = money(amount);

  const opening = method.opening.replace(/\{amount\}/g, amtStr).replace(/\{ref\}/g, ref);
  const closing = method.closing.replace(/\{amount\}/g, amtStr).replace(/\{ref\}/g, ref);

  return { label: method.label, opening, closing };
}

export function paymentTermsLines(ref: string): string[] {
  return [
    `This order is confirmed once payment is received — it is not yet final.`,
    `Use your order reference number — ${ref} — as the description/reference for your payment.`,
    `${REPLY.dispatchLine}`,
    `All electric bike purchases are backed by VYRON Industries 2-Year Frame and 12-Month Electrical Warranty.`,
  ];
}

export function paymentTermsHtml(ref: string): string {
  const lines = paymentTermsLines(ref);
  return lines.map((l) => `<li style="margin-bottom:6px;">${l}</li>`).join('');
}
