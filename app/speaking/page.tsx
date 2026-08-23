import Nav from "../components/Nav";
import SpeakingHero from "../components/SpeakingHero";
import SpeakingThemes from "../components/SpeakingThemes";
import SpeakingTestimonials from "../components/SpeakingTestimonials";
import TrustedByLogos from "../components/TrustedByLogos";
import EngagementsGallery from "../components/EngagementsGallery";
import SpeakingClosingCTA from "../components/SpeakingClosingCTA";
import Footer from "../components/Footer";

export default function Speaking() {
  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav />
      <SpeakingHero />
      <SpeakingThemes />
      <SpeakingTestimonials />
      <TrustedByLogos />
      <EngagementsGallery />
      <SpeakingClosingCTA />
      <Footer />
    </div>
  );
}
