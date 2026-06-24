# 关键词重合召回

## 定义

一种**不依赖向量 embedding** 的文档相似度排序：从查询文本（或当前文档）提取关键词，在候选文档的标题 + 正文 + 摘要中统计关键词命中数，按命中数降序返回 top N。

与 [RAG 与 Graph RAG](rag-and-graph-rag.md) 中的向量相似检索不同，这里是**字面重合 + 轻量分词启发式**，适合中小规模、低基础设施成本的场景。

## 典型流水线

1. **分词 / 抽词**：去 Markdown 标记；中文切 2-gram；英文按空格切词；去停用词与单字噪声。
2. **加权**：标题词权重高于正文（常见比例 3:1）；长文只看前若干行抓主题。
3. **打分**：候选 haystack 对每条关键词做 `includes`，命中 +1。
4. **过滤与排序**：排除自身；过滤 0 分；按 `_score` 降序；截断 limit。
5. **回退**：相似度无命中 → 文件名子串；仍无信号 → 按名称排序。

## 与向量 RAG 的对比

| 维度 | 关键词重合召回 | 向量 RAG |
| --- | --- | --- |
| 基础设施 | 纯 JS 函数即可 | embedding 模型 + 向量库 |
| 语义泛化 | 弱（同义词难关联） | 强 |
| 延迟 | 极低，适合 UI 下拉 | 取决于索引与模型 |
| 可解释性 | 高（可见命中哪些词） | 低（黑盒相似度） |
| 适用规模 | 个人 / 小团队知识库 | 大规模语料 |

## 仓库内证据

- [关联文档搜索能不用向量 embedding 吗](../queries/related-doc-keyword-similarity-search.md)（md-render `contextRecall.js` + `RelatedDocPicker`）
- [RAG VS Graph RAG](../sources/rag-vs-graph-rag.md)
- [RAG 与 Graph RAG](rag-and-graph-rag.md)

## 实践结论

关键词重合召回是「够用版相似度」：在 Agent 召回相关旧文、编辑器关联文档下拉等**即时、轻量**场景，复用同一套纯函数比单独上 embedding 更划算。语义缺口用文件名子串或后续 [FTS5 / 向量层](../queries/sqlite-fts5-for-doc-search.md) 补齐。

若针对现有文档库过度调参（停用词、权重、截断行数），在新文档或新问法上召回变差，可类比 [过拟合](../queries/what-is-overfitting.md)——对当前语料过拟合、泛化不足。

---

*维护：Cursor Agent，2026-06-24（补过拟合类比互链）。*
