import { recognitionItems, featuredItems, recognitionFeaturesContent, type RecognitionItem } from "../data/about";

function RecognitionRow({ item, isLast }: { item: RecognitionItem; isLast: boolean }) {
  const borderClass = isLast ? "" : "border-b border-charcoal/10";
  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener"
        className={`flex justify-between gap-3 py-[14px] text-base text-charcoal transition-colors duration-150 hover:text-cherish active:text-cherish ${borderClass}`}
      >
        <span>{item.label}</span>
        {item.year && (
          <span className="text-[13px] text-charcoal/40 whitespace-nowrap">{item.year}</span>
        )}
      </a>
    );
  }
  return (
    <div className={`flex justify-between gap-3 py-[14px] ${borderClass}`}>
      <span className="text-base text-charcoal">{item.label}</span>
      {item.year && (
        <span className="text-[13px] text-charcoal/40 whitespace-nowrap">{item.year}</span>
      )}
    </div>
  );
}

export default function RecognitionFeatures() {
  return (
    <section className="bg-cream pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-[120px] max-[700px]:pb-20 max-[1024px]:pb-24 px-[clamp(24px,5vw,80px)] border-t border-charcoal/[0.08]">
      <div className="max-w-[640px] mx-auto mb-14 text-center">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
          {recognitionFeaturesContent.eyebrow}
        </div>
        <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] leading-[1] text-charcoal">
          {recognitionFeaturesContent.heading}
        </h2>
      </div>

      <div className="max-w-[1100px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] max-[1024px]:grid-cols-1 gap-x-16 max-[1024px]:gap-x-8 gap-y-12">
        <div>
          <div className="font-display text-sm font-extrabold tracking-[0.08em] uppercase text-charcoal mb-5 pb-3 border-b border-charcoal/15">
            Recognition
          </div>
          <div className="flex flex-col">
            {recognitionItems.map((item, i) => (
              <RecognitionRow key={item.label} item={item} isLast={i === recognitionItems.length - 1} />
            ))}
          </div>
        </div>

        <div>
          <div className="font-display text-sm font-extrabold tracking-[0.08em] uppercase text-charcoal mb-5 pb-3 border-b border-charcoal/15">
            Featured
          </div>
          <div className="flex flex-col">
            {featuredItems.map((item, i) => (
              <RecognitionRow key={item.label} item={item} isLast={i === featuredItems.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
