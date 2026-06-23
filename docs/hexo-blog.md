# Hexo 博客操作

本仓库为 Hexo 博客，文章在 `source/_posts/`。分类与标签规范见 [categories-tags.md](categories-tags.md)，分类树见 [blog-category-tree.md](blog-category-tree.md)。

## 在 Cursor 里怎么用（Skills）

本仓库有一个 **hexo-blog** 技能（`.cursor/skills/hexo-blog/SKILL.md`）。在 Cursor 里和 AI 对话时，只要说到和博客相关的事，Agent 会按这份规范来操作。

**怎么说会触发：**

- 「创建博客」「新建博客草稿」「建一篇新文章」→ 先读 `roles/blog-writer.md`，在 `source/_drafts/` 创建**仅含 front matter** 的草稿，不写正文
- 「给这篇文章改下分类/标签」「把这篇的 tags 改成 xxx」
- 「跑一下博客预览」「本地起一下 Hexo」「构建博客」
- 「按规范检查/修一下这篇的 front matter」

**Agent 会做的事：** 新建草稿时按 `roles/blog-writer.md` 只写元数据；修改时按 `docs/hexo-blog.md` 和 `docs/categories-tags.md` 用对路径和 Front Matter 格式，分类和标签从规范里选。把对话/笔记整理成博文正文走 wiki ingest 或 `canace-blog-ingest` 技能，不走 `blog-writer`。

## 与 blog-writer 角色的分工

- `roles/blog-writer.md`：新建草稿，只填 front matter，正文留空。
- `.cursor/skills/hexo-blog/SKILL.md`：Hexo 路径、Front Matter、分类标签、预览、构建和摘要命令。
- 整理已有材料写成博文正文：用 wiki ingest（`roles/wiki-curator.md`）或全局 `canace-blog-ingest` 技能，不用 `blog-writer`。

## 路径与命令

| 用途 | 说明 |
|------|------|
| 目录 | `source/_posts/`，新建文章放此处，文件名建议英文或拼音+日期 |
| 本地预览 | `npm run serve`（内部执行 `./test.sh s`；会先同步 `wiki/` → `source/wiki/` 再生成站点） |
| 构建 | `npm run build`（内部执行 `./test.sh d`） |
| 知识库在线入口 | 主题菜单「知识库」→ `/wiki/`；说明见 [wiki-rule.md](wiki-rule.md) 的「Blog 内访问」 |
| 生成摘要 | `npm run summary`；强制重新生成 `npm run summary:regen` |

## Mermaid 图表

站点使用 **`hexo-filter-mermaid-diagrams`**：Markdown 里标准的 ` ```mermaid ` 代码块会在生成时变成 `<pre class="mermaid">`，页脚再加载 [Mermaid](https://mermaid.js.org/) JS 渲染。

- **配置**：仓库根目录 `_config.yml` 中的 `mermaid`（如 `enable`、`version`、`theme`）。
- **脚本**：主题 `themes/maupassant/layout/_partial/after_footer.pug`（与官方插件说明一致：页脚引入 `mermaid.min.js` 并 `initialize`）。
- **安装**：根目录执行 `npm install` 确保依赖含 `hexo-filter-mermaid-diagrams`。

## Front Matter 必守规则

1. **分类（categories）**：单选，且只能是以下之一（直接写值，不加引号、不用数组）  
   `编程基础`、`Web开发`、`工程化与运维`、`AI探索`、`软技能与思考`、`网站建设`

2. **标签（tags）**：每篇必有，且必须从 [categories-tags.md](categories-tags.md) 中「分类 → 可选标签」表里选：
   - 单标签：`tags: 计算机科学`（不用数组）
   - 双标签：`tags: [前端, 框架与库]`（数组，父在前，逗号后一空格）
   - 特殊：`JavaScript&TypeScript` 作为独立单标签使用，不加「前端」前缀

3. **禁止**：尾部空格、用引号包 categories/tags、双标签顺序颠倒。

## 标准 Front Matter 模板

```yaml
---
title: 文章标题
categories: Web开发
tags: [前端, 框架与库]
author: Canace
comments: true
date: 2025-01-01 10:00:00
---
```

可选：`description`、`toc: true` 等按需添加。

## 新建博客草稿（仅元数据）

按 `roles/blog-writer.md`：

1. 在 `source/_drafts/` 下新建 `.md` 文件（如 `my-new-post.md`）。
2. 写入标准 Front Matter，按 [categories-tags.md](categories-tags.md) 选择正确的 `categories` 和 `tags`。
3. **不写正文**——正文留空，由用户自行撰写；撰写时正文格式遵循 `.cursor/rules/md.mdc`（ruanyf/document-style-guide）。
4. 用户确认元数据后，再迁移到 `source/_posts/` 发布。

## 从材料整理博文正文

若要把对话、笔记、剪藏整理成博文正文，不走 `blog-writer`，而用 wiki ingest（`roles/wiki-curator.md`）或全局 `canace-blog-ingest` 技能。

## 修改已有文章时

- 只改 front matter：确保 categories/tags 符合规范，不引入格式错误。
- 改正文：保持 Markdown 与文档规范一致，不破坏现有 front matter。

## 相关文档

- [分类与标签规范](categories-tags.md)
- [分类树说明](blog-category-tree.md)
