import type { Metadata } from "next";
import FeedbackThankYou from "../../../components/FeedbackThankYou";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for sharing feedback with Ariba Jahan.",
  robots: { index: false, follow: false },
};

export default function AiAdvisoryFeedbackThankYouPage() {
  return <FeedbackThankYou />;
}
