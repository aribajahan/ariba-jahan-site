import type { Metadata } from "next";
import WorkWithMeOfferDetail from "../../components/WorkWithMeOfferDetail";
import content from "../../../content/pages/work-with-me-overview.json";

export const metadata: Metadata = { title: "Engagement details — preview", robots: { index: false, follow: false } };
export function generateStaticParams() { return content.offers.map(o => ({ offer: o.id })); }
export default async function OfferDetail({ params }: { params: Promise<{ offer: string }> }) {
  const { offer } = await params;
  return <WorkWithMeOfferDetail offer={offer} overviewPath="/work-with-me-photo-preview" />;
}
