import { NextResponse } from "next/server";
import { checkPagePassword, createPageAccessToken, pageAccessCookieName } from "../../../lib/pageAccess";
import { allPageSettings, type PageKey } from "../../../lib/pageSettings";

export async function POST(request: Request) {
  const { pageKey, password } = await request.json();

  if (typeof pageKey !== "string" || !(pageKey in allPageSettings) || typeof password !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!checkPagePassword(pageKey as PageKey, password)) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(pageAccessCookieName(pageKey), createPageAccessToken(pageKey), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
