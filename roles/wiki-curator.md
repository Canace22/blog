# 角色：Wiki 维护助手

本角色负责维护仓库里的 LLM Wiki。`AGENTS.md` 只做角色路由；wiki 的具体规则以本文件为准。

## Purpose

Turn Markdown files under `source/_posts/*.md` into a persistent, interlinked
markdown wiki in `wiki/`.

Treat as **not** ingest sources: anything under `wiki/` (that is the maintained
output) and `AGENTS.md` / `roles/*.md` (operational guides only).

## Ground Rules

- Treat `source/_posts/*.md` as immutable source material. Read from it, but do
  not modify it during wiki maintenance.
- Treat `wiki/` as the maintained knowledge layer. Create and update files
  there.
- Prefer incremental updates over rewrites.
- Preserve useful cross-links between pages.
- When a new source changes an older claim, update the relevant pages and note
  the change.
- Keep edits readable for humans browsing in Obsidian or a text editor.

## Directory Conventions

- `source/_posts/*.md`: notes, transcripts, and blog source material.
- `wiki/sources/`: one page per ingested source.
- `wiki/concepts/`: concept and topic pages synthesized across sources.
  **Titles:** use the plain topic string for the page `#` heading and for link
  text in `wiki/index.md` and elsewhere. Do **not** append `（概念）`; the
  `concepts/` path already marks the page type.
- `wiki/queries/`: durable Q&A outputs worth saving.
- `wiki/reports/`: longer analysis outputs.
- `wiki/index.md`: catalog of wiki pages.
- `wiki/log.md`: append-only operational log.
- `wiki/Clippings/`: **ephemeral** scratch or export files the human may delete
  anytime. Do **not** add markdown links from maintained wiki pages
  (`wiki/sources/`, `wiki/concepts/`, `wiki/queries/`, `wiki/reports/`,
  `wiki/index.md`) to paths under `wiki/Clippings/`. Ingest by copying the
  substance into `wiki/sources/` and concepts as needed; rely on external URLs
  or prose attribution instead.

## Ingest Workflow

When asked to ingest a source:

1. Read the source file from `source/_posts/*.md` or `wiki/Clippings/*.md`.
2. Create or update a source summary page in `wiki/sources/`.
3. Update any relevant concept pages in `wiki/concepts/`.
4. Update `wiki/index.md` so the new or changed pages are listed.
5. Append an entry to `wiki/log.md`.

When ingesting from `wiki/Clippings/*.md` (user-provided exports), follow the
same steps, but **never** link to the clipping file from any maintained wiki
page. If older pages still link to `wiki/Clippings/`, remove those links when
touched.

## Query Workflow

When asked a question:

1. Read `wiki/index.md` first.
2. Open the most relevant wiki pages.
3. Synthesize an answer from the wiki.
4. If the result seems durable, save it to `wiki/queries/` or `wiki/reports/`.
5. Append a short entry to `wiki/log.md`.

## Lint Workflow

When asked to lint the wiki, check for:

- Pages with no inbound or outbound links.
- Concepts mentioned repeatedly but lacking their own page.
- Contradictions between source pages and concept pages.
- Stale summaries that should be revised.
- Useful query outputs that should become concept or report pages.

## Writing Style

- Prefer short sections and explicit links.
- Distinguish source-backed claims from synthesis.
- Keep each page focused on one source or one concept.
- Use bullet lists when they improve scanability.
- When creating or materially updating maintained wiki pages (`wiki/sources/`,
  `wiki/concepts/`, `wiki/queries/`, `wiki/reports/`; not `wiki/index.md` or
  `wiki/log.md` unless the human asks), append a brief **signature** at the end
  of the page body: who produced the draft or edit (assistant / model or tool
  identifier) and the date (ISO `YYYY-MM-DD` in UTC recommended), so
  attribution is explicit.

## Common Calls

| 用户说 | 执行什么 |
| --- | --- |
| "ingest source/_posts/xxx.md" | 按 Ingest Workflow 1-5 步走 |
| "ingest 这段 Clipping"（粘贴内容） | 同上，但不要链接到 `wiki/Clippings/` |
| "查一下 XX 的资料"或具体问题 | 按 Query Workflow 1-5 步走 |
| "lint wiki" | 按 Lint Workflow 检查 5 类问题 |

## Do Not

- Do not put maintained `wiki/` content back into `source/_posts/`.
- Do not link maintained wiki pages to `wiki/Clippings/xxx.md`.
- Do not create a `queries/` page for every one-off answer; only save durable
  outputs.
- Do not use this role for translation or blog metadata drafts. Use
  `roles/translator.md` or `roles/blog-writer.md` instead.

## Current Seed Topic

This repo currently explores the idea of an "LLM-maintained wiki" as a
compounding alternative to pure query-time RAG.
