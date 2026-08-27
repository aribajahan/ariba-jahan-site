import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "ariba@aribajahan.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message, company_website: honeypot, ...rest } = body;

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof message !== "string" || message.trim().length < 20) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const detailRows = [
    ["Name", name],
    ["Email", email],
    ...Object.entries(rest).filter(([, value]) => typeof value === "string" && value.trim()),
  ]
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;">${escapeHtml(key)}</td><td>${escapeHtml(String(value))}</td></tr>`)
    .join("");

  try {
    await resend.emails.send({
      from: "Ariba Jahan Site <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html: `
        <table style="font-family:sans-serif;font-size:14px;">${detailRows}</table>
        <p style="white-space:pre-wrap;margin-top:16px;">${escapeHtml(message)}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact form email", error);
    return NextResponse.json({ ok: false, error: "Failed to send." }, { status: 500 });
  }
}
