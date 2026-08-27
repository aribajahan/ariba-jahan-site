import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "./components/Nav";
import PageGate from "./components/PageGate";
import { guardPage } from "../lib/guardPage";
import { getPageSettings } from "../lib/pageSettings";
import Hero from "./components/Hero";
import NameMarquee from "./components/NameMarquee";
import Positioning from "./components/Positioning";
import WorkWithMe from "./components/WorkWithMe";
import Unmissables from "./components/Unmissables";
import Credentials from "./components/Credentials";
import Speaking from "./components/Speaking";
import Experiments from "./components/Experiments";
import Recognition from "./components/Recognition";
import Press from "./components/Press";
import Testimonials from "./components/Testimonials";
import Community from "./components/Community";
import ClosingCTA from "./components/ClosingCTA";
import Footer from "./components/Footer";
import seo from "../content/seo.json";

export const metadata: Metadata = {
  title: { absolute: seo.home.title },
  description: seo.home.description,
};

export default async function Home() {
  const guard = await guardPage("home");
  if (guard === "notFound") notFound();
  if (guard === "gate") return <PageGate pageKey="home" />;

  const { showFooter } = getPageSettings("home");

  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav />
      <Hero />
      <NameMarquee />
      <Positioning />
      <WorkWithMe />
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
