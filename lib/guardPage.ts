import { cookies } from "next/headers";
import { getPageSettings, type PageKey } from "./pageSettings";
import { PAGE_ACCESS_COOKIE, verifyPageAccessToken } from "./pageAccess";

export type PageGuardResult = "ok" | "notFound" | "gate";

/**
 * Enforces a page's Availability setting (Draft/Password-protected). Public
 * and Unlisted both resolve to "ok" — Unlisted only affects nav visibility,
 * not whether the page itself is reachable.
 *
 * Availability is per page; the password is not. One password covers every
 * protected page, so unlocking one unlocks the rest.
 */
export async function guardPage(pageKey: PageKey): Promise<PageGuardResult> {
  const settings = getPageSettings(pageKey);

  if (settings.availability === "draft") return "notFound";

  if (settings.availability === "password") {
    const cookieStore = await cookies();
    const token = cookieStore.get(PAGE_ACCESS_COOKIE)?.value;
    if (!verifyPageAccessToken(token)) return "gate";
  }

  return "ok";
}
