import Image from "next/image";

export default function WorkWithMeHero() {
  return (
    <section className="relative flex flex-col justify-end overflow-hidden bg-[#1c1212] min-h-[78vh] max-[700px]:min-h-[92vh]">
      <div className="absolute inset-0 z-0">
        <Image quality={90}
          src="/uploads/IMG_9539-opt.jpg"
          alt="Ariba Jahan"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(20,12,12,0.85) 0%, rgba(20,12,12,0.55) 30%, rgba(20,12,12,0.05) 62%), linear-gradient(to bottom, rgba(20,12,12,0.05) 0%, rgba(20,12,12,0.25) 45%, rgba(20,12,12,0.9) 100%)",
        }}
      />
      <div className="relative z-[2] max-w-[1200px] mx-auto w-full px-[clamp(24px,5vw,80px)] pb-20 pt-[210px] pointer-events-none max-[700px]:pt-[130px] max-[700px]:pb-14 max-[1024px]:pt-[160px]">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cream/60 mb-[18px]">
          Work With Me
        </div>
        <div className="font-display text-[clamp(38px,4vw,60px)] font-black text-cream leading-none tracking-[-0.02em] max-w-[1040px]">
          Build unmissable products, services, and experiences that earn a place in people&rsquo;s lives.
        </div>
        <p className="text-[17px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/75 max-w-[640px] mt-[22px]">
          I work with product, growth, and marketing leaders who need a clearer point of view on
          customer value, experience, and how their products or services should evolve.
        </p>
        <div className="flex flex-wrap gap-4 mt-8 pointer-events-auto">
          <a
            href="#cx-sprint"
            className="inline-block bg-cherish text-cream px-7 py-[15px] max-[700px]:px-[20px] max-[700px]:py-[12px] text-[15px] max-[700px]:text-[12px] font-extrabold tracking-[0.1em] max-[700px]:tracking-[0.08em] uppercase whitespace-nowrap transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] active:-translate-y-[2px] active:shadow-[0_6px_10px_-6px_rgba(231,49,49,0.6)]"
          >
            Explore Sprints
          </a>
          <a
            href="#strategy-sessions"
            className="inline-block bg-transparent text-cream px-7 py-[15px] max-[700px]:px-[20px] max-[700px]:py-[12px] text-[15px] max-[700px]:text-[12px] font-extrabold tracking-[0.1em] max-[700px]:tracking-[0.08em] uppercase whitespace-nowrap border-[1.5px] border-cream/50 transition-[border-color,background] duration-150 hover:border-cream hover:bg-cream/[0.08] active:border-cream active:bg-cream/[0.08]"
          >
            Book a Strategy Session
          </a>
        </div>
      </div>
    </section>
  );
}
