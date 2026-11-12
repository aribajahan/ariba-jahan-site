import type { Metadata } from "next";
import FeedbackThankYou from "../../../components/FeedbackThankYou";
import { feedbackForms } from "../../../data/feedbackForms";

const form = feedbackForms["build-with-me"];

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for sharing feedback with Ariba Jahan.",
  robots: { index: false, follow: false },
};

export default function BuildWithMeFeedbackThankYouPage() {
  return <FeedbackThankYou config={form} />;
}
