"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FeedbackFormConfig } from "../data/feedbackForms";
import { BTN_PRIMARY } from "./buttonStyles";

const fieldClasses =
  "w-full border border-charcoal/15 bg-white px-4 py-3.5 text-base leading-relaxed text-charcoal outline-none shadow-[0_1px_0_rgba(45,45,45,0.04)] transition-[border-color,box-shadow] placeholder:text-charcoal/35 focus:border-cherish focus:shadow-[0_0_0_3px_rgba(231,49,49,0.08)]";

export default function FeedbackForm({ config }: { config: FeedbackFormConfig }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("company_website")) return;

    const responses = Object.fromEntries(
      config.fields.map((field) => [field.id, String(data.get(field.id) ?? "").trim()]),
    );

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: config.id, responses }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true) throw new Error("Submission failed");
      const firstName = responses.name.split(/\s+/)[0];
      window.sessionStorage.setItem("ai-advisory-feedback-first-name", firstName);
      router.push("/feedback/ai-advisory/thank-you");
    } catch {
      setSubmitError("Something went wrong. Please try again or email me at ariba@aribajahan.com.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-x-10 bg-[#fffdf8] px-5 pb-8 shadow-[0_24px_70px_rgba(45,45,45,0.10)] sm:px-10 sm:pb-11 md:grid-cols-2 lg:px-12"
      noValidate={false}
    >
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      <p className="pt-5 text-right text-[12px] text-charcoal/55 md:col-span-2" aria-hidden="true">
        <span className="font-bold text-cherish">*</span> Required
      </p>

      {config.fields.map((field, index) => (
        <div
          key={field.id}
          className={`min-w-0 py-6 sm:py-7 ${
            field.id === "name" || field.id === "email" ? "md:col-span-1" : "md:col-span-2"
          }`}
        >
          <div
            id={`question-${field.id}`}
            className="mb-3 flex w-full items-start gap-4 text-[18px] font-semibold leading-[1.35] text-charcoal sm:text-[19px]"
          >
            <span className="mt-[3px] min-w-6 font-display text-[15px] font-black leading-none tracking-[-0.02em] text-cherish">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              {field.label}
              {field.required && (
                <span className="ml-1 font-bold text-cherish" aria-hidden="true">
                  *
                </span>
              )}
              {!field.required && field.optionalLabel && (
                <span className="ml-2 whitespace-nowrap text-[13px] font-normal text-charcoal/45">
                  {field.optionalLabel}
                </span>
              )}
            </span>
          </div>

          {field.type === "text" && (
            <input
              type="text"
              id={field.id}
              name={field.id}
              aria-labelledby={`question-${field.id}`}
              required={field.required}
              placeholder={field.placeholder}
              className={fieldClasses}
            />
          )}

          {field.type === "email" && (
            <input
              type="email"
              id={field.id}
              name={field.id}
              aria-labelledby={`question-${field.id}`}
              required={field.required}
              placeholder={field.placeholder}
              autoComplete="email"
              className={fieldClasses}
            />
          )}

          {field.type === "textarea" && (
            <textarea
              id={field.id}
              name={field.id}
              aria-labelledby={`question-${field.id}`}
              required={field.required}
              rows={3}
              className={`${fieldClasses} resize-y`}
            />
          )}

          {field.type === "rating" && (
            <div role="radiogroup" aria-labelledby={`question-${field.id}`}>
              <div className="grid max-w-[520px] grid-cols-5 gap-3">
                {Array.from({ length: field.ratingMax ?? 5 }, (_, ratingIndex) => {
                  const rating = String(ratingIndex + 1);
                  return (
                    <label key={rating} className="cursor-pointer">
                      <input
                        type="radio"
                        name={field.id}
                        value={rating}
                        required={field.required}
                        className="peer sr-only"
                      />
                      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/20 bg-white font-semibold text-charcoal transition-[background-color,border-color,color,transform,box-shadow] hover:-translate-y-0.5 hover:border-charcoal/45 hover:shadow-[0_5px_14px_rgba(45,45,45,0.08)] peer-checked:border-cherish peer-checked:bg-cherish peer-checked:text-cream peer-checked:shadow-[0_6px_16px_rgba(231,49,49,0.20)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-cherish">
                        {rating}
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="mt-2.5 flex max-w-[520px] justify-between text-[12px] text-charcoal/50">
                <span>Not useful</span>
                <span>Very useful</span>
              </div>
            </div>
          )}

          {field.type === "radio" && (
            <div
              className="flex max-w-[680px] flex-col gap-1"
              role="radiogroup"
              aria-labelledby={`question-${field.id}`}
            >
              {field.options?.map((option) => (
                <label
                  key={option.value}
                  className="group flex cursor-pointer items-start gap-3 py-2.5 text-charcoal/85 transition-colors hover:text-charcoal"
                >
                  <input
                    type="radio"
                    name={field.id}
                    value={option.value}
                    required={field.required}
                    className="mt-1 h-4 w-4 shrink-0 accent-[var(--cherish)]"
                  />
                  <span className="text-[15px] leading-snug text-charcoal">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="pt-8 sm:pt-10 md:col-span-2">
        <button type="submit" disabled={submitting} className={`${BTN_PRIMARY} max-sm:w-full`}>
          {submitting ? "Sending…" : `${config.submitLabel} →`}
        </button>
        {submitError && (
          <p className="mt-3 max-w-[520px] text-[13px] leading-relaxed text-cherish" role="alert">
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}
