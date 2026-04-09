# LOP（面向大模型编程）模式（概念）

**LOP**：人主要写 Prompt + 少量代码，由大模型动态生成或修补逻辑；与传统「人写全量逻辑、机器严格执行」相对。

## 六种常见形态（跨来源归纳）

| 形态 | 核心机制 | 典型场景 |
| --- | --- | --- |
| Prompt-to-Code | 单轮直达可运行产物 | 一键小项目、Artifacts |
| Agent 编程 | 多轮编辑/终端/日志 | Cursor 自主改代码、跑测 |
| 验证与结构化推理 | 技术选型→结构→边界→安全 | thinking 块、long-thinking |
| RAG 式生成 | 检索私有库作 context | `@codebase`、向量库 |
| 骨架后填充 | 人定结构与契约，模型补实现 | 文件树 + `// LOP:` 占位 |
| 自愈迭代 | 运行/测试失败反馈回路 | Fix with AI、循环 patch |

## 与「持久化 wiki / 知识库」的交集

RAG 依赖检索当日 context；**结构化文档沉淀**（游戏策划、设定、API 说明等）既可作为 RAG 料，也可由 agent 维护成 wiki，与 [LLM 维护的知识库](llm-maintained-wiki.md) 同属「跨会话记忆」思路。

## 来源

- [面向大模型编程（LOP）在游戏制作流程中的应用畅想](../sources/ai-coding-game.md)
