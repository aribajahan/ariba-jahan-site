import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../components/Nav";
import PageGate from "../components/PageGate";
import WorkWithMeOverview from "../components/WorkWithMeOverview";
import WorkWithMeClosingCTA from "../components/WorkWithMeClosingCTA";
import RevealInit from "../components/RevealInit";
import content from "../../content/pages/work-with-me-overview.json";
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
    <div className="bg-cream font-body text-body">
      <Nav />
      <RevealInit />
      <WorkWithMeOverview />
      <WorkWithMeClosingCTA closingCTA={content.closingCTA} />
      {showFooter && <Footer />}
    </div>
  );
}
