import type { Metadata } from "next";
import Link from "next/link";
import FeedbackForm from "../../components/FeedbackForm";
import { feedbackForms } from "../../data/feedbackForms";

const form = feedbackForms["ai-advisory"];

export const metadata: Metadata = {
  title: "AI advisory feedback",
  description: "Share feedback on an AI advisory session with Ariba Jahan.",
  robots: { index: false, follow: false },
};

export default function AiAdvisoryFeedbackPage() {
  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <header className="relative overflow-hidden border-b-[7px] border-cherish bg-charcoal text-cream">
        <div className="relative z-10 mx-auto flex min-h-[390px] max-w-[1240px] flex-col px-6 pb-10 pt-7 sm:min-h-[440px] sm:px-10 sm:pb-12 sm:pt-10 lg:px-12 lg:py-12">
          <Link
            href="/"
            className="font-display text-[19px] font-black uppercase tracking-[-0.02em] text-cream"
          >
            Ariba Jahan
          </Link>

          <div className="my-auto max-w-[900px] py-14 sm:py-16">
            <h1 className="font-display text-[clamp(54px,10vw,112px)] font-black uppercase leading-[0.86] tracking-[-0.025em]">
              <span className="block">AI Advisory</span>
              <span className="block text-cherish">Feedback</span>
            </h1>
            <p className="mt-7 max-w-[610px] text-[17px] leading-[1.6] text-cream/75 sm:text-[20px]">
              {form.introduction}
            </p>
          </div>
        </div>
      </header>

      <section className="relative px-4 py-10 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1040px]">
          <FeedbackForm config={form} />
        </div>
      </section>
    </main>
  );
}
