import { NextResponse } from "next/server";
import { checkPagePassword, createPageAccessToken, PAGE_ACCESS_COOKIE } from "../../../lib/pageAccess";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (typeof password !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!checkPagePassword(password)) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  // One cookie for the whole site, so the password is asked for once rather
  // than again on each protected page.
  const response = NextResponse.json({ ok: true });
  response.cookies.set(PAGE_ACCESS_COOKIE, createPageAccessToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
