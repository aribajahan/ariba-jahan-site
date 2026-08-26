import type { Metadata } from "next";
import Nav from "../components/Nav";
import AboutHero from "../components/AboutHero";
import AboutIntro from "../components/AboutIntro";
import StoryTimeline from "../components/StoryTimeline";
import AboutBio from "../components/AboutBio";
import CareerAdvisory from "../components/CareerAdvisory";
import RecognitionFeatures from "../components/RecognitionFeatures";
import AboutClosingCTA from "../components/AboutClosingCTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product and AI strategist, consultant, speaker, and writer. The story behind the work — and what I'm focused on right now.",
};

export default function About() {
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
      <Footer />
    </div>
  );
}
