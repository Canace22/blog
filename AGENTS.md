# Agent Entry Guide

This repository uses task-specific role files in `roles/`. Before doing
substantial work, route the request to the matching role and read that role file
first.

## Role Routing

- Creating a new Hexo blog draft: read `roles/blog-writer.md` first. Create
  metadata-only files in `source/_drafts/` (front matter only, no body); move to
  `source/_posts/` only after the human confirms, unless they explicitly ask to
  publish directly.
- Translation: read `roles/translator.md` first.
- Weekly report generation: read `roles/weekly-report.md` first.
- Wiki maintenance, source ingest, durable query capture, report synthesis, or
  wiki lint: read `roles/wiki-curator.md` first.

If a request does not match any role, follow the user's instruction and inspect
the relevant local files before changing anything.

## Global Notes

- Keep changes small and task-scoped.
- Prefer existing repository conventions over inventing new structure.
- If a role file conflicts with this entry guide, the role file wins for that
  task.

## Document Formatting

Follow the formatting guidelines in https://github.com/ruanyf/document-style-guide/tree/master and docs/categories-tags.md.
