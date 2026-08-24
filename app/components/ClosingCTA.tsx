import { closingLinks } from "../data/home";

export default function ClosingCTA() {
  return (
    <section
      id="close"
      className="bg-charcoal pt-[120px] max-[1024px]:pt-24 max-[700px]:pt-[70px] pb-[120px] max-[1024px]:pb-24 max-[700px]:pb-20 px-[clamp(24px,5vw,80px)] border-t border-cream/[0.08]"
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-14">
          <div className="font-display text-[48px] max-[700px]:text-[32px] font-black uppercase tracking-[-0.01em] text-cream mb-4">
            Let&rsquo;s Work Together
          </div>
          <p className="text-[19px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/65 max-w-[500px] mx-auto">
            I&rsquo;m open to full-time roles, speaking engagements, consulting, advisory work, and the occasional very good conversation.
          </p>
        </div>

        <div className="grid gap-px bg-cream/[0.12] [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] max-[700px]:!grid-cols-1 max-[700px]:!gap-0 max-[700px]:!bg-transparent max-[700px]:divide-y max-[700px]:divide-cream/15">
          {closingLinks.map((link) => (
            <a
              key={link.index}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener" : undefined}
              className="relative z-0 bg-charcoal border-t-[3px] border-cherish px-5 pt-9 pb-8 flex flex-col gap-[10px] transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[6px] hover:shadow-[0_16px_26px_-10px_rgba(0,0,0,0.5)] hover:z-[1] active:-translate-y-[2px] active:shadow-[0_8px_14px_-8px_rgba(0,0,0,0.5)] active:z-[1] max-[700px]:border-t-0 max-[700px]:px-0 max-[700px]:py-5 max-[700px]:hover:translate-y-0 max-[700px]:hover:shadow-none max-[700px]:active:translate-y-0 max-[700px]:active:shadow-none"
            >
              <span className="font-display text-base font-extrabold text-cherish">
                {link.index}
              </span>
              <span className="font-display text-[19px] font-black uppercase text-cream">
                {link.title}
              </span>
              <span className="text-[15px] font-bold text-cherish">{link.cta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
