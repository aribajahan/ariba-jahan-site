@AGENTS.md

# Writing copy for this site

Site copy is governed by Ariba's voice canon. Read it before drafting or editing any user-facing
string — Section 1 (foundation, always active) and Section 7 (Website) in full:

`~/ARIBA-WORKSPACE/_context/ariba-voice-canon.md`

Or invoke the `writing` skill with `website` and it loads the right sections for you.

That file is outside this repo on purpose. It carries positioning strategy that shouldn't be
published, and this repo is public.

**Copy lives in `content/pages/*.json` and deploys through the Studio.** Editing the JSON here does
not reach production on its own. Hand Ariba paste-ready strings and name the field each one goes in.

`COPY.md` at the repo root is every word of live site copy in one readable file. Read it to see what
the site currently says. It's generated — the publish route rebuilds it on every Studio save, and
`npm run copy` rebuilds it locally. Never edit it by hand; the next publish overwrites it.

# This repo is public

Everything here is readable by anyone: files, commit messages, tag names, and every past version.
Git history is permanent — deleting a file next week leaves it fully readable in this week's commit.
There is no clean undo, so the discipline is not committing it in the first place.

**Ask this before adding any file:** would it be fine on a billboard with her name on it?

The site's own copy, code, and design assets pass. These do not:

- **Secrets** — API keys, tokens, passwords, `.env` files. Page passwords are a solved case (the
  publish route scrambles them; see `lib/pageAccess.ts`), but anything new is not.
- **Notes written for Ariba rather than for an audience** — status docs, strategy, positioning
  rationale, what she decided against, what's unfinished. `PROJECT_STATUS.md` and
  `PROJECT_OVERVIEW.md` are gitignored for this reason.
- **Anything about other people** — client names, client work, private contacts, anything said to
  her in confidence.
- **Notes on how the site's protections work** — which pages are gated and how, where credentials
  live, known gaps.

When something doesn't clearly pass, ask her. Don't classify it alone, and don't assume a file is
safe because a similar one is already committed.

Commit messages follow the same rule: describe the change, not the motive. "Rewrite positioning
section," never the opportunity or conversation behind the rewrite.
