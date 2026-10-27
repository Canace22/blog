---
name: wiki-query-capture
description: Capture durable Q&A or conversation takeaways into this blog wiki. Use when the user says "query 到我的博客", "总结背景和实现，query 到博客", "把刚刚这个问题沉淀到 wiki", "写成可复用 query", or asks to preserve a discussion as a durable wiki query. Writes focused pages under wiki/queries/ and updates wiki/index.md plus wiki/log.md.
---

# Wiki Query Capture

把一次对话沉淀成可复用的 `wiki/queries/` 页面，而不是写成聊天记录或项目流水账。

## 先读

- `AGENTS.md`
- `roles/wiki-curator.md`
- `wiki/index.md`
- 1-2 篇相邻 query，优先选同主题页面。

## 什么时候值得写 query

只保存有复用价值的问答：

- 一个问题以后可能反复遇到。
- 解释里有可迁移的问题类型、判断框架或实现边界。
- 对话里出现了用户偏好的表达方式或项目特有经验。
- 不是纯一次性状态汇报、简单命令结果或临时排障日志。

## 写作方式

不要只写“我改了什么”。先把问题抽象出来，再落回当前案例。

推荐结构：

```markdown
# 一个可复用的问题标题

- **性质**：对话沉淀为可复用 Q&A
- **日期**：YYYY-MM-DD
- **项目上下文**：项目 / 模块 / 场景
- **关键词**：关键词 1、关键词 2、关键词 3

## 问题

写背景、症状和为什么值得记录。不要直接进实现细节。

## 回答

先命名问题类型，再给通用解释。

### 推荐分层

按 3-5 层写：状态、协议、数据、UI、验证等。

## 在当前项目里的实现

写真实落地点、关键文件、边界选择和为什么不改其它层。

## 验证点

列用户以后能复查的 case。

## 一句话总结

一句可复用的结论。

## 另见

- [相关 query](relative-link.md)

*Query 草稿：Codex 整理本轮对话；YYYY-MM-DD。*
```

## 写作原则

- 先写“这是什么类型的问题”，再写“当前项目怎么做”。
- 背景要说明用户为什么会困惑，避免变成提交说明。
- 实现要写边界：为什么放在这个层，不放在另一个层。
- 如果涉及代码，点出关键文件和调用链，但不要贴大段代码。
- “另见”至少放 2 条相关链接；没有合适链接时先用 `rg` 查 `wiki/queries`、`wiki/concepts`。
- 语气简洁，像技术复盘，不像营销文章。

## 落库步骤

1. 选 slug：小写英文，用连字符，例如 `ai-assistant-loading-and-typing-response.md`。
2. 新增 `wiki/queries/<slug>.md`。
3. 在 `wiki/index.md` 的 `## Queries` 追加一条链接。
4. 在 `wiki/log.md` 顶部追加一条日期日志。
5. 轻量验证：
   - `rg -n "<标题或 slug>" wiki/index.md wiki/log.md wiki/queries/<slug>.md`
   - `git diff --check -- wiki/index.md wiki/log.md wiki/queries/<slug>.md`
   - `git status --short`

## 注意

- 不要修改 `source/_posts/`。
- 不要链接到 `wiki/Clippings/`。
- 不要把所有聊天都保存；只保存 durable 的 query。
- 发现已有相同主题 query 时，优先增量更新旧页，不要新建重复页。
