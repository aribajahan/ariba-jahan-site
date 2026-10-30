import Link from "next/link";
import homeContent from "../../../content/pages/home.json";
import workWithMeContent from "../../../content/pages/work-with-me.json";
import workWithMeOverviewContent from "../../../content/pages/work-with-me-overview.json";
import aboutContent from "../../../content/pages/about.json";
import speakingContent from "../../../content/pages/speaking.json";
import {
  PAGE_RECORDS,
  HARDCODED_RECORDS,
  RETIRED_ON,
  type EyebrowState,
  type PageRecord,
  type SectionRecord,
} from "./architectureRecord";

const CONTENT: Record<string, unknown> = {
  "home.json": homeContent,
  "work-with-me.json": workWithMeContent,
  "work-with-me-overview.json": workWithMeOverviewContent,
  "about.json": aboutContent,
  "speaking.json": speakingContent,
};

/** Walk a dotted path into a page's JSON. An empty path returns the root. */
function resolve(file: string, path: string): Record<string, unknown> | null {
  let node: unknown = CONTENT[file];
  if (!node) return null;
  if (path) {
    for (const key of path.split(".")) {
      if (typeof node !== "object" || node === null) return null;
      node = (node as Record<string, unknown>)[key];
    }
  }
  return typeof node === "object" && node !== null ? (node as Record<string, unknown>) : null;
}

function liveHeading(page: PageRecord, section: SectionRecord): string | null {
  if (!section.headingKey) return null;
  const node = resolve(page.contentFile, section.path);
  const value = node?.[section.headingKey];
  return typeof value === "string" && value.trim() ? value : null;
}

function liveEyebrow(page: PageRecord, section: SectionRecord): string | null {
  const node = resolve(page.contentFile, section.path);
  const value = node?.eyebrow;
  return typeof value === "string" && value.trim() ? value : null;
}

const BADGE: Record<EyebrowState["kind"], { label: string; className: string }> = {
  retired: { label: "Retired", className: "bg-[#efe7e7] text-[#8c3b36]" },
  repurposed: { label: "Now a heading or subhead", className: "bg-[#e7ecef] text-[#35566b]" },
  moved: { label: "Moved", className: "bg-[#eceae2] text-[#6b6450]" },
  untouched: { label: "Never had one", className: "bg-black/[0.05] text-black/45" },
};

function Badge({ kind }: { kind: EyebrowState["kind"] }) {
  const b = BADGE[kind];
  return (
    <span className={`inline-block px-2 py-[3px] rounded text-[11px] font-semibold ${b.className}`}>
      {b.label}
    </span>
  );
}

function EyebrowDetail({ state, live }: { state: EyebrowState; live: string | null }) {
  if (state.kind === "untouched") {
    return <span className="text-black/35">—</span>;
  }
  if (state.kind === "repurposed") {
    return (
      <div className="text-[13px] leading-[1.5]">
        <div className="text-black/80">
          &ldquo;{live ?? state.was}&rdquo;
        </div>
        <div className="text-black/45">Renders as {state.rendersAs}.</div>
      </div>
    );
  }
  if (state.kind === "moved") {
    return (
      <div className="text-[13px] leading-[1.5]">
        <div className="text-black/45 line-through">&ldquo;{state.was}&rdquo;</div>
        <div className="text-black/45">Moved into {state.movedTo}.</div>
      </div>
    );
  }
  return (
    <div className="text-[13px] leading-[1.5]">
      <div className="text-black/45 line-through">&ldquo;{state.was}&rdquo;</div>
      <div className="text-black/40">Field is empty. Typing here puts the label back.</div>
    </div>
  );
}

