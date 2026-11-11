import { NextResponse } from "next/server";
import { feedbackForms, type FeedbackFormId } from "../../data/feedbackForms";

const MAX_BODY_BYTES = 20_000;

function isFeedbackFormId(value: unknown): value is FeedbackFormId {
  return typeof value === "string" && value in feedbackForms;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const { formId, responses } = body as { formId?: unknown; responses?: unknown };
  if (!isFeedbackFormId(formId) || !responses || typeof responses !== "object" || Array.isArray(responses)) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const config = feedbackForms[formId];
  const cleanResponses: Record<string, string> = {};

  for (const field of config.fields) {
    const rawValue = (responses as Record<string, unknown>)[field.id];
    const value = typeof rawValue === "string" ? rawValue.trim() : "";

    if (field.required && !value) {
      return NextResponse.json({ ok: false, error: "Please complete every required question." }, { status: 400 });
    }
    if (value.length > 4_000) {
      return NextResponse.json({ ok: false, error: "One of the responses is too long." }, { status: 400 });
    }
    if (field.type === "rating") {
      const rating = Number(value);
      if (!Number.isInteger(rating) || rating < 1 || rating > (field.ratingMax ?? 5)) {
        return NextResponse.json({ ok: false, error: "Invalid rating." }, { status: 400 });
      }
    }
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }
    if (field.type === "radio" && value && !field.options?.some((option) => option.value === value)) {
      return NextResponse.json({ ok: false, error: "Invalid selection." }, { status: 400 });
    }

    cleanResponses[field.id] = value;
  }

  const webhookUrl = process.env.FEEDBACK_WEBHOOK_URL;
  const webhookSecret = process.env.FEEDBACK_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) {
    console.error("Feedback collection is not configured");
    return NextResponse.json({ ok: false, error: "Feedback collection is unavailable." }, { status: 503 });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: webhookSecret,
        formId,
        submittedAt: new Date().toISOString(),
        responses: cleanResponses,
      }),
      redirect: "follow",
      cache: "no-store",
    });

    const result = await webhookResponse.json().catch(() => null);
    if (!webhookResponse.ok || result?.ok !== true) {
      console.error("Feedback webhook rejected a submission", { status: webhookResponse.status });
      return NextResponse.json({ ok: false, error: "Failed to save feedback." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Feedback webhook failed", { name: error instanceof Error ? error.name : "unknown_error" });
    return NextResponse.json({ ok: false, error: "Failed to save feedback." }, { status: 500 });
  }
}
