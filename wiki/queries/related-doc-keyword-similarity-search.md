# 关联文档搜索能不用向量 embedding 吗

- **性质**：对话沉淀为可复用 Q&A（无独立 `source/_posts` 剪藏）。
- **日期**：2026-06-24
- **项目上下文**：md-render Markdown 编辑器，元数据面板「关联文档」选择器

## 问题背景

在 md-render 里给「关联文档」下拉加搜索时，需要按相似度排序候选文档。文档量中小、希望零外部 NLP 依赖、且 Agent 工具 `recall_related_docs` 已有轻量召回逻辑——能否复用同一套启发式，而不上向量 embedding？

## 结论

**可以。** 复用 Agent `recall_related_docs` 同源的纯函数：从标题/正文抽关键词（中文 2-gram + 停用词，标题权重 ×3），对候选文档按关键词 `includes` 命中数打分；无搜索词时按当前文档相似度推荐，有搜索词时按搜索词语义接近度排序；得分为 0 时回退文件名子串匹配或按名称排序。

相似度定义是**关键词重合计数**，非 cosine / embedding；零外部 NLP 依赖，可单测。

## 实现要点

1. **抽词**：`extractRecallKeywords` — 标题 ×3 + 正文前 12 行 ×1，最多 8 词；中文 2-gram，英文整词。
2. **排序**：`rankRelatedDocs` — haystack = 标题 + 正文 + 摘要；`_score` 降序，排除自身与已关联文档。
3. **选择器入口**：`searchRelatedDocCandidates` — 空搜索词用当前文档；有搜索词用搜索词；limit 默认 20。
4. **UI**：Ant Design `Select` + `filterOption={false}`，排序逻辑不在组件内而在 `contextRecall.js`。
5. **复用**：Agent 工具 `recall_related_docs` 与元数据面板共用同一模块。

## 局限与适用场景

同义词/近义表达弱；适合个人知识库、标题摘要信号强、文档量中小场景。大规模或强语义需求再考虑 FTS5 / embedding。

## 另见

- [SQLite FTS5 是什么，文档检索什么时候用它](sqlite-fts5-for-doc-search.md)（FTS5 / embedding 升级路径详解）
- [md-render：资产优先与业务编排原则](md-render-asset-orchestration-principles.md)（关联召回应挂在资产层，不绑业务页）
- [关键词重合召回](../concepts/keyword-overlap-recall.md)
- [RAG 与 Graph RAG](../concepts/rag-and-graph-rag.md)（向量检索对照）
- [AI Knowledge Bases](../concepts/ai-knowledge-bases.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)

---

*Query 草稿：Cursor Agent；2026-06-24。*
