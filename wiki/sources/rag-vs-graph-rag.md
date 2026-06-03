# 来源：RAG VS Graph RAG

- **源文件**：[`source/_posts/rag-vs-graph-rag.md`](../../source/_posts/rag-vs-graph-rag.md)
- **分类**：AI探索
- **标签**：AI原理
- **日期**：2026-06-03 07:41:25

## 摘要

作者从工作里接触 agent、知识库与检索，梳理 **传统 RAG** 与 **Graph RAG** 的差异：前者靠切块、向量化与相似度召回；后者用 LLM 抽实体关系建图，再做社区聚类与预生成社区摘要，擅长跨文档关系与宏观总结。Graph RAG 的 LLM 建图、聚类、人工校验与图数据库（如 Neo4j）带来更高成本；简单结构化库用 RAG 即可，复杂关系推理可 **RAG + Graph RAG** 组合。

## 要点

1. **传统 RAG 流水线**：Chunking → Embedding → 提问时向量相似检索 → 把若干文本块交给 LLM 总结。
2. **局限（源文举例）**：分散在多处的事实难拼全局；跨文档隐式关系（如法人 → 控股链）难连点成线。
3. **Graph RAG 流水线**：实体/关系抽取 → 知识图谱 → 社区检测 + 每社区预摘要 → 检索时可用实体与社区级摘要。
4. **擅长**：全书/全库级「讲了什么」、核心抱怨点归纳、多跳关系问答。
5. **成本**：传统 RAG 主要是向量化 + 向量库；Graph RAG 额外大量 LLM 调用、人工审核、图库（Neo4j 社区版能力受限）。
6. **选型**：结构化、关键词/语义块检索够用 → RAG；需要深度关系与宏观推理 → 在传统 RAG 上辅以 Graph RAG。

## 另见

- [RAG 与 Graph RAG](../concepts/rag-and-graph-rag.md)
- [AI Knowledge Bases](../concepts/ai-knowledge-bases.md)
- [LLM Knowledge Bases](../concepts/llm-knowledge-bases.md)
- [LOP（面向大模型编程）模式](../concepts/lop-patterns.md)
- [编译式知识库](../concepts/compiled-knowledge-vault.md)
- [Pinecone Nexus：Knowledge Engine](../sources/pinecone-nexus-knowledge-engine.md)（Agentic RAG 与预编译知识的对照）

---

*维护：Cursor Agent，2026-06-03。*
