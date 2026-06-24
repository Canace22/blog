# SQLite FTS5 是什么，文档检索什么时候用它

- **性质**：对话沉淀为可复用 Q&A（无独立 `source/_posts` 剪藏）。
- **日期**：2026-06-24
- **项目上下文**：md-render「关联文档」搜索；[关联文档搜索能不用向量 embedding 吗](related-doc-keyword-similarity-search.md) 局限段提到 FTS5 / embedding 升级路径

## 问题背景

在讨论 md-render 关联文档的**关键词重合召回**时，wiki 写到「大规模或强语义需求再考虑 FTS5 / embedding」。FTS5 具体指什么？它和当前 `includes` 计数、向量 RAG 分别差在哪？

## 结论

**FTS5** 是 **SQLite 内置的全文检索（Full-Text Search）扩展**（第 5 代模块）。它把文本建索引，支持分词、布尔查询、前缀匹配、`bm25()` 相关性排序，比手写 `includes` 更适合**全文搜索框**场景；但仍主要是**词面匹配**，语义泛化弱于 embedding。

对个人知识库、文档量中小、标题信号强的**即时下拉排序**，继续用 [关键词重合召回](../concepts/keyword-overlap-recall.md) 更划算；文档上千、用户主动搜长 query、需搜正文时再上 FTS5；同义词 / 跨表述关联再考虑 embedding。

## FTS5 能做什么

典型用法是在 SQLite 里建 **虚拟表**：

```sql
CREATE VIRTUAL TABLE docs_fts USING fts5(
  title, body,
  content='docs', content_rowid='id'
);
```

查询示例：

```sql
SELECT rowid, bm25(docs_fts) AS rank
FROM docs_fts
WHERE docs_fts MATCH '关联文档 OR contextRecall'
ORDER BY rank;
```

能力概览：

- **分词**：英文按词；中文依赖 tokenizer（如 `unicode61`），效果因配置而异
- **布尔查询**：`AND` / `OR` / `NOT`、短语 `"exact phrase"`
- **前缀**：`key*` 匹配 `keyword`、`keywords`
- **排序**：内置 `bm25()` 等
- **snippet**：可返回匹配片段

## 三种方案对照

| 维度 | 关键词重合（当前） | FTS5 | 向量 embedding |
| --- | --- | --- | --- |
| 匹配方式 | 抽词 + `includes` 计数 | 词级全文 + BM25 | 语义相似 |
| 基础设施 | 纯 JS 函数 | SQLite + 索引维护 | 模型 + 向量库 |
| 语义泛化 | 弱 | 弱～中（仍词面） | 强 |
| 延迟 | 极低 | 低 | 取决于模型/索引 |
| 可解释性 | 高 | 较高 | 低 |
| 典型场景 | UI 下拉、Agent 轻量召回 | 搜索框、大规模正文检索 | RAG、同义词关联 |

## 什么时候值得上 FTS5

- **继续关键词重合**：几百篇以内、标题/摘要信号强、下拉要极快、零 NLP 依赖
- **考虑 FTS5**：文档上千、用户会输入多词 query、需要搜正文而不只是标题/前若干行
- **考虑 embedding**：「数据库」与「DB」、「RAG」与「检索增强生成」等跨表述也要关联

## 取舍要点

FTS5 优势：**本地、无模型、延迟低、比 `includes` 专业**。  
劣势：**仍是词面匹配**；中文分词质量依赖配置；**文档增删改需同步 FTS 索引**。

---

## 另见

- [关联文档搜索能不用向量 embedding 吗](related-doc-keyword-similarity-search.md)
- [关键词重合召回](../concepts/keyword-overlap-recall.md)
- [RAG 与 Graph RAG](../concepts/rag-and-graph-rag.md)
- [AI Knowledge Bases](../concepts/ai-knowledge-bases.md)

---

*Query 草稿：Cursor Agent；2026-06-24。*
