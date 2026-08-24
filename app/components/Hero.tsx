import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-end overflow-hidden bg-[#1c1212] min-h-[100vh] max-[700px]:min-h-[78vh]">
      <div className="absolute inset-0 z-0">
        <Image quality={90}
          src="/assets/hero-photo.jpg"
          alt="Ariba Jahan"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "85% 0%" }}
          className="max-[700px]:![object-position:38%_25%]"
        />
      </div>
      {/* heroOverlay: gradient scrim for text legibility over the photo */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(15,10,10,0.85) 0%, rgba(15,10,10,0.35) 45%, rgba(15,10,10,0.05) 75%)",
        }}
      />
      <div className="relative z-[2] max-w-[1200px] mx-auto w-full px-[clamp(24px,5vw,80px)] pb-16 pt-[210px] pointer-events-none max-[700px]:pt-[160px] max-[700px]:px-6">
        <Image quality={90}
          src="/assets/wordmark-large-white.png"
          alt="Ariba Jahan"
          width={1200}
          height={260}
          priority
          className="w-full h-auto mb-5 block max-[700px]:w-[80%]"
        />
        <p className="max-w-[650px] text-[clamp(18px,1.6vw,22px)] font-medium leading-[1.58] text-cream/[0.82] mb-11 max-[700px]:leading-[1.35]">
          I help organizations figure out how to be unmissable and what to build when technology, customer behavior, and expectations are all changing at once.
        </p>
        <div className="flex items-center gap-8 flex-wrap pointer-events-auto max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-5">
          <a
            href="#work-with-me"
            className="text-[15px] font-bold tracking-[0.12em] uppercase text-cream border-b-2 border-cherish pb-[3px] whitespace-nowrap transition-colors hover:text-cherish active:text-cherish/80 max-[700px]:text-[12px] max-[700px]:tracking-[0.08em]"
          >
            Work With Me
          </a>
          <a
            href="#unmissables"
            className="text-[15px] font-bold tracking-[0.12em] uppercase text-cream border-b-2 border-cherish pb-[3px] transition-colors hover:text-cherish active:text-cherish/80 max-[700px]:text-[12px] max-[700px]:tracking-[0.08em]"
          >
            Read Unmissables
          </a>
        </div>
      </div>
    </section>
  );
}
