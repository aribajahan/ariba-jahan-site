import type { Metadata } from "next";
import Nav from "../components/Nav";
import PressKit from "../components/PressKit";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "Headshot, bio, speaking topics, and current work for media, event organizers, and collaborators.",
};

export default function Press() {
  return (
    <>
      <Nav contactHref="/contact" />
      <PressKit />
      <Footer />
    </>
  );
}
