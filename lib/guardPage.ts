import { cookies } from "next/headers";
import { getPageSettings, type PageKey } from "./pageSettings";
import { pageAccessCookieName, verifyPageAccessToken } from "./pageAccess";

export type PageGuardResult = "ok" | "notFound" | "gate";

/**
 * Enforces a page's Availability setting (Draft/Password-protected). Public
 * and Unlisted both resolve to "ok" — Unlisted only affects nav visibility,
 * not whether the page itself is reachable.
 */
export async function guardPage(pageKey: PageKey): Promise<PageGuardResult> {
  const settings = getPageSettings(pageKey);

  if (settings.availability === "draft") return "notFound";

  if (settings.availability === "password") {
    const cookieStore = await cookies();
    const token = cookieStore.get(pageAccessCookieName(pageKey))?.value;
    if (!verifyPageAccessToken(pageKey, token)) return "gate";
  }

  return "ok";
}
