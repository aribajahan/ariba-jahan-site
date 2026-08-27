import { NextResponse } from "next/server";
import { checkCredentials, createSessionToken, SESSION_COOKIE } from "../../../../lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (typeof username !== "string" || typeof password !== "string" || !checkCredentials(username, password)) {
    return NextResponse.json({ ok: false, error: "Incorrect username or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
