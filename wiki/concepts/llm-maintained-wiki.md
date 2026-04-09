# LLM 维护的知识库（概念）

跨来源整理：**人输入资料 → 持久化 wiki → 规则驱动 agent 维护**，wiki 作为多工具共用的长期记忆层。

## 三层结构

| 层 | 作用 |
| --- | --- |
| 原始资料 | 笔记、剪藏、博客文章等，只读输入 |
| Wiki | 索引、摘要、对话与报告产物，可增量更新 |
| 规则 | 定义目录约定、工作流（ingest / query / lint 等） |

## 与本仓库的对应

本仓库的 `docs/wiki-rule.md` 描述 agent 如何把 `source/_posts/*.md` 等整理进 `wiki/`，与文中「规则 + wiki」一致。

## 相关

- [LOP 模式与产物](lop-patterns.md) — 游戏中的「结构化文档沉淀再迭代」与 wiki/RAG 长期记忆可对照。

## 来源

- [使用大模型来维护知识库](../sources/llm-wiki.md)
