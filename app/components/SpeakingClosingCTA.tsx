import { closingLinks } from "../data/home";
import speakingContent from "../../content/pages/speaking.json";

export default function SpeakingClosingCTA() {
  const { closingCTA } = speakingContent;

  return (
    <section
      id="close"
      className="bg-cherish pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-[120px] max-[700px]:pb-20 max-[1024px]:pb-24 px-[clamp(24px,5vw,80px)]"
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-14">
          <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] text-cream mb-4">
            {closingCTA.heading}
          </h2>
          <p className="text-[19px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/85 max-w-[520px] mx-auto">
            {closingCTA.subhead}
          </p>
        </div>

        <div className="grid gap-px bg-cream/20 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] max-[700px]:!grid-cols-1 max-[700px]:!gap-0 max-[700px]:!bg-transparent max-[700px]:divide-y max-[700px]:divide-cream/25">
          {closingLinks.map((link, i) => (
            <a
              key={link.index}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener" : undefined}
              className={`relative z-0 bg-cherish border-t-[3px] border-charcoal px-5 pt-9 pb-8 flex flex-col gap-[10px] transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[6px] hover:shadow-[0_16px_26px_-10px_rgba(0,0,0,0.35)] hover:z-[1] active:-translate-y-[2px] active:shadow-[0_8px_14px_-8px_rgba(0,0,0,0.35)] active:z-[1] max-[700px]:border-t-0 max-[700px]:px-0 max-[700px]:py-5 max-[700px]:hover:translate-y-0 max-[700px]:hover:shadow-none max-[700px]:active:translate-y-0 max-[700px]:active:shadow-none ${
                i === closingLinks.length - 1 ? "min-[701px]:max-[1024px]:hidden" : ""
              }`}
            >
              <span className="font-display text-base font-extrabold text-charcoal">
                {link.index}
              </span>
              <span className="font-display text-[19px] font-black uppercase text-cream">
                {link.title}
              </span>
              <span className="text-[15px] font-bold text-cream">{link.cta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
