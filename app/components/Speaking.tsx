import Image from "next/image";
import { speakingPhotos } from "../data/home";

export default function Speaking() {
  return (
    <section id="speaker" className="bg-cream overflow-hidden">
      <div className="flex flex-wrap min-h-[640px] max-w-[1400px] mx-auto">
        <div className="flex-[1_1_420px] px-[clamp(24px,5vw,80px)] pt-[120px] pb-[72px] max-[1024px]:pt-24 max-[1024px]:pb-11 max-[700px]:pt-[70px] flex flex-col justify-start">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-5">
            Speaking &amp; Writing
          </div>
          <div className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase text-charcoal leading-[0.88] tracking-[-0.02em]">
            People + Technology
          </div>

          <div className="hidden max-[1024px]:grid grid-cols-2 gap-[3px] mt-7 mb-2">
            <div className="col-span-2 min-w-0 min-h-0 overflow-hidden relative h-[280px] max-[700px]:h-[220px]">
              <Image quality={90} src={speakingPhotos[0]} alt="Ariba Jahan speaking on stage" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
            </div>
            <div className="min-w-0 min-h-0 overflow-hidden relative h-[165px] max-[700px]:h-[130px]">
              <Image quality={90} src={speakingPhotos[1]} alt="Ariba Jahan speaking on stage" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="min-w-0 min-h-0 overflow-hidden relative h-[165px] max-[700px]:h-[130px]">
              <Image quality={90} src={speakingPhotos[2]} alt="Ariba Jahan speaking on stage" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </div>
          </div>

          <p className="text-base leading-[1.62] text-charcoal/75 mt-7 max-[1024px]:mt-2 mb-[18px]">
            I&rsquo;m interested in the changing relationship between people, technology, and society, and what that means for the things we build. My writing and speaking explore how AI reshapes products, experiences, behavior, expectations, and the way we work, think, and make decisions.
          </p>
          <p className="text-base leading-[1.62] text-charcoal/75 mb-[18px]">
            My writing and speaking explore these shifts from both sides: what new forms of utility, experience, and value become possible, and what we should be more deliberate about preserving as technology takes on more of what people once did themselves.
          </p>
          <p className="text-base leading-[1.62] text-charcoal/75 mb-9">
            I&rsquo;ve delivered 200+ talks, panels, workshops at organizations such as United Nations General Assembly, Google, TikTok, Etsy, Paramount, Vox Media, Interaction Design Conference, Marketing Brew Summit and Leading Design London.
          </p>
          <a
            href="/speaking"
            className="inline-block bg-cherish text-cream px-[30px] py-[14px] max-[700px]:px-[22px] text-xs font-extrabold tracking-[0.1em] uppercase w-fit transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] active:-translate-y-[2px] active:shadow-[0_6px_12px_-6px_rgba(231,49,49,0.6)]"
          >
            Bring Me To Your Event →
          </a>
        </div>

        <div className="max-[1024px]:hidden flex-[1_1_480px] grid grid-cols-2 grid-rows-3 gap-[3px] min-h-[min(500px,88vw)]">
          <div className="row-span-2 min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px] max-[700px]:row-span-1">
            <Image quality={90} src={speakingPhotos[0]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image quality={90} src={speakingPhotos[1]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image quality={90} src={speakingPhotos[2]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image quality={90} src={speakingPhotos[3]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image quality={90} src={speakingPhotos[4]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
