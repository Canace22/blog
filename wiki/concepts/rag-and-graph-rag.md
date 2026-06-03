# RAG 与 Graph RAG

## 传统 RAG（检索增强生成）

**RAG（Retrieval-Augmented Generation）** 在问答前先从知识库取相关片段，再交给大模型生成答案。典型步骤：

| 阶段 | 做什么 |
| --- | --- |
| 切块（Chunking） | 把 PDF、Word 等切成固定长度文本块 |
| 向量化（Embedding） | 文本块 → 向量，存入向量库 |
| 检索（Retrieval） | 问题也向量化，按相似度取 Top-K 块 |
| 生成 | 把块作为 context，由 LLM 总结回答 |

**强项**：语义检索、自然语言提问、实现与运维相对轻（向量库为主）。

**弱项（源文归纳）**：

- **局部召回**：问「三大核心风险」时，若风险分散在多章，仅靠含「风险」字样的块难做全局归纳。
- **跨块关系**：事实分布在不相邻文档时（如 A 文档法人、B 文档控股链），难自动拼成多跳推理。

## Graph RAG

**Graph RAG**（微软等推动）把文档视为 **实体—关系网络**，而非孤立文本块：

1. **实体与关系抽取**：LLM 从文本抽出人/事/物及「属于、导致」等关系。
2. **图谱构建**：实体与关系连成知识图谱。
3. **社区聚类（Community Detection）**：关系紧密的子图划为社区，并为每个社区 **预生成摘要**。
4. **检索与生成**：除具体实体外，可调用社区摘要，回答宏观、关系型问题。

**强项**：全书级故事线、用户反馈核心主题、多跳关系（如 A → B → C）。

**成本**：建图与聚类阶段 LLM 调用多；常需人工校验实体关系；除向量库外常需图数据库（如 Neo4j，商业版能力更完整）。

## 与仓库内其它概念的关系

- **[AI Knowledge Bases](../concepts/ai-knowledge-bases.md)**：产品化知识库多在 **查询时** 检索上传文档；RAG 是其中常见底座。
- **[LLM Knowledge Bases](../concepts/llm-knowledge-bases.md)**：维护型 wiki 是 **预编译合成**，与「每次问才捞碎片」的 Plain RAG 形成对照；可与 RAG 检索层组合使用。
- **[LOP 模式](../concepts/lop-patterns.md)** 中的「RAG 式生成」：IDE 里 `@codebase`、向量库即传统 RAG 形态。
- **[编译式知识库](../concepts/compiled-knowledge-vault.md)** / [Pinecone Nexus](../sources/pinecone-nexus-knowledge-engine.md)：企业侧用 **预编译 artifact** 降低 Agentic RAG 的查询时 token 成本，与 Graph RAG「先建结构再答」同属 **先投入、后检索更省** 的思路，但技术路径不同（artifact/图社区 vs 纯向量块）。

## 选型（源文结论）

| 场景 | 倾向 |
| --- | --- |
| 结构化、块级语义检索够用 | 传统 RAG |
| 跨文档关系、宏观摘要、多跳推理 | Graph RAG，或 **RAG + Graph RAG** |
| 成本敏感、语料可切块即可 | 优先 RAG，慎用全量 Graph 管线 |

## 来源

- [RAG VS Graph RAG](../sources/rag-vs-graph-rag.md)
- [How LLMs Work（可视化长文）](../sources/ynarwal-how-llms-work-visual.md)（RAG 章节背景）
- [大语言模型工作原理概览](../concepts/large-language-model-fundamentals.md)

---

*维护：Cursor Agent，2026-06-03。*
