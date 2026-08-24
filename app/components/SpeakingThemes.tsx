import Image from "next/image";
import { speakingThemes } from "../data/speaking";

export default function SpeakingThemes() {
  return (
    <section
      id="themes"
      className="bg-cream pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 px-[clamp(24px,5vw,80px)]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-[720px] mb-16 max-[700px]:mb-10">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-[18px]">
            Current Speaking Themes
          </div>
          <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] leading-none text-charcoal mb-5">
            What I Speak About
          </h2>
          <p className="text-[clamp(20px,1.8vw,26px)] leading-[1.4] text-charcoal mb-5 font-bold">
            What happens when technology changes not only what we can build, but how people think,
            behave, work, and decide?
          </p>
          <p className="text-base leading-[1.62] text-charcoal/65">
            My speaking focuses on the relationship between technology, human behavior, and the
            things we build. I&rsquo;m interested in how AI and other shifts in technology reshape
            customer expectations, experiences, judgment, and the way people move through the
            world — and what that means for the products, services, and organizations being
            created in response. For more than fifteen years, I&rsquo;ve spoken at companies,
            universities, and conferences, bringing together research, practical experience, and
            emerging ideas to help people make sense of a rapidly changing world.
          </p>
        </div>

        <div className="flex flex-col border-t border-charcoal/[0.12]">
          {speakingThemes.map((theme, i) => (
            <div
              key={theme.title}
              className={`relative min-h-[300px] max-[700px]:min-h-[380px] overflow-hidden ${
                i < speakingThemes.length - 1 ? "border-b border-charcoal/[0.12]" : ""
              }`}
            >
              <div className="absolute inset-0 z-0">
                <Image quality={90}
                  src={theme.photoSrc}
                  alt={theme.title}
                  fill
                  sizes="(max-width: 700px) 100vw, 1400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, rgba(8,8,12,0.88) 0%, rgba(8,8,12,0.62) 55%, rgba(8,8,12,0.22) 100%)",
                }}
              />
              <div className="relative z-[2] flex items-end justify-between gap-6 flex-wrap h-full py-11 px-11 max-[700px]:px-6 max-[700px]:py-7">
                <div className="max-w-[760px]">
                  <div className="font-display text-[clamp(26px,2.8vw,40px)] font-black uppercase tracking-[-0.01em] leading-[1.02] text-cream mb-[10px]">
                    {theme.title}
                  </div>
                  <p className="text-base italic leading-[1.5] text-cream/[0.82] mb-[14px]">
                    {theme.question}
                  </p>
                  <p className="text-base leading-[1.6] text-cream/[0.72]">{theme.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
