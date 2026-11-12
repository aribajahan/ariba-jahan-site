import type { Metadata } from "next";
import FeedbackThankYou from "../../../components/FeedbackThankYou";
import { feedbackForms } from "../../../data/feedbackForms";

const form = feedbackForms["reading-room"];

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for sharing feedback with Ariba Jahan.",
  robots: { index: false, follow: false },
};

export default function ReadingRoomFeedbackThankYouPage() {
  return <FeedbackThankYou config={form} />;
}
