import Image from "next/image";

export default function SpeakingHero() {
  return (
    <section className="relative flex flex-col justify-end overflow-hidden bg-[#1c1212] min-h-[100vh] max-[700px]:min-h-[92vh]">
      <div className="absolute inset-0 z-0">
        <Image quality={90}
          src="/uploads/54919346180_4cbc9b23fc_b-6f7fbf39-sm.jpg"
          alt="Ariba Jahan speaking on stage"
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
          Speaking
        </div>
        <div className="font-display text-[clamp(34px,4.6vw,68px)] font-black text-cream leading-[0.95] tracking-[-0.02em] max-w-[800px] mb-9">
          The future isn&rsquo;t inevitable.{" "}
          <br className="max-[700px]:hidden" />
          <b className="font-black">
            It reflects what we question, what we build, what we choose to protect and what we&rsquo;re
            willing to take responsibility for
          </b>
          .
        </div>
        <a
          href="#close"
          className="inline-block bg-cherish text-cream px-[30px] py-4 max-[700px]:px-[22px] max-[700px]:py-[13px] text-[15px] max-[700px]:text-[12px] font-extrabold tracking-[0.1em] max-[700px]:tracking-[0.08em] uppercase w-fit pointer-events-auto transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] active:-translate-y-[2px] active:shadow-[0_6px_10px_-6px_rgba(231,49,49,0.6)]"
        >
          Bring Me to Your Event →
        </a>
      </div>
    </section>
  );
}
