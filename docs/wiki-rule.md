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

## Ingest Workflow

When asked to ingest a source:

1. Read the source file from the `source/_posts/*.md`.
2. Create or update a source summary page in `wiki/sources/`.
3. Update any relevant concept pages in `wiki/concepts/`.
4. Update `wiki/index.md` so the new or changed pages are listed.
5. Append an entry to `wiki/log.md`.

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

## Blog 内访问（知识库页面）

- 维护入口不变：只在仓库根目录 `wiki/` 下编辑；**不要**手工改 `source/wiki/`（该目录为构建生成物，且已在 `.gitignore` 中忽略）。
- 构建或本地预览前会执行 `node tools/sync-wiki-for-hexo.mjs`（已接入 `test.sh`）：把 `wiki/**/*.md` 拷贝到 `source/wiki/`，加上 Hexo 所需 front matter，并把指向 `_posts` 的链接改成本站文章路径、wiki 内 `.md` 链接改成 `.html`。
- 部署后入口：**导航栏「知识库」** → `/wiki/`，目录页为 `wiki/index.md` 对应页面。

单独同步（不跑完整 Hexo）：`node tools/sync-wiki-for-hexo.mjs`
