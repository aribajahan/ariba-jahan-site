import { NextResponse } from "next/server";
import { getCommitDiff } from "../../../../lib/githubActivity";

export async function GET(request: Request) {
  const sha = new URL(request.url).searchParams.get("sha");
  if (!sha || !/^[0-9a-f]{7,40}$/i.test(sha)) {
    return NextResponse.json({ ok: false, error: "Invalid commit sha." }, { status: 400 });
  }

  try {
    const diff = await getCommitDiff(sha);
    return NextResponse.json({ ok: true, diff });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load commit diff.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
