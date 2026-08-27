import { Octokit } from "@octokit/rest";

const OWNER = "aribajahan";
const REPO = "ariba-jahan-site";
const BRANCH = "main";

export type FileChange = { path: string; content: string };

function getClient() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  return new Octokit({ auth: token });
}

/**
 * Commits one or more file changes (and optionally deletions) to the repo as
 * a single atomic commit, so a Publish that touches several content files
 * (e.g. a page's JSON plus a newly-uploaded image) never lands as multiple
 * partial commits.
 */
export async function publishFiles(files: FileChange[], message: string, deletions: string[] = []) {
  if (files.length === 0 && deletions.length === 0) throw new Error("No files to publish.");
  const octokit = getClient();

  const { data: ref } = await octokit.git.getRef({ owner: OWNER, repo: REPO, ref: `heads/${BRANCH}` });
  const latestCommitSha = ref.object.sha;

  const { data: latestCommit } = await octokit.git.getCommit({
    owner: OWNER,
    repo: REPO,
    commit_sha: latestCommitSha,
  });

  const blobs = await Promise.all(
    files.map(async (file) => {
      const isText = !file.content.startsWith("__base64__:");
      const { data: blob } = await octokit.git.createBlob({
        owner: OWNER,
        repo: REPO,
        content: isText ? file.content : file.content.slice("__base64__:".length),
        encoding: isText ? "utf-8" : "base64",
      });
      return { path: file.path, sha: blob.sha };
    })
  );

  const { data: newTree } = await octokit.git.createTree({
    owner: OWNER,
    repo: REPO,
    base_tree: latestCommit.tree.sha,
    tree: [
      ...blobs.map((b) => ({
        path: b.path,
        mode: "100644" as const,
        type: "blob" as const,
        sha: b.sha,
      })),
      ...deletions.map((path) => ({
        path,
        mode: "100644" as const,
        type: "blob" as const,
        sha: null,
      })),
    ],
  });

  const author = { name: "Ariba Jahan", email: "4304091+aribajahan@users.noreply.github.com" };

  const { data: newCommit } = await octokit.git.createCommit({
    owner: OWNER,
    repo: REPO,
    message,
    tree: newTree.sha,
    parents: [latestCommitSha],
    author,
    committer: author,
  });

  await octokit.git.updateRef({
    owner: OWNER,
    repo: REPO,
    ref: `heads/${BRANCH}`,
    sha: newCommit.sha,
  });

  return { commitSha: newCommit.sha, commitUrl: `https://github.com/${OWNER}/${REPO}/commit/${newCommit.sha}` };
}
