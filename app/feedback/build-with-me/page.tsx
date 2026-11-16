import type { Metadata } from "next";
import FeedbackPage from "../../components/FeedbackPage";
import { feedbackForms } from "../../data/feedbackForms";

const form = feedbackForms["build-with-me"];

export const metadata: Metadata = {
  title: "Build With Me feedback",
  description: "Share feedback on Build With Me with Ariba Jahan.",
  robots: { index: false, follow: false },
};

export default function BuildWithMeFeedbackPage() {
  return <FeedbackPage config={form} />;
}
