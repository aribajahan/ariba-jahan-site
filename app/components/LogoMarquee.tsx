import { Fragment } from "react";
import { logoRows } from "../data/home";

export default function LogoMarquee() {
  return (
    <section className="bg-cherish border-t border-charcoal/[0.07] overflow-hidden">
      {logoRows.map((row, i) => (
        <div
          key={row.label}
          className={`flex items-stretch overflow-hidden relative ${
            i < logoRows.length - 1 ? "border-b border-cream/[0.15]" : ""
          }`}
        >
          <div className="flex-shrink-0 w-[170px] max-[700px]:w-[110px] pl-[clamp(24px,5vw,80px)] max-[700px]:pl-5 text-xs max-[700px]:text-[10px] font-extrabold tracking-[0.14em] uppercase text-cream border-r border-cream/[0.15] z-[2] bg-[#B3261E] relative flex items-center">
            {row.label}
          </div>
          <div className="absolute top-0 bottom-0 left-[170px] max-[700px]:left-[110px] w-14 z-[1] pointer-events-none bg-[linear-gradient(to_right,#B3261E,rgba(179,38,30,0))]" />
          <div
            className="flex gap-14 items-center py-4 px-12 whitespace-nowrap [animation-play-state:running] hover:[animation-play-state:paused]"
            style={{
              animation: `logoScroll ${row.durationSec}s linear infinite${
                row.reverse ? " reverse" : ""
              }`,
            }}
          >
            {[...row.items, ...row.items].map((item, idx) => (
              <Fragment key={idx}>
                <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-cream/85">
                  {item}
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-cream/30" />
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
