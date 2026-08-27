import type { Metadata } from "next";
import Nav from "../components/Nav";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Speaking, advisory, or something else entirely. Get in touch with Ariba Jahan.",
};

export default function Contact() {
  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav contactHref="/contact" />
      <ContactForm />
      <Footer />
    </div>
  );
}
