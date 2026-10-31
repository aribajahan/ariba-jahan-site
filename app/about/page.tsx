import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../components/Nav";
import RevealInit from "../components/RevealInit";
import PageGate from "../components/PageGate";
import AboutHero from "../components/AboutHero";
import AboutIntro from "../components/AboutIntro";
import StoryTimeline from "../components/StoryTimeline";
import AboutBio from "../components/AboutBio";
import CareerAdvisory from "../components/CareerAdvisory";
import RecognitionFeatures from "../components/RecognitionFeatures";
import AboutClosingCTA from "../components/AboutClosingCTA";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import { guardPage } from "../../lib/guardPage";
import { getPageSettings } from "../../lib/pageSettings";
import { buildPageMetadata } from "../../lib/seoMeta";
import { aboutProfilePageSchema } from "../../lib/structuredData";

export const metadata: Metadata = buildPageMetadata("about");

export default async function About() {
  const guard = await guardPage("about");
  if (guard === "notFound") notFound();
  if (guard === "gate") return <PageGate />;

  const { showFooter } = getPageSettings("about");

  return (
    <div className="bg-cream font-body text-body">
      <JsonLd data={aboutProfilePageSchema} />
      <Nav />
      <RevealInit />
      <AboutHero />
      <AboutIntro />
      <StoryTimeline />
      <AboutBio />
      <CareerAdvisory />
      <RecognitionFeatures />
      <AboutClosingCTA />
      {showFooter && <Footer />}
    </div>
  );
}
