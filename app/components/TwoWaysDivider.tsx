import wwmContent from "../../content/pages/work-with-me.json";

export default function TwoWaysDivider() {
  return (
    <section className="bg-cream pt-2 pb-20 max-[700px]:pb-14 px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1400px] mx-auto text-center">
        <div className="w-10 h-[3px] bg-cherish mx-auto mb-4" />
        <div className="font-display text-[28px] font-black uppercase tracking-[-0.01em] text-charcoal">
          {wwmContent.twoWaysDivider.heading}
        </div>
      </div>
    </section>
  );
}