export default function AdminArchitecture() {
  const counts = PAGE_RECORDS.flatMap((p) => p.sections).reduce<Record<string, number>>((acc, s) => {
    acc[s.eyebrow.kind] = (acc[s.eyebrow.kind] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-[960px] p-10">
      <h1 className="text-2xl mb-2">Site Architecture</h1>
      <p className="text-sm text-black/60 max-w-[640px] mb-3">
        Every section heading on the site, read live from the page content. Underneath each one,
        what happened to its eyebrow.
      </p>
      <p className="text-sm text-black/60 max-w-[640px] mb-8">
        Eyebrows were removed on {RETIRED_ON}. The small letterspaced caps label above a heading
        comes from newspaper layout, where it tells you which section a story belongs to on a page
        full of competing stories. This site hands a reader one page in a fixed order, so there was
        nothing to classify and the label repeated the heading underneath it. The fields still exist
        in the editors — a value typed into an empty one will show up on the site again.
      </p>

      <div className="flex gap-2 flex-wrap mb-10 text-[12px]">
        <span className="px-3 py-[6px] rounded bg-[#efe7e7] text-[#8c3b36] font-semibold">
          {counts.retired ?? 0} retired
        </span>
        <span className="px-3 py-[6px] rounded bg-[#e7ecef] text-[#35566b] font-semibold">
          {counts.repurposed ?? 0} now a heading or subhead
        </span>
        <span className="px-3 py-[6px] rounded bg-[#eceae2] text-[#6b6450] font-semibold">
          {counts.moved ?? 0} moved
        </span>
        <span className="px-3 py-[6px] rounded bg-black/[0.05] text-black/45 font-semibold">
          {HARDCODED_RECORDS.length} written in code, no editor field
        </span>
      </div>

      {PAGE_RECORDS.map((page) => (
        <section key={page.page + page.contentFile} className="mb-10">
          <div className="flex items-baseline gap-3 mb-3">
            <h2 className="text-[17px] font-semibold">{page.page}</h2>
            <Link href={page.href} className="text-[12px] text-black/45 underline underline-offset-2">
              {page.href}
            </Link>
            {page.editorHref && (
              <Link href={page.editorHref} className="text-[12px] text-[#35566b] underline underline-offset-2">
                Edit copy
              </Link>
            )}
            <span className="text-[12px] text-black/30 ml-auto font-mono">{page.contentFile}</span>
          </div>

          <div className="border border-black/10 rounded-lg overflow-hidden bg-white">
            <div className="grid grid-cols-[1fr_1.1fr_1.3fr] gap-4 px-4 py-[10px] text-[11px] font-semibold uppercase tracking-[0.06em] text-black/40 border-b border-black/10 bg-black/[0.02]">
              <div>Section</div>
              <div>Heading on the site</div>
              <div>Eyebrow</div>
            </div>

            {page.sections.map((section) => {
              const heading = liveHeading(page, section);
              const live = liveEyebrow(page, section);
              return (
                <div
                  key={section.section}
                  className="grid grid-cols-[1fr_1.1fr_1.3fr] gap-4 px-4 py-[14px] border-b border-black/[0.06] last:border-b-0"
                >
                  <div>
                    <div className="text-[13px] text-black/80">{section.section}</div>
                    <div className="text-[11px] text-black/30 font-mono mt-[2px]">
                      {section.path || "(root)"}
                    </div>
                  </div>

                  <div className="text-[13px] leading-[1.5]">
                    {heading ? (
                      <span className="text-black/80">{heading}</span>
                    ) : (
                      <span className="text-black/35">
                        {section.eyebrow.kind === "repurposed"
                          ? "none — the label above is the heading"
                          : "—"}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="mb-[6px]">
                      <Badge kind={section.eyebrow.kind} />
                    </div>
                    <EyebrowDetail state={section.eyebrow} live={live} />
                    {section.note && (
                      <div className="text-[12px] text-black/45 mt-[6px] leading-[1.45]">{section.note}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section className="mb-10">
        <h2 className="text-[17px] font-semibold mb-1">Written in code</h2>
        <p className="text-sm text-black/55 max-w-[640px] mb-3">
          These never had a Studio field, so they cannot come back by accident. Changing one means
          editing the component.
        </p>
        <div className="border border-black/10 rounded-lg overflow-hidden bg-white">
          {HARDCODED_RECORDS.map((r) => (
            <div
              key={r.where + r.was}
              className="grid grid-cols-[1fr_1fr_1.5fr] gap-4 px-4 py-[13px] border-b border-black/[0.06] last:border-b-0"
            >
              <div>
                <div className="text-[13px] text-black/80">{r.where}</div>
                <div className="text-[11px] text-black/30 font-mono mt-[2px]">{r.file}</div>
              </div>
              <div className="text-[13px] text-black/45 line-through">&ldquo;{r.was}&rdquo;</div>
              <div className="text-[13px] text-black/60 leading-[1.5]">{r.outcome}</div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-[12px] text-black/40 max-w-[640px]">
        The rule behind this page lives in the voice canon, Section 7 (&ldquo;No eyebrows&rdquo;),
        outside this repo. The record itself is{" "}
        <span className="font-mono">app/admin/architecture/architectureRecord.ts</span>.
      </p>
    </div>
  );
}
