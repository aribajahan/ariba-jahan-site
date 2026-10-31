import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkWithMeOfferDetail from "../../components/WorkWithMeOfferDetail";
import PageGate from "../../components/PageGate";
import { guardPage } from "../../../lib/guardPage";
import content from "../../../content/pages/work-with-me-overview.json";

const PAGE_KEY = "work-with-me-photo-preview";

export const metadata: Metadata = { title: "Engagement details — preview", robots: { index: false, follow: false } };
export function generateStaticParams() { return content.offers.map(o => ({ offer: o.id })); }

export default async function OfferDetail({ params }: { params: Promise<{ offer: string }> }) {
  // Guards on the same key as the preview page it belongs to, so locking the
  // preview locks its detail pages too.
  const guard = await guardPage(PAGE_KEY);
  if (guard === "notFound") notFound();
  if (guard === "gate") return <PageGate />;

  const { offer } = await params;
  return <WorkWithMeOfferDetail offer={offer} overviewPath="/work-with-me-photo-preview" />;
}
