import { createHmac, timingSafeEqual } from "crypto";
import { allPageSettings, type PageKey } from "./pageSettings";

const TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function pageAccessCookieName(pageKey: string) {
  return `page_access_${pageKey}`;
}

export function createPageAccessToken(pageKey: string) {
  const payload = `${pageKey}.${Date.now() + TTL_MS}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyPageAccessToken(pageKey: string, token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [tokenPageKey, expiresAtStr, signature] = parts;
  if (tokenPageKey !== pageKey) return false;

  const payload = `${tokenPageKey}.${expiresAtStr}`;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiresAt = Number(expiresAtStr);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

/**
 * Page passwords are stored as an HMAC digest, never as plaintext.
 *
 * content/page-settings.json is committed to a PUBLIC repo, so a plaintext
 * password there would be readable by anyone — and permanently, since removing
 * it in a later commit leaves it recoverable in history. The digest is keyed
 * with ADMIN_SESSION_SECRET, which lives only in the server environment, so the
 * committed value is useless without it.
 *
 * Rotating ADMIN_SESSION_SECRET invalidates every page password; they have to
 * be re-entered in the Studio afterwards.
 */
export function hashPagePassword(plain: string): string {
  return sign(`page-password.${plain}`);
}

/** A stored value is a digest if it looks like sign() output: 64 hex chars. */
export function isHashedPassword(value: string): boolean {
  return /^[0-9a-f]{64}$/.test(value);
}

export function checkPagePassword(pageKey: PageKey, candidate: string): boolean {
  const settings = allPageSettings[pageKey];
  if (!settings || !settings.password) return false;
  // Legacy plaintext entries are refused outright rather than compared. There
  // are none today (every password field is empty), and failing closed keeps a
  // stale plaintext value from staying usable after this change.
  if (!isHashedPassword(settings.password)) return false;
  const a = Buffer.from(hashPagePassword(candidate));
  const b = Buffer.from(settings.password);
  return a.length === b.length && timingSafeEqual(a, b);
}
