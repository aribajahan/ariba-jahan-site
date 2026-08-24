import Nav from "../components/Nav";
import WorkWithMeHero from "../components/WorkWithMeHero";
import WwmTrustedBy from "../components/WwmTrustedBy";
import ProblemFraming from "../components/ProblemFraming";
import TwoWaysDivider from "../components/TwoWaysDivider";
import WorkWithMeOffers from "../components/WorkWithMeOffers";
import WwmTestimonials from "../components/WwmTestimonials";
import CaseStudies from "../components/CaseStudies";
import WorkWithMeClosingCTA from "../components/WorkWithMeClosingCTA";
import Footer from "../components/Footer";

export default function WorkWithMe() {
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
      <Footer />
    </div>
  );
}
