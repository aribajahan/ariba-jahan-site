"use client";

import { useState } from "react";
import SectionCard from "../_shared/SectionCard";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";
import TagListEditor from "../_shared/TagListEditor";

type Cta = { label: string; href: string };
type Offer = { index: string; title: string; lead: string; body: string; cta: string; href: string };
type Stat = { value: string; labelLine1: string; labelLine2: string };
type MarqueeRow = { label: string; items: string[]; durationSec: number; reverse?: boolean };
type PressItem = { outlet: string; title: string; href: string; photoSrc: string; bg: string };
type CommunityPhoto = { photoSrc: string; caption: string; number: number };
type ClosingLink = { index: string; title: string; cta: string; href: string; external?: boolean };

type HomeContent = {
  hero: { photoSrc: string; subhead: string; ctas: Cta[] };
  positioning: { paragraphs: string[] };
  workWithMeTeaser: { eyebrow: string; heading: string; body: string; offers: Offer[] };
  credentials: { stats: Stat[] };
  speakingTeaser: { eyebrow: string; heading: string; paragraphs: string[]; ctaLabel: string; ctaHref: string; photos: string[] };
  nameMarquee: { rows: MarqueeRow[] };
  recognition: { eyebrow: string; heading: string; photoSrc: string; items: string[]; ctaLabel: string; ctaHref: string };
  press: { eyebrow: string; heading: string; items: PressItem[] };
  community: { heading: string; intro: string; photos: CommunityPhoto[] };
  closingCTA: { heading: string; subhead: string; links: ClosingLink[] };
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] font-semibold mb-2">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm";

