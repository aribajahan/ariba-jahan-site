import Nav from "./components/Nav";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
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

export default function Home() {
  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav />
      <Hero />
      <LogoMarquee />
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
      <Footer />
    </div>
  );
}
