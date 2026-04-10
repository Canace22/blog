# LLM 维护的知识库（概念）

跨来源整理：**人输入资料 -> 持久化 wiki -> 规则驱动 agent 维护**，wiki 作为多工具共用的长期记忆层。

## 定义

这里的 "LLM 维护知识库" 不是指一次性让模型写文档，而是让 agent 按规则持续 ingest、更新、互链、纠错，并让知识在多会话里可追踪复用。

## Claims（综合判断）

| ID | Claim | Confidence | Evidence |
| --- | --- | --- | --- |
| C1 | LLM-maintained wiki 的基础形态是三层：原始资料层、wiki 维护层、规则层。 | High | E1, E2 |
| C2 | 仅有持久化页面还不够；要提升为可维护知识层，需要引入更明确的证据与健康信号。 | Medium | E1, E3 |
| C3 | 在 agent 工作流中，wiki 应承担 system of record 的角色，而不是临时聊天缓存。 | Medium | E1, E2, E3 |

## Evidence（来源与依据）

- `E1` [使用大模型来维护知识库](../sources/llm-wiki.md)
  该来源明确提出 "原始资料 + wiki + 规则" 的基本架构，并强调 wiki 作为跨工具复用的持久中间层。
- `E2` 仓库当前结构（可直接观察）
  `source/_posts/*.md` 作为只读输入，`wiki/` 作为维护层，`AGENTS.md` 提供工作流约束。
- `E3` [OpenClaw Memory Wiki](../sources/openclaw-memory-wiki.md)
  该来源强调 structured claims/evidence、provenance、contradictions、dashboard、lint，说明知识维护可从 "持久化" 继续升级到 "可验证维护"。

## 三层结构（当前可执行模型）

| 层 | 作用 | 在本仓库的对应 |
| --- | --- | --- |
| 原始资料层 | 只读输入，不直接改写 | `source/_posts/*.md` |
| Wiki 维护层 | 索引、摘要、概念、问答、报告 | `wiki/sources/` `wiki/concepts/` `wiki/queries/` `wiki/reports/` |
| 规则层 | 约束 agent 的 ingest/query/lint 行为 | `AGENTS.md` |

## Open Questions（待验证问题）

1. 哪些概念页应强制包含 `claim/evidence/open-questions` 三段结构，哪些可以保持轻量摘要？
2. 是否需要给概念页加最小健康字段（例如 freshness、last-reviewed、confidence）？
3. 当来源间冲突时，是否需要统一的 contradiction 记录格式？
4. 是否要做一个轻量 `wiki lint`，自动检查缺 evidence 的 claim？

## 维护建议

后续可从一页试点扩展到一组高频概念页：

1. 先保留简洁正文，但新增 claim/evidence 显式映射。
2. 每次有新来源加入时，优先更新 Evidence，再判断是否需要调整 Claim。
3. 每月做一次 open questions 回看，决定关闭、拆分或升级为 report。

## 相关

- [编译式知识库（概念）](compiled-knowledge-vault.md) — 更强调 claim / evidence / provenance / lint / dashboard。
- [LOP 模式与产物](lop-patterns.md) — 游戏中的「结构化文档沉淀再迭代」与 wiki/RAG 长期记忆可对照。

## 来源

- [使用大模型来维护知识库](../sources/llm-wiki.md)
- [OpenClaw Memory Wiki](../sources/openclaw-memory-wiki.md)
