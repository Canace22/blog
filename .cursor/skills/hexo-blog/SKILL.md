---
name: hexo-blog
description: Performs Hexo blog operations in this repo: create or edit Hexo post metadata, set front matter (categories and tags per AGENTS.md), run serve/build/summary. If the user asks to write or draft article body content, read roles/blog-writer.md first and draft in source/_drafts/ unless explicitly asked to publish.
---

# Hexo 博客操作

本技能适用于本仓库的 Hexo 博客。**完整说明见 [docs/hexo-blog.md](../../docs/hexo-blog.md)**，分类与标签规范见 [docs/categories-tags.md](../../docs/categories-tags.md)，分类树见 [docs/blog-category-tree.md](../../docs/blog-category-tree.md)。

## 速查

- 目录：`source/_posts/`
- **写博客正文**：先读 `roles/blog-writer.md`，默认在 `source/_drafts/` 起草，用户确认后再迁移到 `source/_posts/`。
- **创建空白博客**：仅当用户明确说“空白文章/仅 front matter/新建占位”时，只创建 front matter 元数据，不写正文。
- 本地预览：`npm run serve` | 构建：`npm run build` | 摘要：`npm run summary` / `npm run summary:regen`
- categories 单选，从 6 个分类中选一；tags 必填，单标签不用数组，双标签用 `[父, 子]`（逗号后一空格）
- 正文格式遵循 `.cursor/rules/md.mdc`（ruanyf/document-style-guide）
- **摘要（description）**：生成或补充 front matter 的 description 时，直接写 `description: 一句话摘要`，不要用引号包裹内容（除非内容含英文双引号等必须转义字符）

操作新文章或改 front matter 时，先查阅 `docs/hexo-blog.md` 与 `docs/categories-tags.md` 确保符合规范；涉及正文写作时同时遵循 `roles/blog-writer.md`。
