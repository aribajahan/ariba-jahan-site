import type { Metadata } from "next";
import FeedbackPage from "../../components/FeedbackPage";
import { feedbackForms } from "../../data/feedbackForms";

const form = feedbackForms["reading-room"];

export const metadata: Metadata = {
  title: "Reading Room feedback",
  description: "Share feedback on a Reading Room session with Ariba Jahan.",
  robots: { index: false, follow: false },
};

export default function ReadingRoomFeedbackPage() {
  return <FeedbackPage config={form} />;
}
