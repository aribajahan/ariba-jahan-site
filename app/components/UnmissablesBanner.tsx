type Props = {
  text: string;
  ctaLabel: string;
  href: string;
};

export default function UnmissablesBanner({ text, ctaLabel, href }: Props) {
  return (
    <section className="bg-charcoal py-16 max-[700px]:py-12 px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[640px] mx-auto text-center">
        <p className="text-[17px] leading-[1.6] max-[700px]:text-[15px] text-cream/70 mb-4">{text}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener"
          className="inline-block text-[15px] font-extrabold tracking-[0.08em] uppercase text-tennis border-b border-tennis pb-[2px] transition-colors duration-150 hover:text-cream hover:border-cream"
        >
          {ctaLabel} →
        </a>
      </div>
    </section>
  );
}
