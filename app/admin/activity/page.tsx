import { getCommitActivity, type CommitSource } from "../../../lib/githubActivity";

export const dynamic = "force-dynamic";

const SOURCE_LABEL: Record<CommitSource, string> = {
  studio: "Studio",
  "claude-code": "Claude Code",
  manual: "Manual",
};

const SOURCE_STYLE: Record<CommitSource, string> = {
  studio: "bg-[#E8F5FF] text-[#1a5c8a] border border-[#c5e2f5]",
  "claude-code": "bg-[#F3EEFF] text-[#5a3fa0] border border-[#ddd0f7]",
  manual: "bg-[#F0F0F0] text-[#555] border border-[#ddd]",
};

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminActivity() {
  let activity;
  let error: string | null = null;
  try {
    activity = await getCommitActivity();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load commit activity.";
  }

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
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-white border border-[#e2e0dc] rounded-[10px] p-4">
              <div className="text-2xl font-semibold">{activity.total}</div>
              <div className="text-xs text-[#888] mt-1">Commits tracked</div>
            </div>
            <div className="bg-white border border-[#e2e0dc] rounded-[10px] p-4">
              <div className="text-2xl font-semibold">{activity.bySource.studio}</div>
              <div className="text-xs text-[#888] mt-1">Via Studio</div>
            </div>
            <div className="bg-white border border-[#e2e0dc] rounded-[10px] p-4">
              <div className="text-2xl font-semibold">{activity.bySource["claude-code"]}</div>
              <div className="text-xs text-[#888] mt-1">Via Claude Code</div>
            </div>
            <div className="bg-white border border-[#e2e0dc] rounded-[10px] p-4">
              <div className="text-2xl font-semibold">{activity.bySource.manual}</div>
              <div className="text-xs text-[#888] mt-1">Manual</div>
            </div>
          </div>

          {activity.contributionsToday !== null && (
            <div className="p-[14px] bg-[#FFF7E8] border border-[#F0DFB0] rounded-lg text-[13px] text-[#7a5f1f] mb-6">
              GitHub counts {activity.contributionsToday} contribution{activity.contributionsToday === 1 ? "" : "s"} for
              you today, confirmed straight from GitHub&rsquo;s own contribution data. If the graph on your
              profile looks behind, it&rsquo;s a display refresh lag, not a missing commit.
            </div>
          )}

          <h2 className="text-sm font-semibold mb-3">Recent commits</h2>
          <div className="flex flex-col gap-2 mb-5">
            {activity.recent.map((c) => (
              <a
                key={c.sha}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="bg-white border border-[#e2e0dc] rounded-[10px] px-4 py-3 flex items-center gap-3 hover:border-[#bbb]"
              >
                <span className={`text-[10px] font-bold tracking-[0.04em] uppercase px-2 py-[3px] rounded shrink-0 ${SOURCE_STYLE[c.source]}`}>
                  {SOURCE_LABEL[c.source]}
                </span>
                <span className="flex-1 text-sm truncate">{c.message}</span>
                <span className="text-xs text-[#999] shrink-0">{formatDate(c.date)}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
