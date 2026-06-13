# AI 工程化写作主轴：四主题索引与下一篇方向

本文是对仓库内多篇 AI 工程化相关博文的**主题分组索引**（用户提供的提纲 + wiki 内链），便于从「单篇」跳到「整条叙事线」。

## 一、核心实践：从「会用 AI」到「和 AI 协作开发」

**组内主线**：思维范式从「人下达逐行指令」转向「人给意图 + AI 给 diff」；用规则、约束、任务拆解与经验沉淀让输出可控。

**组内一句话**：AI 工程化的底盘是**上下文工程 + 流程结构化**——给 AI 项目规则、明确约束、拆好的步骤，以及你自己的解题模式。

| 内核（1–2 句） | 来源 |
| --- | --- |
| 传统 IDE 切到 AI IDE 的本质不是换皮，而是工作流从「搜索—打开—逐行改」变成「描述意图—AI 检索—生成 Diff—确认」。 | [ai-coding-ide](../sources/ai-coding-ide.md) |
| AI 赋能存量项目的三段论：项目规则 + 约束（角色/规则）+ 任务拆解；用 Code Review 与自动化测试守住质量。 | [ai-coding-share](../sources/ai-coding-share.md) |
| `Claude.md` 不是越多越好；前沿模型也只能稳定遵守约 150–200 条指令；规则要宁缺毋滥、少于 300 行、少写代码风格、少模板生成。 | [writing-a-good-claude-md](../sources/writing-a-good-claude-md.md) |
| 不同任务用不同 Agent 分组（翻译/周报/调研），隔离上下文 + 定制 Prompt 比单对话串问更稳。 | [ai-worker](../sources/ai-worker.md) |
| Agent 不稳常因「只给目标没给解法」；把个人调 bug、做新功能的固定步骤抽成 Skill 再喂回去，就是经验上下文。 | [agent-coding-stability](../sources/agent-coding-stability.md) · [概念：提升 AI Coding 稳定性的经验上下文模式](../concepts/agent-coding-stability.md) |
| 对 LOP 六种姿势（Direct / Agent / CoV / RAG / Skeleton-Fill / Self-Heal）的整理，并畅想结构化文档驱动的剧本与玩法迭代。 | [ai-coding-game](../sources/ai-coding-game.md) · [LOP 模式](../concepts/lop-patterns.md) |
| 用 SUS、PUEU、HEART 等可量化模型当 prompt，让 AI 给 UI/UX 打分并迭代，把主观审美换成客观抓手。 | [ai-optimize-ui](../sources/ai-optimize-ui.md) |

## 二、工具与 SKILL 实战：让重复的事变成可复用资产

**组内主线**：把「每次都得手做」的事提炼成 Snippets、Skill、提示词词典。

**组内一句话**：AI 提效的复利不在某次回答上，而在你有没有把成功的提示词、流程、Skill 留下来。

| 内核（1–2 句） | 来源 |
| --- | --- |
| Cursor Agent 模式入门全景：rules、`@codebase`、图片转代码、Figma MCP、运维脚本；给 AI 三次机会，工程师做机长不当副驾驶。 | [improve-work-efficiency-with-cursor-practical-notes](../sources/improve-work-efficiency-with-cursor-practical-notes.md) |
| 译文核心结论：「首次 95% 是垃圾、三次尝试才能用」；把 AI 当成记忆每天重置的初级开发，用 `Claude.md` + MCP 给它记忆。 | [translate-use-claude-code](../sources/translate-use-claude-code.md) |
| Skill 写法：总结经验 → 提炼流程 → 标注易跑偏点；适合 Skill 的是「重复 + 有模板」的操作。 | [cursor-skill-web-search-download-movie](../sources/cursor-skill-web-search-download-movie.md) |
| Claude Code 官方：读库/调试/PR 提示模式、plan mode、headless、计划任务；并行见子代理/代理视图/动态工作流。 | [claude-code-common-workflows](../sources/claude-code-common-workflows.md) · [claude-code-parallel-agents](../sources/claude-code-parallel-agents.md) · [概念：Claude Code 常见工作流](../concepts/claude-code-workflows.md) |
| 日常英文开发动词对照表，给人和 AI 一份共享词典，减少歧义。 | [common-programming-prompt-words](../sources/common-programming-prompt-words.md) |
| Electron 里 Cursor debugger 失效可能是 CSP：为 `connect-src` 放行 `http://127.0.0.1:7242`。 | [cursor-debugger](../sources/cursor-debugger.md) |

## 三、知识库 / 上下文工程：给 AI 一份「持久记忆」

**组内主线**：单次对话窗口不够，要靠外部「记忆层」。

**组内一句话**：让 AI 长期可用，靠的不是更长的 context window，而是一份你愿意持续维护的外部知识库。

| 内核（1–2 句） | 来源 |
| --- | --- |
| 知识库 ≠ 让 AI 替你学习；定位应是知识复盘、主题阅读、专有资料检索，否则易沦为被动接收器。 | [AI-knowledge-base](../sources/AI-knowledge-base.md) · [AI Knowledge Bases](../concepts/ai-knowledge-bases.md) |
| 三层架构思路：原始资料 + 规则文件（`CLAUDE.md` / `AGENTS.md`）+ wiki（由 LLM 维护的索引/概念/报告），作跨 agent 长期上下文。 | [llm-wiki](../sources/llm-wiki.md) · [LLM 维护的知识库](../concepts/llm-maintained-wiki.md) |
| Gemini 跨会话「记得你」依赖云端 User Summary（提炼后的记忆碎片），新会话再注入上下文。 | [gemini-new-session-memory](../sources/gemini-new-session-memory.md) · [Chat assistant user memory](../concepts/chat-assistant-user-memory.md) |
| 传统 RAG（切块 + 向量检索）与 Graph RAG（实体关系图 + 社区摘要）的适用场景与成本；复杂关系检索可 RAG + Graph 组合。 | [rag-vs-graph-rag](../sources/rag-vs-graph-rag.md) · [RAG 与 Graph RAG](../concepts/rag-and-graph-rag.md) |

## 四、生成式 UI：聊天交互的下一步

**组内主线**：从聊天到「对话即操作」。

**组内一句话**：关键不是 AI 写 HTML 多漂亮，而是让 AI 输出 **Schema**、由引擎渲染，可控性与可迭代性才能兼得。

| 内核（1–2 句） | 来源 |
| --- | --- |
| 对比聊天里渲染交互式 UI 的四条路径（硬编码 / AI 直出 HTML / 模板卡片 / A2UI Schema），并讨论首次可用率、回退率、可控性、开发迭代成本。 | [qwen-milk-tea-ui](../sources/qwen-milk-tea-ui.md) |

## 整体主轴与下一篇方向（提纲外推）

**全年叙事主轴（合成）**：上下文工程 → 流程/角色拆解 → Skill / 知识库沉淀 → 生成式 UI 边界探索。

**下一篇可写方向（用户笔记）**：把已验证的「AI 角色框架」与「LLM Wiki」串成一条完整的**个人 AI 工作流案例**（含目录骨架 + 规则模板）。与仓库内已有路线图可对照：[从 Harness 到 Compiled Wiki：个人研究路线图](../reports/harness-to-compiled-wiki-roadmap.md)、[Harness Engineering](../concepts/harness-engineering.md)。

---

*草稿与编排：assistant（Cursor），2026-05-16。*
