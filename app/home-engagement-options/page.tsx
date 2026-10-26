import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../components/Nav";
import RevealInit from "../components/RevealInit";
import PageGate from "../components/PageGate";
import { guardPage } from "../../lib/guardPage";
import { getPageSettings } from "../../lib/pageSettings";
import Hero from "../components/Hero";
import NameMarquee from "../components/NameMarquee";
import Positioning from "../components/Positioning";
import HomeEngagementOptions, { type EngagementLayout } from "../components/HomeEngagementOptions";
import Unmissables from "../components/Unmissables";
import Credentials from "../components/Credentials";
import Speaking from "../components/Speaking";
import Experiments from "../components/Experiments";
import Recognition from "../components/Recognition";
import Press from "../components/Press";
import Testimonials from "../components/Testimonials";
import Community from "../components/Community";
import ClosingCTA from "../components/ClosingCTA";
import Footer from "../components/Footer";
import { buildPageMetadata } from "../../lib/seoMeta";

export const metadata: Metadata = { ...buildPageMetadata("home", { absoluteTitle: true }), title: { absolute: "Homepage engagement options — preview" }, robots: { index: false, follow: false } };

export default async function HomeOptions({ searchParams }: { searchParams: Promise<{ layout?: string }> }) {
  const query = await searchParams;
  const layout: EngagementLayout = query.layout === "numbered" || query.layout === "shared" ? query.layout : "photos";
  const guard = await guardPage("home");
  if (guard === "notFound") notFound();
  if (guard === "gate") return <PageGate pageKey="home" />;

  const { showFooter } = getPageSettings("home");

  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav />
      <RevealInit />
      <Hero />
      <NameMarquee />
      <Positioning />
      <HomeEngagementOptions layout={layout} />
      <Unmissables />
      <Credentials />
      <Speaking />
      <Experiments />
      <Recognition />
      <Press />
      <Testimonials />
      <Community />
      <ClosingCTA />
      {showFooter && <Footer />}
    </div>
  );
}
