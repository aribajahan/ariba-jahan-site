import { getCommitActivity, type CommitSource, type CommitSummary } from "../../../lib/githubActivity";

export const dynamic = "force-dynamic";

const SOURCE_LABEL: Record<CommitSource, string> = {
  studio: "Studio",
  "claude-code": "Claude Code",
  manual: "Manual",
};

function formatDayHeading(dayKey: string) {
  const [year, month, day] = dayKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((today.getTime() - date.getTime()) / 86400000);
  const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  if (diffDays === 0) return `${label} (today)`;
  if (diffDays === 1) return `${label} (yesterday)`;
  return label;
}

function formatTime(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function groupByDay(commits: CommitSummary[]) {
  const groups = new Map<string, CommitSummary[]>();
  for (const c of commits) {
    const dayKey = c.date ? c.date.slice(0, 10) : "unknown";
    if (!groups.has(dayKey)) groups.set(dayKey, []);
    groups.get(dayKey)!.push(c);
  }
  return [...groups.entries()];
}

export default async function AdminActivity() {
  let activity;
  let error: string | null = null;
  try {
    activity = await getCommitActivity();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load commit activity.";
  }

  const days = activity ? groupByDay(activity.commits) : [];

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Site-wide</div>
      <h1 className="text-2xl mb-2">Commit Activity</h1>
      <p className="text-xs text-[#999] mb-6">
        Where your recent commits on main came from: published through the Studio, made in a Claude Code
        session, or committed manually.
      </p>

      {error && (
        <div className="p-[14px] bg-[#fdeaea] border border-[#f0c0c0] rounded-lg text-[13px] text-[#b33] mb-6">
          {error}
        </div>
      )}

      {activity && (
        <>
          <div className="flex gap-6 mb-6 text-sm">
            <div>
              <span className="font-semibold">{activity.total}</span>
              <span className="text-[#999] ml-1">commits tracked</span>
            </div>
            <div>
              <span className="font-semibold">{activity.bySource.studio}</span>
              <span className="text-[#999] ml-1">via Studio</span>
            </div>
            <div>
              <span className="font-semibold">{activity.bySource["claude-code"]}</span>
              <span className="text-[#999] ml-1">via Claude Code</span>
            </div>
            <div>
              <span className="font-semibold">{activity.bySource.manual}</span>
              <span className="text-[#999] ml-1">manual</span>
            </div>
          </div>

          {activity.contributionsToday !== null && (
            <div className="p-[14px] bg-[#FFF7E8] border border-[#F0DFB0] rounded-lg text-[13px] text-[#7a5f1f] mb-6">
              GitHub counts {activity.contributionsToday} contribution{activity.contributionsToday === 1 ? "" : "s"} for
              you today, confirmed straight from GitHub&rsquo;s own contribution data. If the graph on your
              profile looks behind, it&rsquo;s a display refresh lag, not a missing commit.
            </div>
          )}

          <h2 className="text-sm font-semibold mb-3">Commits by day</h2>
          <div className="flex flex-col gap-2 mb-2">
            {days.map(([dayKey, dayCommits]) => (
              <details key={dayKey} className="bg-white border border-[#e2e0dc] rounded-[10px] overflow-hidden">
                <summary className="px-4 py-3 text-sm cursor-pointer select-none flex items-center justify-between">
                  <span>{formatDayHeading(dayKey)}</span>
                  <span className="text-[#999]">{dayCommits.length} commit{dayCommits.length === 1 ? "" : "s"}</span>
                </summary>
                <div className="border-t border-[#f0efec]">
                  {dayCommits.map((c) => (
                    <a
                      key={c.sha}
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-4 py-[10px] text-sm border-b border-[#f5f4f1] last:border-b-0 hover:bg-[#fafaf8]"
                    >
                      <span className="text-[10px] font-semibold tracking-[0.04em] uppercase text-[#999] w-[90px] shrink-0">
                        {SOURCE_LABEL[c.source]}
                      </span>
                      <span className="flex-1 truncate">{c.message}</span>
                      <span className="text-xs text-[#bbb] shrink-0">{formatTime(c.date)}</span>
                    </a>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <p className="text-xs text-[#999] mt-4">
            Click a commit to open it on GitHub and see the full diff. To undo something, either use GitHub&rsquo;s
            Revert option on that commit, or tell me which one and I&rsquo;ll revert it for you.
          </p>
        </>
      )}
    </div>
  );
}
