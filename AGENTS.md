# LLM Wiki Operating Guide

This repository is a personal knowledge base maintained by an LLM agent.

## Purpose

The agent should turn all Markdown files under the `source/_posts/*.md`, into a persistent, interlinked markdown wiki in `wiki/`.

Treat as **not** ingest sources: anything under `wiki/` (that is the maintained output) and this `AGENTS.md` file (operational guide only).

## Ground Rules

- Treat `source/_posts/*.md` as immutable source material. Read from it, but do not modify it.
- Treat `wiki/` as the maintained knowledge layer. Create and update files there.
- Prefer incremental updates over rewrites.
- Preserve useful cross-links between pages.
- When a new source changes an older claim, update the relevant pages and note the change.
- Keep edits readable for humans browsing in Obsidian or a text editor.

## Directory Conventions

- `source/_posts/*.md`: notes, transcripts
- `wiki/sources/`: one page per ingested source
- `wiki/concepts/`: concept and topic pages synthesized across sources
- `wiki/queries/`: durable Q&A outputs worth saving
- `wiki/reports/`: longer analysis outputs
- `wiki/index.md`: catalog of wiki pages
- `wiki/log.md`: append-only operational log
- `wiki/Clippings/`: **ephemeral** scratch or export files the human may delete anytime. **Do not add markdown links from maintained wiki pages** (`wiki/sources/`, `wiki/concepts/`, `wiki/queries/`, `wiki/reports/`, `wiki/index.md`) to paths under `wiki/Clippings/`. Ingest by copying the substance into `wiki/sources/` (and concepts as needed); rely on external URLs (e.g. Gemini app link) or prose attribution instead.

## Ingest Workflow

When asked to ingest a source:

1. Read the source file from the `source/_posts/*.md`.
2. Create or update a source summary page in `wiki/sources/`.
3. Update any relevant concept pages in `wiki/concepts/`.
4. Update `wiki/index.md` so the new or changed pages are listed.
5. Append an entry to `wiki/log.md`.

When ingesting from `wiki/Clippings/*.md` (user-provided exports): follow the same steps, but **never** link to the clipping file from any maintained wiki page. If older pages still link to `wiki/Clippings/`, remove those links when touched.

## Query Workflow

When asked a question:

1. Read `wiki/index.md` first.
2. Open the most relevant wiki pages.
3. Synthesize an answer from the wiki.
4. If the result seems durable, save it to `wiki/queries/` or `wiki/reports/`.
5. Append a short entry to `wiki/log.md`.

## Lint Workflow

When asked to lint the wiki, check for:

- pages with no inbound or outbound links
- concepts mentioned repeatedly but lacking their own page
- contradictions between source pages and concept pages
- stale summaries that should be revised
- useful query outputs that should become concept or report pages

## Writing Style

- Prefer short sections and explicit links.
- Distinguish source-backed claims from synthesis.
- Keep each page focused on one source or one concept.
- Use bullet lists when they improve scanability.

## Current Seed Topic

This repo currently explores the idea of an "LLM-maintained wiki" as a compounding alternative to pure query-time RAG.
