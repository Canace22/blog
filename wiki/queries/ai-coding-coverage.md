# 查询：我的文章涵盖 AI Coding 哪几方面

## 问题

我写的文章涵盖 AI Coding 哪几方面？

## 结论

从当前仓库里与 AI Coding 直接相关的文章来看，主题覆盖已经不只是「让 AI 写代码」，而是形成了一个比较完整的工作流视角，主要包括以下几方面。

### 1. AI IDE 与开发工作流迁移

- 从传统 IDE 切换到 AI IDE，关注操作习惯、插件、性能、多项目协作等现实问题。
- 代表文章：
  - [AI协作编程——传统IDE快速切换到AI IDE](../sources/ai-coding-ide.md)
  - [用 Cursor 提高工作效率实战笔记](../sources/improve-work-efficiency-with-cursor-practical-notes.md)
  - [解决 Cursor debugger 模式在 electron 项目中无法使用问题](../sources/cursor-debugger.md)

### 2. 项目规则、上下文与约束设计

- 重点讨论 AI/Agent 无状态、上下文有限，如何通过 `CLAUDE.md`、rules、约束和任务拆解让模型更稳定地理解项目。
- 代表文章：
  - [AI协作编程——如何写好项目规则](../sources/writing-a-good-claude-md.md)
  - [AI赋能存量项目——从函数助手到业务伙伴](../sources/ai-coding-share.md)

### 3. Prompt 方法、角色分工与协作方式

- 不只是写 prompt，而是把 AI 当作不同岗位或角色来组织，强调任务拆解、上下文隔离、角色提示词设计。
- 代表文章：
  - [如何做AI角色分工：我的应用心得](../sources/ai-worker.md)
  - [AI赋能存量项目——从函数助手到业务伙伴](../sources/ai-coding-share.md)
  - [常用开发提示词](../sources/common-programming-prompt-words.md)

### 4. Agent、Skill、MCP 与工具扩展

- 关注 AI 如何调用工具、接入外部上下文、把重复流程封装成 Skill，而不是停留在聊天补全层。
- 代表文章：
  - [Cursor 编写 SKILL：通过 web 搜索并下载电影](../sources/cursor-skill-web-search-download-movie.md)
  - [用 Cursor 提高工作效率实战笔记](../sources/improve-work-efficiency-with-cursor-practical-notes.md)
  - [首次尝试95%都是垃圾：一位工程师使用Claude Code的6周之旅](../sources/translate-use-claude-code.md)

### 5. 稳定性、Review 与质量控制

- 你写的内容反复强调：AI 首次输出往往不可靠，关键在于经验上下文、三次尝试、人工 review、测试与渐进修正。
- 代表文章：
  - [一个提升 AI Coding 稳定性的思路](../sources/agent-coding-stability.md)
  - [首次尝试95%都是垃圾：一位工程师使用Claude Code的6周之旅](../sources/translate-use-claude-code.md)
  - [AI赋能存量项目——从函数助手到业务伙伴](../sources/ai-coding-share.md)

### 6. AI Coding 在具体开发场景中的落地

- 不只是泛谈效率，而是落到前端初始化、图片转页面、Figma 到代码、文档生成、运维脚本、Bug 修复、界面优化、游戏制作等具体场景。
- 代表文章：
  - [用 Cursor 提高工作效率实战笔记](../sources/improve-work-efficiency-with-cursor-practical-notes.md)
  - [使用 AI 优化界面交互](../sources/ai-optimize-ui.md)
  - [面向大模型编程(LOP)在游戏制作流程中的应用畅想](../sources/ai-coding-game.md)

### 7. AI Coding 的长期记忆层与知识沉淀

- 这一块是你的一个明显特色：不把 AI Coding 只看成对话式生成，而是和知识库、跨会话记忆、持久化 wiki 联系起来。
- 代表文章：
  - [使用大模型来维护知识库](../sources/llm-wiki.md)
  - [我们是否需要AI知识库](../sources/AI-knowledge-base.md)
  - [Gemini 在打开新会话时，是如何有记忆的](../sources/gemini-new-session-memory.md)

## 总体判断

如果做一句话概括，你的 AI Coding 文章更偏向：

- **工程实践与工作流设计**
- **上下文治理与规则设计**
- **Agent 化、Skill 化、知识沉淀化**

相对来说，重心不在模型训练原理或底层算法，而在「如何把 AI 真正接入开发工作流，并让它稳定地产出结果」。

## 当前没有明确展开的方向

### Harness

- 当前仓库里没有直接出现 `harness` / `harnness` 这一表述。
- 但有一些内容和 harness 思路接近，主要是：
  - [面向大模型编程(LOP)在游戏制作流程中的应用畅想](../sources/ai-coding-game.md) 中的 **Self-Healing / Iterative Refinement Loop**
  - [AI赋能存量项目——从函数助手到业务伙伴](../sources/ai-coding-share.md) 中的 **工作流/任务拆解**
  - [一个提升 AI Coding 稳定性的思路](../sources/agent-coding-stability.md) 中的 **经验上下文 / 解决问题模式**
  - [Cursor 编写 SKILL：通过 web 搜索并下载电影](../sources/cursor-skill-web-search-download-movie.md) 中的 **Skill 流程封装**
- 因此可以说：你写过一些与 harness 邻近的内容，但还没有专门从 **agent harness / eval harness / execution harness** 这个角度系统展开。

## 相关概念

- [LOP（面向大模型编程）模式（概念）](../concepts/lop-patterns.md)
- [LLM 维护的知识库（概念）](../concepts/llm-maintained-wiki.md)
