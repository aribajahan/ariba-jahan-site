import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../components/Nav";
import PageGate from "../components/PageGate";
import WorkWithMeHero from "../components/WorkWithMeHero";
import WwmTrustedBy from "../components/WwmTrustedBy";
import ProblemFraming from "../components/ProblemFraming";
import TwoWaysDivider from "../components/TwoWaysDivider";
import WorkWithMeOffers from "../components/WorkWithMeOffers";
import WwmTestimonials from "../components/WwmTestimonials";
import CaseStudies from "../components/CaseStudies";
import WorkWithMeClosingCTA from "../components/WorkWithMeClosingCTA";
import Footer from "../components/Footer";
import { guardPage } from "../../lib/guardPage";
import { getPageSettings } from "../../lib/pageSettings";
import { buildPageMetadata } from "../../lib/seoMeta";

export const metadata: Metadata = buildPageMetadata("work-with-me");

export default async function WorkWithMe() {
  const guard = await guardPage("work-with-me");
  if (guard === "notFound") notFound();
  if (guard === "gate") return <PageGate pageKey="work-with-me" />;

  const { showFooter } = getPageSettings("work-with-me");

  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav />
      <WorkWithMeHero />
      <WwmTrustedBy />
      <ProblemFraming />
      <TwoWaysDivider />
      <WorkWithMeOffers />
      <WwmTestimonials />
      <CaseStudies />
      <WorkWithMeClosingCTA />
      {showFooter && <Footer />}
    </div>
  );
}
