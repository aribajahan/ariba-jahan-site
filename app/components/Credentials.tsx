import { stats } from "../data/home";

export default function Credentials() {
  return (
    <section className="bg-cherish py-12 px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1200px] mx-auto flex justify-between gap-7 flex-wrap max-[700px]:flex-nowrap max-[700px]:overflow-x-auto max-[700px]:[scroll-snap-type:x_mandatory] max-[700px]:gap-5 max-[700px]:text-center max-[700px]:-mx-6 max-[700px]:px-6 max-[700px]:pb-1">
        {stats.map((s) => (
          <div
            key={s.label}
            className="text-center flex-[1_1_120px] max-[700px]:flex-shrink-0 max-[700px]:basis-[32vw] max-[700px]:[scroll-snap-align:start]"
          >
            <div className="font-display text-[clamp(44px,6vw,72px)] font-black text-cream leading-none tracking-[-0.02em] max-[700px]:text-[40px]">
              {s.value}
            </div>
            <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-cream/70 mt-2">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
