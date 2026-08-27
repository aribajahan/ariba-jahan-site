import type { Metadata } from "next";
import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const cards = [
  {
    eyebrow: "Looking to book a talk?",
    title: "See Where I Speak",
    sub: "200+ talks, keynotes, and workshops →",
    href: "/speaking",
  },
  {
    eyebrow: "Need advisory or strategy help?",
    title: "Let's Work Together",
    sub: "CX sprints and 1:1 strategy sessions →",
    href: "/work-with-me",
  },
  {
    eyebrow: "Want something to read?",
    title: "Visit Unmissables",
    sub: "Essays and a podcast on tech, behavior, and culture →",
    href: "https://www.unmissables.xyz/",
    external: true,
  },
];

export default function NotFound() {
  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav />

      <section className="relative overflow-hidden bg-cherish min-h-[100vh] flex items-center pt-[150px] pb-20 max-[700px]:pt-[130px] px-[clamp(24px,5vw,80px)]">
        <div className="absolute top-[60px] left-1/2 -translate-x-1/2 font-display text-[280px] max-[700px]:text-[120px] font-black text-cream/[0.08] leading-none whitespace-nowrap pointer-events-none">
          404
        </div>

        <div className="relative z-[1] max-w-[1100px] mx-auto w-full">
          <div className="text-center mb-14">
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-charcoal mb-4">
              Wrong Turn
            </div>
            <h1 className="font-display text-[48px] max-[700px]:text-[28px] font-black uppercase tracking-[-0.01em] leading-none text-cream mb-[18px]">
              Oops, Nothing Here
            </h1>
            <p className="text-[19px] leading-[1.6] text-cream/85 max-w-[440px] mx-auto">
              But these might be what you were looking for.
            </p>
          </div>

          <div className="grid grid-cols-3 max-[700px]:grid-cols-1 gap-6 mb-11">
            {cards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener" : undefined}
                className="block bg-cream px-[22px] py-7 border-t-[3px] border-charcoal transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[5px]"
              >
                <div className="text-[11px] font-extrabold tracking-[0.15em] uppercase text-cherish mb-[10px]">
                  {card.eyebrow}
                </div>
                <div className="font-display text-[22px] font-black uppercase text-charcoal leading-[1.05] mb-[10px]">
                  {card.title}
                </div>
                <div className="text-[15px] text-charcoal/70">{card.sub}</div>
              </a>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-block bg-cream text-charcoal px-7 py-[14px] text-[15px] font-extrabold tracking-[0.05em] uppercase transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1"
            >
              Or Go Home →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
