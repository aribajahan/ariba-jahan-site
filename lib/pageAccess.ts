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

export function checkPagePassword(pageKey: PageKey, candidate: string): boolean {
  const settings = allPageSettings[pageKey];
  if (!settings || !settings.password) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(settings.password);
  return a.length === b.length && timingSafeEqual(a, b);
}
