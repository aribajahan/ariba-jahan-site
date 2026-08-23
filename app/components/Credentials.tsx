import { stats } from "../data/home";

export default function Credentials() {
  return (
    <section className="bg-cherish py-12 px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1200px] mx-auto flex justify-between gap-7 flex-wrap max-[700px]:grid max-[700px]:grid-cols-3 max-[700px]:gap-x-2 max-[700px]:gap-y-5 max-[700px]:text-center">
        {stats.map((s) => (
          <div key={s.label} className="text-center flex-[1_1_120px]">
            <div className="font-display text-[clamp(44px,6vw,72px)] font-black text-cream leading-none tracking-[-0.02em]">
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
