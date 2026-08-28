import { Octokit } from "@octokit/rest";

const OWNER = "aribajahan";
const REPO = "ariba-jahan-site";
const BRANCH = "main";

export type CommitSource = "studio" | "claude-code" | "manual";

export type CommitSummary = {
  sha: string;
  message: string;
  date: string;
  url: string;
  source: CommitSource;
};

export type CommitActivity = {
  total: number;
  bySource: Record<CommitSource, number>;
  commits: CommitSummary[];
  contributionsToday: number | null;
};

function classify(fullMessage: string): CommitSource {
  const subject = fullMessage.split("\n")[0];
  if (/ via Studio$/.test(subject)) return "studio";
  if (/Co-Authored-By:\s*Claude/i.test(fullMessage)) return "claude-code";
  return "manual";
}

function getClient() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  return new Octokit({ auth: token });
}

/**
 * Pulls recent commit history on main and buckets it by source: published
 * through the Studio CMS, made in a Claude Code session (detected via the
 * Co-Authored-By trailer it adds), or committed some other way.
 */
export async function getCommitActivity(limit = 200): Promise<CommitActivity> {
  const octokit = getClient();

  const commits: CommitSummary[] = [];
  let page = 1;
  while (commits.length < limit) {
    const { data } = await octokit.repos.listCommits({
      owner: OWNER,
      repo: REPO,
      sha: BRANCH,
      per_page: 100,
      page,
    });
    if (data.length === 0) break;
    for (const c of data) {
      commits.push({
        sha: c.sha.slice(0, 7),
        message: c.commit.message.split("\n")[0],
        date: c.commit.author?.date ?? "",
        url: c.html_url,
        source: classify(c.commit.message),
      });
    }
    if (data.length < 100) break;
    page += 1;
  }

  const bySource: Record<CommitSource, number> = { studio: 0, "claude-code": 0, manual: 0 };
  for (const c of commits) bySource[c.source] += 1;

  let contributionsToday: number | null = null;
  try {
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setUTCDate(todayEnd.getUTCDate() + 1);
    const result = await octokit.graphql<{
      user: { contributionsCollection: { contributionCalendar: { totalContributions: number } } };
    }>(
      `query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar { totalContributions }
          }
        }
      }`,
      { login: OWNER, from: todayStart.toISOString(), to: todayEnd.toISOString() }
    );
    contributionsToday = result.user.contributionsCollection.contributionCalendar.totalContributions;
  } catch {
    contributionsToday = null;
  }

  return {
    total: commits.length,
    bySource,
    commits,
    contributionsToday,
  };
}
