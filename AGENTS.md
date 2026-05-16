# Agent Entry Guide

This repository uses task-specific role files in `roles/`. Before doing
substantial work, route the request to the matching role and read that role file
first.

## Role Routing

- Blog writing, article drafting, article structure, or turning notes into a
  Hexo post: read `roles/blog-writer.md` first. Draft new articles in
  `source/_drafts/` and move to `source/_posts/` only after the human confirms,
  unless the human explicitly asks to publish directly.
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
