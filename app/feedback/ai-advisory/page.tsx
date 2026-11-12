import type { Metadata } from "next";
import FeedbackPage from "../../components/FeedbackPage";
import { feedbackForms } from "../../data/feedbackForms";

const form = feedbackForms["ai-advisory"];

export const metadata: Metadata = {
  title: "AI advisory feedback",
  description: "Share feedback on an AI advisory session with Ariba Jahan.",
  robots: { index: false, follow: false },
};

export default function AiAdvisoryFeedbackPage() {
  return <FeedbackPage config={form} />;
}
