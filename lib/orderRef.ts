// Order reference helpers with no server-only imports, so the checkout page can use them without bundling Redis.
// No 0/O/1/I/L - unambiguous when read aloud or typed from an email.
const REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function randomRef(prefix: string, length = 8): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (const b of bytes) out += REF_ALPHABET[b % REF_ALPHABET.length];
  return `${prefix}-${out}`;
}

export function isValidOrderRef(ref: unknown, prefix: string): ref is string {
  return typeof ref === 'string' && new RegExp(`^${prefix}-[A-HJ-NP-Z2-9]{6,10}$`).test(ref);
}
