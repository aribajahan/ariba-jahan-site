"use client";

import { useState } from "react";
import type overview from "../../../content/pages/work-with-me-overview.json";
import type photos from "../../../content/pages/work-with-me-photo-preview.json";
import SectionCard from "../_shared/SectionCard";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";
import MediaPicker from "../_shared/MediaPicker";

type ClosingLink = { index: string; title: string; cta: string; href: string; sub?: string; external?: boolean };
type Content = Omit<typeof overview, "closingCTA"> & { closingCTA: { heading: string; subhead: string; links: ClosingLink[] } };
type Photos = typeof photos;
const input = "w-full px-3 py-2 border border-[#ddd] rounded-md text-sm";

function TextField({ label, value, onChange, rows = 2 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  return <label className="block mb-4"><span className="block text-[13px] font-semibold mb-2">{label}</span><textarea className={input} rows={rows} value={value} onChange={e => onChange(e.target.value)} /></label>;
}

function ListField({ label, values, onChange }: { label: string; values: string[]; onChange: (values: string[]) => void }) {
  return <div className="mb-5"><p className="text-[13px] font-semibold mb-2">{label}</p>{values.map((value, i) => <div key={i} className="flex gap-2 mb-2"><textarea aria-label={`${label} ${i + 1}`} className={input} rows={3} value={value} onChange={e => onChange(values.map((v, j) => j === i ? e.target.value : v))} /><button type="button" aria-label={`Remove ${label} ${i + 1}`} onClick={() => onChange(values.filter((_, j) => j !== i))}>Remove</button></div>)}<button type="button" className="text-sm underline" onClick={() => onChange([...values, ""])}>Add item</button></div>;
}

export default function WorkWithMeOverviewEditor({ initialContent, initialPhotos }: { initialContent: Content; initialPhotos: Photos }) {
  const [content, setContent] = useState(initialContent);
  const [images, setImages] = useState(initialPhotos);
  const { publish, publishing, result } = usePublish();
  const updateOffer = (index: number, patch: Partial<Content["offers"][number]>) => setContent(c => ({ ...c, offers: c.offers.map((o, i) => i === index ? { ...o, ...patch } : o) }));
  const updatePhoto = (id: string, patch: Partial<Photos["offers"][number]>) => setImages(p => ({ ...p, offers: p.offers.map(o => o.id === id ? { ...o, ...patch } : o) }));
  const updateLink = (index: number, patch: Partial<Content["closingCTA"]["links"][number]>) => setContent(c => ({ ...c, closingCTA: { ...c.closingCTA, links: c.closingCTA.links.map((l, i) => i === index ? { ...l, ...patch } : l) } }));
  const handlePublish = () => publish([
    { path: "content/pages/work-with-me-overview.json", content: JSON.stringify(content, null, 2) + "\n" },
    { path: "content/pages/work-with-me-photo-preview.json", content: JSON.stringify(images, null, 2) + "\n" },
  ], "Update Work With Me overview via Studio");

  return <div className="max-w-[800px] p-10">
    <h1 className="text-2xl mb-2">Work With Me</h1>
    <p className="text-sm text-[#666] mb-6">Edit the current page here. <a href="/admin/work-with-me-2" className="underline">Edit the preserved page and shared ELG deliverables, engagement phases, and case-study introduction.</a></p>
    <SectionCard title="Hero">
      <MediaPicker value={content.hero.photoSrc} onChange={photoSrc => setContent(c => ({ ...c, hero: { ...c.hero, photoSrc } }))} />
      <TextField label="Headline" value={content.hero.headline} onChange={headline => setContent(c => ({ ...c, hero: { ...c.hero, headline } }))} />
      <TextField label="Introduction" rows={4} value={content.hero.subhead} onChange={subhead => setContent(c => ({ ...c, hero: { ...c.hero, subhead } }))} />
    </SectionCard>
    {content.offers.map((offer, index) => {
      const photo = images.offers.find(p => p.id === offer.id)!;
      const fields = [
        ["title", "Title"], ["audience", "Audience"], ["format", "Format"],
        ["menuTitle", "Menu title"], ["menuDescription", "Menu description"],
        ["situation", "Opening paragraph"], ["description", "Opening paragraph continued"],
        ["outcomeSummary", "Visible outcome"], ["detailsLabel", "Details toggle label"],
        ["outcome", "Full outcome and scope"], ["cta", "Button label"], ["href", "Booking link"],
        ["proof", "Proof text"], ["proofQuote", "Testimonial"], ["proofName", "Testimonial name"], ["proofRole", "Testimonial role"],
      ] as const;
      return <SectionCard key={offer.id} title={offer.title} defaultExpanded={false}>
        <p className="text-[13px] font-semibold mb-2">Photo</p>
        <MediaPicker value={photo.photoSrc} onChange={photoSrc => updatePhoto(offer.id, { photoSrc })} />
        <TextField label="Photo description" value={photo.photoAlt} onChange={photoAlt => updatePhoto(offer.id, { photoAlt })} />
        {fields.map(([key, label]) => <TextField key={key} label={label} value={offer[key]} onChange={value => updateOffer(index, { [key]: value })} rows={key === "description" || key === "outcome" ? 4 : 2} />)}
        <ListField label="Visible highlights" values={offer.highlights} onChange={highlights => updateOffer(index, { highlights })} />
        <ListField label="Expanded details" values={offer.topics} onChange={topics => updateOffer(index, { topics })} />
      </SectionCard>;
    })}
    <SectionCard title="Have something else in mind?" defaultExpanded={false}>
      {([['contactHeading', 'Heading'], ['contactBody', 'Description'], ['contactCta', 'Button label'], ['contactHref', 'Booking link']] as const).map(([key, label]) => <TextField key={key} label={label} value={content[key]} onChange={value => setContent(c => ({ ...c, [key]: value }))} />)}
    </SectionCard>
    <SectionCard title="Closing calls to action" defaultExpanded={false}>
      <TextField label="Heading" value={content.closingCTA.heading} onChange={heading => setContent(c => ({ ...c, closingCTA: { ...c.closingCTA, heading } }))} />
      <TextField label="Introduction" value={content.closingCTA.subhead} onChange={subhead => setContent(c => ({ ...c, closingCTA: { ...c.closingCTA, subhead } }))} />
      {content.closingCTA.links.map((link, index) => <div key={link.index} className="border-t pt-4 mt-4">
        <TextField label={`Link ${index + 1} title`} value={link.title} onChange={title => updateLink(index, { title })} />
        <TextField label="Action label" value={link.cta} onChange={cta => updateLink(index, { cta })} />
        <TextField label="Destination" value={link.href} onChange={href => updateLink(index, { href })} />
        <TextField label="Supporting text" value={link.sub ?? ""} onChange={sub => updateLink(index, { sub })} />
        <label className="text-sm"><input type="checkbox" checked={Boolean(link.external)} onChange={e => updateLink(index, { external: e.target.checked })} /> Open in a new tab</label>
      </div>)}
    </SectionCard>
    <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
  </div>;
}
