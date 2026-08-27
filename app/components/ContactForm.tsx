"use client";

import Image from "next/image";
import { useState } from "react";
import {
  advisoryTeamSizeOptions,
  advisoryTimelineOptions,
  contactPhotoSrc,
  reasonOptions,
  speakingBudgetOptions,
  speakingFormatOptions,
  type ContactReason,
} from "../data/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClasses = (hasError: boolean) =>
  `w-full px-4 py-[14px] border bg-white text-base text-charcoal font-body ${
    hasError ? "border-cherish" : "border-charcoal/20"
  }`;

const labelClasses =
  "block text-[13px] font-bold tracking-[0.06em] uppercase text-charcoal mb-2";

const errorClasses = "text-xs text-cherish mt-[6px]";

const detailBoxClasses = "bg-[#f2efe6] p-6 flex flex-col gap-5";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [reason, setReason] = useState<ContactReason | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const nameError = touched.name && !name.trim();
  const emailError = touched.email && !EMAIL_RE.test(email);
  const messageError = touched.message && message.trim().length < 20;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("company_website")) return; // silently drop bot submissions

    const payload = Object.fromEntries(data.entries());
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center px-[clamp(24px,5vw,80px)] pt-[150px] pb-20">
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 min-[701px]:grid-cols-[1.3fr_0.9fr] gap-[72px] items-start">
        <div className="max-w-[640px]">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
            Get In Touch
          </div>
          <h1 className="font-display text-[48px] max-[700px]:text-[32px] font-black uppercase tracking-[-0.01em] leading-none text-charcoal mb-5">
            Let&apos;s Talk
          </h1>
          <p className="text-[19px] leading-[1.6] text-charcoal/70 max-w-[520px] mb-12">
            Speaking, advisory, or something else entirely. Tell me what&apos;s on your mind and I&apos;ll get back to you within a few days.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />

              <div>
                <label className={labelClasses}>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  className={fieldClasses(nameError)}
                />
                {nameError && <div className={errorClasses}>Please enter your name.</div>}
              </div>

              <div>
                <label className={labelClasses}>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  className={fieldClasses(emailError)}
                />
                {emailError && <div className={errorClasses}>Please enter a valid email address.</div>}
              </div>

              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <label className={labelClasses}>Organization</label>
                  <input type="text" name="organization" placeholder="Where you work (optional)" className={fieldClasses(false)} />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className={labelClasses}>Role / Title</label>
                  <input type="text" name="role" placeholder="Your title (optional)" className={fieldClasses(false)} />
                </div>
              </div>

              <div>
                <label className={labelClasses}>How can I help?</label>
                <select
                  required
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value as ContactReason)}
                  className={fieldClasses(false)}
                >
                  <option value="">Select one</option>
                  {reasonOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {reason === "speaking" && (
                <div className={detailBoxClasses}>
                  <div className="text-[13px] font-bold tracking-[0.06em] uppercase text-cherish">
                    A few details for speaking requests
                  </div>
                  <div>
                    <label className={labelClasses}>Event Name</label>
                    <input type="text" name="eventName" required placeholder="e.g. Marketing Brew Summit" className={fieldClasses(false)} />
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <label className={labelClasses}>Event Date</label>
                      <input type="date" name="eventDate" required className={fieldClasses(false)} />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className={labelClasses}>Format</label>
                      <select required name="eventFormat" className={fieldClasses(false)}>
                        <option value="">Select one</option>
                        {speakingFormatOptions.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Speaking Budget</label>
                    <select required name="speakingBudget" className={fieldClasses(false)}>
                      <option value="">Select a range</option>
                      {speakingBudgetOptions.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {reason === "advisory" && (
                <div className={detailBoxClasses}>
                  <div className="text-[13px] font-bold tracking-[0.06em] uppercase text-cherish">
                    A few details for advisory requests
                  </div>
                  <div>
                    <label className={labelClasses}>Company Name</label>
                    <input type="text" name="companyName" required className={fieldClasses(false)} />
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <label className={labelClasses}>Team Size</label>
                      <select required name="teamSize" className={fieldClasses(false)}>
                        <option value="">Select one</option>
                        {advisoryTeamSizeOptions.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className={labelClasses}>Timeline</label>
                      <select required name="timeline" className={fieldClasses(false)}>
                        <option value="">Select one</option>
                        {advisoryTimelineOptions.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {reason === "press" && (
                <div className={detailBoxClasses}>
                  <div className="text-[13px] font-bold tracking-[0.06em] uppercase text-cherish">
                    A few details for press &amp; media
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <label className={labelClasses}>Outlet / Publication</label>
                      <input type="text" name="outlet" required className={fieldClasses(false)} />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className={labelClasses}>Deadline</label>
                      <input type="date" name="pressDeadline" className={fieldClasses(false)} />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className={labelClasses}>Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me a bit more on how I can help or how we might work together."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  className={fieldClasses(messageError)}
                />
                {messageError && (
                  <div className={errorClasses}>Say a little more so I know how to help (20+ characters).</div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="self-start bg-cherish text-cream px-[34px] py-4 text-[15px] font-extrabold tracking-[0.08em] uppercase transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {submitting ? "Sending…" : "Send Message →"}
                </button>
                {submitError && (
                  <div className={errorClasses}>
                    Something went wrong sending that — please try again, or email me directly at{" "}
                    <a href="mailto:ariba@aribajahan.com" className="underline">
                      ariba@aribajahan.com
                    </a>
                    .
                  </div>
                )}
              </div>
            </form>
          ) : (
            <div className="bg-charcoal px-10 py-11">
              <div className="font-display text-[28px] font-black uppercase text-cream mb-3">Got It.</div>
              <p className="text-[17px] text-cream/80">Thanks so much for reaching out, I&apos;ll be in touch soon.</p>
            </div>
          )}
        </div>

        <div className="sticky top-[150px] max-[700px]:static max-[700px]:order-[-1] max-[700px]:max-w-[280px]">
          <div className="aspect-[4/5] overflow-hidden">
            <Image
              quality={90}
              src={contactPhotoSrc}
              alt="Ariba Jahan"
              width={480}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
