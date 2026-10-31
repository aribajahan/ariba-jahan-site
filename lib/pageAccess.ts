import { createHmac, timingSafeEqual } from "crypto";
import siteAccess from "../content/site-access.json";

const TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

/**
 * One password opens every password-protected page, and entering it once opens
 * all of them — so there is a single cookie rather than one per page.
 */
export const PAGE_ACCESS_COOKIE = "page_access";

/**
 * The signature covers the stored password as well as the expiry, so changing
 * the password in the Studio invalidates every cookie already handed out.
 * Without that, someone let in last week would keep their 30 days after the
 * password was changed, and changing it wouldn't actually shut the door.
 */
export function createPageAccessToken() {
  const payload = `site-access.${Date.now() + TTL_MS}`;
  return `${payload}.${sign(`${payload}.${siteAccess.password}`)}`;
}

export function verifyPageAccessToken(token: string | undefined | null): boolean {
  if (!token) return false;
  if (!siteAccess.password) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [scope, expiresAtStr, signature] = parts;
  if (scope !== "site-access") return false;

  const payload = `${scope}.${expiresAtStr}`;
  const expected = sign(`${payload}.${siteAccess.password}`);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiresAt = Number(expiresAtStr);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

/**
 * The password is stored as an HMAC digest, never as plaintext.
 *
 * content/site-access.json is committed to a PUBLIC repo, so a plaintext
 * password there would be readable by anyone — and permanently, since removing
 * it in a later commit leaves it recoverable in history. The digest is keyed
 * with ADMIN_SESSION_SECRET, which lives only in the server environment, so the
 * committed value is useless without it.
 *
 * One consequence, by design: the stored value can never be turned back into
 * the password. Setting a new one in the Studio overwrites the digest and never
 * asks for the old one, so forgetting it costs nothing beyond telling anyone
 * who had it.
 *
 * Rotating ADMIN_SESSION_SECRET invalidates the password; it has to be
 * re-entered in the Studio afterwards.
 */
export function hashPagePassword(plain: string): string {
  return sign(`page-password.${plain}`);
}

/** A stored value is a digest if it looks like sign() output: 64 hex chars. */
export function isHashedPassword(value: string): boolean {
  return /^[0-9a-f]{64}$/.test(value);
}

export function checkPagePassword(candidate: string): boolean {
  const stored = siteAccess.password;
  if (!stored) return false;
  // A plaintext value is refused outright rather than compared, so a stored
  // password that somehow escaped hashing can't be used to get in.
  if (!isHashedPassword(stored)) return false;
  const a = Buffer.from(hashPagePassword(candidate));
  const b = Buffer.from(stored);
  return a.length === b.length && timingSafeEqual(a, b);
}
