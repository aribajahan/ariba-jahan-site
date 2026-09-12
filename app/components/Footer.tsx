import Image from "next/image";
import { footerSocials } from "../data/home";
import siteSettings from "../../content/site-settings.json";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="bg-charcoal py-11 px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1200px] mx-auto flex items-start justify-between flex-wrap gap-8">
        <div className="max-w-[480px]">
          <Image quality={90}
            src="/assets/wordmark-white.png"
            alt="Ariba Jahan"
            width={140}
            height={16}
            style={{ height: 16, width: "auto" }}
          />
          <div className="text-[11px] font-medium text-cream/50 mt-[6px]">
            {siteSettings.footer.creditLine}
          </div>
        </div>

        <div className="flex gap-5 text-cream/[0.35]">
          {footerSocials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener"
              aria-label={s.label}
              className="transition-colors duration-150 hover:text-cream active:text-cream"
            >
              <SocialIcon name={s.label} className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>

        <div className="w-full mt-1 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-5">
            <a
              href="https://design.aribajahan.com"
              target="_blank"
              rel="noopener"
              className="text-[11px] font-medium text-cream/50 hover:text-cream transition-colors duration-150"
            >
              Design system
            </a>
            <a
              href="https://design.aribajahan.com/legal"
              target="_blank"
              rel="noopener"
              className="text-[11px] font-medium text-cream/50 hover:text-cream transition-colors duration-150"
            >
              Legal
            </a>
          </div>
          <div className="text-[11px] text-cream/[0.32]">
            © {siteSettings.footer.copyrightYear} Ariba Jahan. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
