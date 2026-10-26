import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "ariba@aribajahan.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }
  const { name, email, message, organization, role, company_website: honeypot, ...rest } = body;

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof organization !== "string" || !organization.trim() ||
    typeof role !== "string" || !role.trim() ||
    typeof message !== "string" || message.trim().length < 20
  ) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const detailRows = [
    ["Name", name],
    ["Email", email],
    ["Organization", organization],
    ["Role / Title", role],
    ...Object.entries(rest).filter(([, value]) => typeof value === "string" && value.trim()),
  ]
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;">${escapeHtml(key)}</td><td>${escapeHtml(String(value))}</td></tr>`)
    .join("");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form email service is not configured");
    return NextResponse.json({ ok: false, error: "Failed to send." }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Ariba Jahan Site <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html: `
        <table style="font-family:sans-serif;font-size:14px;">${detailRows}</table>
        <p style="white-space:pre-wrap;margin-top:16px;">${escapeHtml(message)}</p>
      `,
    });
    if (error || !data?.id) {
      console.error("Contact form email was not accepted", { name: error?.name ?? "missing_message_id" });
      return NextResponse.json({ ok: false, error: "Failed to send." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact form email", { name: error instanceof Error ? error.name : "unknown_error" });
    return NextResponse.json({ ok: false, error: "Failed to send." }, { status: 500 });
  }
}
