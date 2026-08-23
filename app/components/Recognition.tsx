import Image from "next/image";
import { recognitionItems } from "../data/home";

export default function Recognition() {
  return (
    <section className="bg-cream overflow-hidden relative z-10">
      <div className="flex flex-wrap min-h-[520px]">
        <div className="flex-[1_1_380px] min-h-[min(420px,80vw)] min-w-0 overflow-hidden relative">
          <Image
            src="/uploads/603A5509-opt.jpg"
            alt="Ariba Jahan receiving an award"
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex-[1_1_480px] px-[clamp(24px,5vw,80px)] py-[72px] flex flex-col justify-center bg-charcoal">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
            Credentials
          </div>
          <div className="font-display text-[48px] max-[700px]:text-[32px] font-black uppercase tracking-[-0.01em] mb-9 text-cream">
            Recognition
          </div>
          <div className="flex flex-col">
            {recognitionItems.map((item, i) => (
              <div
                key={item}
                className={`text-[17px] font-semibold text-cream leading-[1.3] py-4 ${
                  i < recognitionItems.length - 1 ? "border-b border-cream/[0.12]" : ""
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <a
            href="/about"
            className="inline-block mt-7 text-[15px] font-bold tracking-[0.12em] uppercase text-cherish border-b border-cherish pb-[1px] w-fit"
          >
            View all recognition →
          </a>
        </div>
      </div>
    </section>
  );
}
