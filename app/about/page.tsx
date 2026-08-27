import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../components/Nav";
import PageGate from "../components/PageGate";
import AboutHero from "../components/AboutHero";
import AboutIntro from "../components/AboutIntro";
import StoryTimeline from "../components/StoryTimeline";
import AboutBio from "../components/AboutBio";
import CareerAdvisory from "../components/CareerAdvisory";
import RecognitionFeatures from "../components/RecognitionFeatures";
import AboutClosingCTA from "../components/AboutClosingCTA";
import Footer from "../components/Footer";
import seo from "../../content/seo.json";
import { guardPage } from "../../lib/guardPage";
import { getPageSettings } from "../../lib/pageSettings";

export const metadata: Metadata = {
  title: seo.about.title,
  description: seo.about.description,
};

export default async function About() {
  const guard = await guardPage("about");
  if (guard === "notFound") notFound();
  if (guard === "gate") return <PageGate pageKey="about" />;

  const { showFooter } = getPageSettings("about");

  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav />
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
