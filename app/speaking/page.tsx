import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../components/Nav";
import PageGate from "../components/PageGate";
import SpeakingHero from "../components/SpeakingHero";
import SpeakingThemes from "../components/SpeakingThemes";
import SpeakingTestimonials from "../components/SpeakingTestimonials";
import SpeakingEngagements from "../components/SpeakingEngagements";
import SpeakingClosingCTA from "../components/SpeakingClosingCTA";
import UnmissablesBanner from "../components/UnmissablesBanner";
import Footer from "../components/Footer";
import { guardPage } from "../../lib/guardPage";
import { getPageSettings } from "../../lib/pageSettings";
import { buildPageMetadata } from "../../lib/seoMeta";
import speakingContent from "../../content/pages/speaking.json";

export const metadata: Metadata = buildPageMetadata("speaking");

export default async function Speaking() {
  const guard = await guardPage("speaking");
  if (guard === "notFound") notFound();
  if (guard === "gate") return <PageGate pageKey="speaking" />;

  const { showFooter } = getPageSettings("speaking");

  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav />
      <SpeakingHero />
      <SpeakingThemes />
      <UnmissablesBanner
        text={speakingContent.unmissablesBanner.text}
        ctaLabel={speakingContent.unmissablesBanner.ctaLabel}
        href={speakingContent.unmissablesBanner.href}
      />
      <SpeakingTestimonials />
      <SpeakingEngagements />
      <SpeakingClosingCTA />
      {showFooter && <Footer />}
    </div>
  );
}
