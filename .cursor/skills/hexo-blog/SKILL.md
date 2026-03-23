---
name: hexo-blog
description: Performs Hexo blog operations in this repo: create or edit posts in source/_posts/, set front matter (categories and tags per AGENTS.md), run serve/build/summary. Use when creating a new post, editing front matter, fixing categories/tags, or running Hexo/local blog commands.
---

# Hexo 博客操作

本技能适用于本仓库的 Hexo 博客。**完整说明见 [docs/hexo-blog.md](../../docs/hexo-blog.md)**，分类与标签规范见 [docs/categories-tags.md](../../docs/categories-tags.md)，分类树见 [docs/blog-category-tree.md](../../docs/blog-category-tree.md)。

## 速查

- 文章目录：`source/_posts/`
- **创建博客**：只创建空白文章，文件内仅含 front matter 元数据，不写正文；正文由用户后续自填。
- 本地预览：`npm run serve` | 构建：`npm run build` | 摘要：`npm run summary` / `npm run summary:regen`
- categories 单选，从 6 个分类中选一；tags 必填，单标签不用数组，双标签用 `[父, 子]`（逗号后一空格）
- 正文格式遵循 `.cursor/rules/md.mdc`（ruanyf/document-style-guide）
- **摘要（description）**：生成或补充 front matter 的 description 时，直接写 `description: 一句话摘要`，不要用引号包裹内容（除非内容含英文双引号等必须转义字符）

操作新文章或改 front matter 时，先查阅 `docs/hexo-blog.md` 与 `docs/categories-tags.md` 确保符合规范。
