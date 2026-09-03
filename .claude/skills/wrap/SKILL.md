---
name: wrap
description: Wrap up the current work session on the Ariba Jahan site — summarize what was built, list outstanding work, capture key decisions, and update PROJECT_STATUS.md so a future session (or a fresh context window in this one) can pick up cleanly. Use this whenever the user says "wrap up", "let's wrap", "session wrap", asks to save/update the status doc, or mentions running low on context and wanting to preserve where things stand before continuing. Also worth proactively suggesting near the end of a substantial work session, even if the user hasn't asked, so PROJECT_STATUS.md doesn't go stale.
---

# Session wrap-up

This produces the same kind of wrap-up done at the close of the session that first built this skill: a chat summary plus a persisted `PROJECT_STATUS.md` in the repo root, committed and pushed like any other change.

## Why this exists

Each session only has the current conversation to work from. Without a written handoff, the next session (or this one after a context reset) has to reconstruct project state from git log and guesswork — slower, and prone to silently redoing settled decisions or missing an open thread. `PROJECT_STATUS.md` is that handoff.

## What to produce

Read back through the current conversation (not just recent messages — the whole session) and pull together:

1. **What was built/done this session.** Concrete, not vague — name the pages, components, fixes, files. Group related work rather than listing every commit individually.
2. **Outstanding work, in priority order.** Anything mentioned, deferred, or flagged but not finished. Include things the user explicitly deferred (e.g. "let's hold on the hero decision") — those are easy to lose track of.
3. **Key decisions to carry forward.** Anything that isn't obvious from reading the code — a convention adopted, a rule established, a "we tried X, it didn't work, do Y instead." These are the things a future session would otherwise have to rediscover the hard way.
4. **Process/tooling notes.** Gotchas with the dev environment, testing tools, or workflow that cost time this session and would cost time again if rediscovered from scratch.

Give the user this as a chat summary first — it's the part they'll actually read in the moment.

## Updating PROJECT_STATUS.md

The file lives at the repo root: `~/ARIBA-WORKSPACE/1-active/ariba-site-2026/ariba-jahan-site/PROJECT_STATUS.md`.

- If it doesn't exist, create it using the structure below.
- If it exists, **update it in place** — merge this session's developments into the existing sections rather than appending a new dated block. "What's built" should always reflect current reality (move finished items out of "Outstanding," add newly-built things), "Outstanding work" should reflect the current priority list (remove what's done, add what's new, re-order if priorities shifted), "Key decisions" should accumulate (don't drop old ones unless they've been explicitly superseded — note the supersession if so), and "Process notes" should stay a short, current list, not a historical log.
- Always update the "Last updated" date at the top.

Structure (headings can flex, but this is the shape that's worked so far):

```markdown
# Project Status

Living wrap-up doc for the Ariba Jahan site build. Updated at the end of each work session so a new session can pick up context fast. Read this first before starting new work.

Last updated: <date>

## What's built
...

## Outstanding work, in priority order
...

## Key decisions to carry forward
...

## Process notes for next session
...
```

Don't let this file become a changelog — it's a snapshot of current state and open threads, not a history of every session. If something from three sessions ago is done and settled, it shouldn't still be taking up space.

## Committing

**Don't commit `PROJECT_STATUS.md`.** It's gitignored deliberately, and the reason matters: this repo
is **public**, and the status doc is written for Ariba, not for an audience. It carries positioning
language, what's unfinished, what she decided against, and operational notes about how the site's
protections work — one entry documents where page passwords are stored and how that could break.
That's a useful note to self and a bad thing to publish.

Git history is also permanent. A file committed today and deleted next week stays readable in the
old commit forever. So the rule is not to commit it in the first place.

`PROJECT_STATUS.md` stays a local file. Write it and stop there.

### Before pushing anything, report on what's private

Two checks, both reported to Ariba in plain language:

1. **What you're deliberately not committing, and why.** Name the files and give the one-line reason
   ("PROJECT_STATUS.md — gitignored, internal notes, repo is public"). She should never have to
   wonder whether something was skipped on purpose or dropped by accident.

2. **Anything that looks sensitive but ISN'T protected yet.** This is the check that actually
   prevents a leak — a gitignored file is already handled, but a *new* file nobody has classified is
   how things slip out. Scan what's staged or untracked for: credentials, tokens, API keys, `.env`
   files, passwords in any form, client names or client work, private contact details, anything
   under a path holding strategy or personal notes. Flag it and stop. Don't decide on her behalf.

If there are other uncommitted code or content changes at wrap time, ask whether to commit them —
don't sweep them up unasked, and don't leave real work sitting unpushed without saying so.

When you do commit here: the git author is already configured at the repo level (a GitHub-issued
noreply address so commits count on her contribution graph) — don't override it or use
`git config --global`. Keep commit messages descriptive of the change, not the motive; they're
public too.
