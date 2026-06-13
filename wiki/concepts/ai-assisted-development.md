# AI 辅助开发

## 定义

使用基于大语言模型的工具（IDE 智能体、MCP、项目规则等）来编写、审阅与重构软件；**架构取舍、验证与集成**仍由人负责。

## 有据可查的主题

- **项目上下文**：把技术栈、运行环境、风格与约定集中写清楚，让模型少「瞎猜」，更接近「第二次就顺手」的质量（[AI 辅助开发探索](../sources/ai-assisted-development-exploration.md)）。
- **角色分工**：把工程师定位成智能体的编排者、输出的导师审阅者、问题的解决者，而不是唯一打字员（同上篇）。
- **质量与安全**：始终以验证为先；留意状态、性能与安全；采用分层审阅——模型先做一遍、人在架构与业务上把关、团队照常守住质量线（[如何提升 AI 代码质量](../sources/improving-ai-code-quality.md)）。
- **迭代**：接受多轮循环；早期输出往往是在帮系统「弄清任务到底是什么」（[如何提升 AI 代码质量](../sources/improving-ai-code-quality.md)）。
- **工具链**：在 Cursor 里通过 Playwright MCP 做浏览器自动化（[Cursor Playwright MCP](../sources/cursor-playwright-mcp.md)）。
- **提示用语**：写提示词时英文动词尽量一致、减少歧义（[提示词常用词汇](../sources/prompt-vocabulary-for-coding.md)）。
- **延伸阅读**：提示工程读物与 Harness 工程化资料可当书签（[提示工程阅读清单](../sources/prompt-engineering-reading-list.md)，[Harness 工程化链接集](../sources/harness-engineering-links.md)）。
- **Claude Code 官方工作流**：[常见工作流](claude-code-workflows.md)（读库/调试/PR/plan mode/计划任务）；[并行代理](claude-code-parallel-agents.md)（子代理、代理视图、团队、动态工作流）。

## 与本 Wiki 的关系

- 本仓库多篇「AI 工程化」博文可串成一张**主题地图**（四组主题、共同主线、下一篇方向）：[AI 工程化写作主轴：四主题索引与下一篇方向](../reports/ai-engineering-theme-synthesis.md)。
- [大语言模型知识库](../concepts/llm-knowledge-bases.md)：给智能体超出单次对话的、可结构化的长期背景的一种方式。
- [AI 知识库](../concepts/ai-knowledge-bases.md)：覆盖「上传资料再查询」式落地；实际开发里常把两种路子组合使用。
- [RAG 与 Graph RAG](../concepts/rag-and-graph-rag.md)：知识库检索底座（向量 RAG vs 图 RAG）选型参考。

## 仓库内当前证据链

- [OpenClaw 智能体与 memory-wiki](../sources/openclaw-agent-pi-mono.md)
- [AI 辅助开发探索](../sources/ai-assisted-development-exploration.md)
- [如何提升 AI 代码质量](../sources/improving-ai-code-quality.md)
- [Cursor Playwright MCP](../sources/cursor-playwright-mcp.md)
- [提示词常用词汇](../sources/prompt-vocabulary-for-coding.md)
- [提示工程阅读清单](../sources/prompt-engineering-reading-list.md)
- [Harness 工程化链接集](../sources/harness-engineering-links.md)
- [Canace 博客索引](../sources/canace-blog-index.md)（较长文章目录，含大量 AI 编程主题）
- [Claude Code 常见工作流程](../sources/claude-code-common-workflows.md)
- [Claude Code 并行运行代理](../sources/claude-code-parallel-agents.md)

## 综合结论

主轴是**治理**：模型加速草稿，但正确性、安全性与可维护性的责任仍在人这边。更强的共享上下文（规则文件、wiki、工单）减少返工；把「多轮审阅、多轮迭代」写进预期，也就不必对「第一版补丁常不对」感到意外。

---

*修订：assistant（Cursor），2026-05-16。*