export default function HomeEditor({ initialContent }: { initialContent: HomeContent }) {
  const [content, setContent] = useState(initialContent);
  const { publish, publishing, result } = usePublish();

  const set = <K extends keyof HomeContent>(key: K, patch: Partial<HomeContent[K]>) => {
    setContent((c) => ({ ...c, [key]: { ...c[key], ...patch } }));
  };

  const updateCta = (index: number, patch: Partial<Cta>) => {
    const ctas = content.hero.ctas.map((cta, i) => (i === index ? { ...cta, ...patch } : cta));
    set("hero", { ctas });
  };
  const moveCta = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= content.hero.ctas.length) return;
    const ctas = [...content.hero.ctas];
    [ctas[index], ctas[target]] = [ctas[target], ctas[index]];
    set("hero", { ctas });
  };
  const removeCta = (index: number) => set("hero", { ctas: content.hero.ctas.filter((_, i) => i !== index) });
  const addCta = () => set("hero", { ctas: [...content.hero.ctas, { label: "New Link", href: "#" }] });

  const updateOffer = (i: number, patch: Partial<Offer>) => {
    set("workWithMeTeaser", { offers: content.workWithMeTeaser.offers.map((o, idx) => (idx === i ? { ...o, ...patch } : o)) });
  };

  const updateStat = (i: number, patch: Partial<Stat>) => {
    set("credentials", { stats: content.credentials.stats.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
  };

  const updateSpeakingPhoto = (i: number, value: string) => {
    const photos = content.speakingTeaser.photos.map((p, idx) => (idx === i ? value : p));
    set("speakingTeaser", { photos });
  };

  const updateMarqueeRow = (i: number, patch: Partial<MarqueeRow>) => {
    set("nameMarquee", { rows: content.nameMarquee.rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)) });
  };

  const updatePressItem = (i: number, patch: Partial<PressItem>) => {
    set("press", { items: content.press.items.map((p, idx) => (idx === i ? { ...p, ...patch } : p)) });
  };
  const removePressItem = (i: number) => set("press", { items: content.press.items.filter((_, idx) => idx !== i) });
  const addPressItem = () =>
    set("press", { items: [...content.press.items, { outlet: "", title: "", href: "", photoSrc: "", bg: "#2D2D2D" }] });

  const updateCommunityPhoto = (i: number, patch: Partial<CommunityPhoto>) => {
    set("community", { photos: content.community.photos.map((p, idx) => (idx === i ? { ...p, ...patch } : p)) });
  };
  const removeCommunityPhoto = (i: number) => set("community", { photos: content.community.photos.filter((_, idx) => idx !== i) });
  const addCommunityPhoto = () => {
    const nextNumber = Math.max(0, ...content.community.photos.map((p) => p.number)) + 1;
    set("community", { photos: [...content.community.photos, { photoSrc: "", caption: "", number: nextNumber }] });
  };

  const updateClosingLink = (i: number, patch: Partial<ClosingLink>) => {
    set("closingCTA", { links: content.closingCTA.links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)) });
  };

  const handlePublish = () =>
    publish([{ path: "content/pages/home.json", content: JSON.stringify(content, null, 2) + "\n" }], "Update Home content via Studio");

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[2px]">Page</div>
      <h1 className="text-2xl mb-1">Home</h1>
      <p className="text-[13px] text-[#999] mb-6">Click a section to expand and edit its fields.</p>

      <SectionCard title="Hero">
        <Field label="Hero Photo">
          <input value={content.hero.photoSrc} onChange={(e) => set("hero", { photoSrc: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Subhead">
          <textarea rows={3} value={content.hero.subhead} onChange={(e) => set("hero", { subhead: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <label className="block text-[13px] font-semibold mb-[10px]">Hero CTAs</label>
        <div className="flex flex-col gap-2 mb-2">
          {content.hero.ctas.map((cta, i) => (
            <div key={i} className="flex gap-[10px] items-center p-[10px] bg-[#f7f6f4] rounded-md">
              <div className="flex flex-col gap-[2px]">
                <button type="button" onClick={() => moveCta(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">▲</button>
                <button type="button" onClick={() => moveCta(i, 1)} disabled={i === content.hero.ctas.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▼</button>
              </div>
              <input value={cta.label} onChange={(e) => updateCta(i, { label: e.target.value })} className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              <input value={cta.href} onChange={(e) => updateCta(i, { href: e.target.value })} className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] text-[#888]" />
              <span onClick={() => removeCta(i)} className="text-[#c44] cursor-pointer text-[13px]">✕</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={addCta} className="text-xs text-[#888] border border-dashed border-[#ccc] rounded-md px-3 py-[6px]">+ Add CTA</button>
      </SectionCard>

      <SectionCard title="Positioning" defaultExpanded={false}>
        <Field label="Paragraphs (one per line, blank line between)">
          <textarea
            rows={8}
            value={content.positioning.paragraphs.join("\n\n")}
            onChange={(e) => set("positioning", { paragraphs: e.target.value.split(/\n\s*\n/).filter(Boolean) })}
            className={`${inputCls} resize-y`}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Work With Me Teaser" defaultExpanded={false}>
        <Field label="Eyebrow"><input value={content.workWithMeTeaser.eyebrow} onChange={(e) => set("workWithMeTeaser", { eyebrow: e.target.value })} className={inputCls} /></Field>
        <Field label="Heading"><input value={content.workWithMeTeaser.heading} onChange={(e) => set("workWithMeTeaser", { heading: e.target.value })} className={inputCls} /></Field>
        <Field label="Body">
          <textarea rows={4} value={content.workWithMeTeaser.body} onChange={(e) => set("workWithMeTeaser", { body: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <label className="block text-[13px] font-semibold mb-[10px]">Offer Cards</label>
        <div className="flex flex-col gap-3">
          {content.workWithMeTeaser.offers.map((offer, i) => (
            <div key={i} className="p-3 bg-[#f7f6f4] rounded-md flex flex-col gap-2">
              <input value={offer.title} onChange={(e) => updateOffer(i, { title: e.target.value })} placeholder="Title" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] font-semibold" />
              <input value={offer.lead} onChange={(e) => updateOffer(i, { lead: e.target.value })} placeholder="Lead" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              <textarea value={offer.body} onChange={(e) => updateOffer(i, { body: e.target.value })} placeholder="Body" rows={2} className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] resize-y" />
              <div className="flex gap-2">
                <input value={offer.cta} onChange={(e) => updateOffer(i, { cta: e.target.value })} placeholder="CTA label" className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
                <input value={offer.href} onChange={(e) => updateOffer(i, { href: e.target.value })} placeholder="href" className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] text-[#888]" />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Credentials (stats strip)" defaultExpanded={false}>
        <div className="flex flex-col gap-2">
          {content.credentials.stats.map((s, i) => (
            <div key={i} className="flex gap-2 items-center p-[10px] bg-[#f7f6f4] rounded-md">
              <input value={s.value} onChange={(e) => updateStat(i, { value: e.target.value })} placeholder="215+" className="w-20 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              <input value={s.labelLine1} onChange={(e) => updateStat(i, { labelLine1: e.target.value })} placeholder="Line 1" className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              <input value={s.labelLine2} onChange={(e) => updateStat(i, { labelLine2: e.target.value })} placeholder="Line 2" className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Speaking Teaser" defaultExpanded={false}>
        <Field label="Eyebrow"><input value={content.speakingTeaser.eyebrow} onChange={(e) => set("speakingTeaser", { eyebrow: e.target.value })} className={inputCls} /></Field>
        <Field label="Heading"><input value={content.speakingTeaser.heading} onChange={(e) => set("speakingTeaser", { heading: e.target.value })} className={inputCls} /></Field>
        <Field label="Paragraphs">
          <textarea
            rows={6}
            value={content.speakingTeaser.paragraphs.join("\n\n")}
            onChange={(e) => set("speakingTeaser", { paragraphs: e.target.value.split(/\n\s*\n/).filter(Boolean) })}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <div className="flex gap-2 mb-4">
          <input value={content.speakingTeaser.ctaLabel} onChange={(e) => set("speakingTeaser", { ctaLabel: e.target.value })} placeholder="CTA label" className="flex-1 border border-[#ddd] rounded-md px-3 py-[10px] text-sm" />
          <input value={content.speakingTeaser.ctaHref} onChange={(e) => set("speakingTeaser", { ctaHref: e.target.value })} placeholder="href" className="flex-1 border border-[#ddd] rounded-md px-3 py-[10px] text-sm text-[#888]" />
        </div>
        <label className="block text-[13px] font-semibold mb-[10px]">Photos (5, fixed positions)</label>
        <div className="flex flex-col gap-2">
          {content.speakingTeaser.photos.map((photo, i) => (
            <input key={i} value={photo} onChange={(e) => updateSpeakingPhoto(i, e.target.value)} className="border border-[#ddd] rounded-md px-3 py-[8px] text-[13px]" />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Name Marquee" defaultExpanded={false}>
        <p className="text-xs text-[#999] mb-3">The scrolling strips of company/institution names — text only, not logo images.</p>
        <div className="flex flex-col gap-4">
          {content.nameMarquee.rows.map((row, i) => (
            <div key={i} className="p-3 bg-[#f7f6f4] rounded-md">
              <div className="flex gap-2 mb-2">
                <input value={row.label} onChange={(e) => updateMarqueeRow(i, { label: e.target.value })} className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] font-semibold" />
                <input
                  type="number"
                  value={row.durationSec}
                  onChange={(e) => updateMarqueeRow(i, { durationSec: Number(e.target.value) })}
                  className="w-24 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]"
                />
                <label className="flex items-center gap-1 text-[11px] text-[#888] whitespace-nowrap">
                  <input type="checkbox" checked={!!row.reverse} onChange={(e) => updateMarqueeRow(i, { reverse: e.target.checked })} />
                  reverse
                </label>
              </div>
              <TagListEditor items={row.items} onChange={(items) => updateMarqueeRow(i, { items })} placeholder="Add a name…" />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Recognition" defaultExpanded={false}>
        <Field label="Eyebrow"><input value={content.recognition.eyebrow} onChange={(e) => set("recognition", { eyebrow: e.target.value })} className={inputCls} /></Field>
        <Field label="Heading"><input value={content.recognition.heading} onChange={(e) => set("recognition", { heading: e.target.value })} className={inputCls} /></Field>
        <Field label="Photo"><input value={content.recognition.photoSrc} onChange={(e) => set("recognition", { photoSrc: e.target.value })} className={inputCls} /></Field>
        <label className="block text-[13px] font-semibold mb-2">Recognition Items</label>
        <div className="mb-4">
          <TagListEditor items={content.recognition.items} onChange={(items) => set("recognition", { items })} placeholder="Add an item…" />
        </div>
        <div className="flex gap-2">
          <input value={content.recognition.ctaLabel} onChange={(e) => set("recognition", { ctaLabel: e.target.value })} placeholder="CTA label" className="flex-1 border border-[#ddd] rounded-md px-3 py-[10px] text-sm" />
          <input value={content.recognition.ctaHref} onChange={(e) => set("recognition", { ctaHref: e.target.value })} placeholder="href" className="flex-1 border border-[#ddd] rounded-md px-3 py-[10px] text-sm text-[#888]" />
        </div>
      </SectionCard>

      <SectionCard title="Press & Bylines" defaultExpanded={false}>
        <Field label="Eyebrow"><input value={content.press.eyebrow} onChange={(e) => set("press", { eyebrow: e.target.value })} className={inputCls} /></Field>
        <Field label="Heading"><input value={content.press.heading} onChange={(e) => set("press", { heading: e.target.value })} className={inputCls} /></Field>
        <label className="block text-[13px] font-semibold mb-[10px]">Press Items</label>
        <div className="flex flex-col gap-2 mb-2">
          {content.press.items.map((item, i) => (
            <div key={i} className="p-[10px] bg-[#f7f6f4] rounded-md flex flex-col gap-[6px]">
              <div className="flex gap-2">
                <input value={item.outlet} onChange={(e) => updatePressItem(i, { outlet: e.target.value })} placeholder="Outlet" className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
                <input value={item.title} onChange={(e) => updatePressItem(i, { title: e.target.value })} placeholder="Title" className="flex-[2] border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              </div>
              <input value={item.href} onChange={(e) => updatePressItem(i, { href: e.target.value })} placeholder="URL" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] text-[#888]" />
              <div className="flex gap-2 items-center">
                <input value={item.photoSrc} onChange={(e) => updatePressItem(i, { photoSrc: e.target.value })} placeholder="Photo path" className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
                <input type="color" value={item.bg} onChange={(e) => updatePressItem(i, { bg: e.target.value })} className="w-9 h-8 border border-[#ddd] rounded-[5px]" />
                <span onClick={() => removePressItem(i)} className="text-[#c44] cursor-pointer text-[13px]">✕</span>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addPressItem} className="text-xs text-[#888] border border-dashed border-[#ccc] rounded-md px-3 py-[6px]">+ Add Press Item</button>
      </SectionCard>

      <SectionCard title="Community" defaultExpanded={false}>
        <Field label="Heading"><input value={content.community.heading} onChange={(e) => set("community", { heading: e.target.value })} className={inputCls} /></Field>
        <Field label="Intro">
          <textarea rows={2} value={content.community.intro} onChange={(e) => set("community", { intro: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <label className="block text-[13px] font-semibold mb-[10px]">Photos ({content.community.photos.length})</label>
        <div className="flex flex-col gap-2 mb-2 max-h-[400px] overflow-y-auto">
          {content.community.photos.map((photo, i) => (
            <div key={i} className="flex gap-2 items-center p-[8px] bg-[#f7f6f4] rounded-md">
              <input
                type="number"
                value={photo.number}
                onChange={(e) => updateCommunityPhoto(i, { number: Number(e.target.value) })}
                className="w-14 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]"
              />
              <input value={photo.photoSrc} onChange={(e) => updateCommunityPhoto(i, { photoSrc: e.target.value })} placeholder="Photo path" className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              <input value={photo.caption} onChange={(e) => updateCommunityPhoto(i, { caption: e.target.value })} placeholder="Caption" className="flex-[2] border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              <span onClick={() => removeCommunityPhoto(i)} className="text-[#c44] cursor-pointer text-[13px]">✕</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={addCommunityPhoto} className="text-xs text-[#888] border border-dashed border-[#ccc] rounded-md px-3 py-[6px]">+ Add Photo</button>
      </SectionCard>

      <SectionCard title="Closing CTA" defaultExpanded={false}>
        <Field label="Heading"><input value={content.closingCTA.heading} onChange={(e) => set("closingCTA", { heading: e.target.value })} className={inputCls} /></Field>
        <Field label="Subhead">
          <textarea rows={2} value={content.closingCTA.subhead} onChange={(e) => set("closingCTA", { subhead: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <label className="block text-[13px] font-semibold mb-[10px]">Links</label>
        <div className="flex flex-col gap-2">
          {content.closingCTA.links.map((link, i) => (
            <div key={i} className="p-[10px] bg-[#f7f6f4] rounded-md flex flex-col gap-[6px]">
              <div className="flex gap-2">
                <input value={link.index} onChange={(e) => updateClosingLink(i, { index: e.target.value })} className="w-14 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
                <input value={link.title} onChange={(e) => updateClosingLink(i, { title: e.target.value })} placeholder="Title" className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              </div>
              <input value={link.cta} onChange={(e) => updateClosingLink(i, { cta: e.target.value })} placeholder="CTA text" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              <div className="flex gap-2 items-center">
                <input value={link.href} onChange={(e) => updateClosingLink(i, { href: e.target.value })} placeholder="href" className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] text-[#888]" />
                <label className="flex items-center gap-1 text-[11px] text-[#888] whitespace-nowrap">
                  <input type="checkbox" checked={!!link.external} onChange={(e) => updateClosingLink(i, { external: e.target.checked })} />
                  external
                </label>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#999] mt-2">Shared with Speaking&rsquo;s closing CTA — editing here changes both pages.</p>
      </SectionCard>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
