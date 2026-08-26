import Nav from "../components/Nav";
import SpeakingHero from "../components/SpeakingHero";
import SpeakingThemes from "../components/SpeakingThemes";
import SpeakingTestimonials from "../components/SpeakingTestimonials";
import SpeakingEngagements from "../components/SpeakingEngagements";
import SpeakingClosingCTA from "../components/SpeakingClosingCTA";
import Footer from "../components/Footer";

export default function Speaking() {
  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav />
      <SpeakingHero />
      <SpeakingThemes />
      <SpeakingTestimonials />
      <SpeakingEngagements />
      <SpeakingClosingCTA />
      <Footer />
    </div>
  );
}
