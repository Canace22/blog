# Harness Engineering

## 定义

**Harness Engineering** 不是单纯优化 prompt，而是为 agent 设计一整套可工作的运行环境，让模型能在真实任务里持续推进、验证、纠错和交付。

一个很实用的表述来自 `learn-claude-code` 教学仓库：**模型负责思考，harness 负责给模型提供工作环境。**

## 和 Prompt / Context Engineering 的区别

以下是基于你提供资料的综合归纳：

| 层次 | 更关注什么 |
| --- | --- |
| Prompt Engineering | 单条指令怎么写 |
| Context Engineering | 给模型提供哪些信息、记忆、文档与工具描述 |
| Harness Engineering | 如何设计执行环境、约束、反馈回路、验证机制与协作结构 |

换句话说，Harness 更偏**系统设计**，而不是一句 prompt 的措辞优化。

## 常见组成

根据 [Learn Claude Code](https://github.com/shareAI-lab/learn-claude-code) 与 OpenAI / Anthropic 的实践，可将 harness 常见组成概括为：

- `Agent Loop`：模型决策、工具执行、结果回灌的循环
- `Tools`：读写文件、跑命令、搜索、浏览器、外部服务
- `Planning`：把目标拆成阶段、sprint、子任务或执行计划
- `Context Management`：控制上下文膨胀、压缩历史、按需披露
- `Permissions`：危险操作的安全闸门
- `Memory`：跨会话保留真正值得持久化的信息
- `Prompt Construction`：把系统规则、工具说明、实时状态组装成输入
- `Verification / Evaluation`：测试、QA、代码审查、UI 验证、日志检查
- `Task / Team / Worktree / MCP`：把单 agent 升级成多 agent、多能力、多执行车道的平台

## 两类典型思路

### 1. OpenAI / Codex 路线

更强调把**代码仓库本身做成 agent 可读的记录系统**：

- 用简短的 `AGENTS.md` 当地图，而不是大而全手册
- 把真实知识沉淀到结构化 `docs/` 中
- 让 agent 能读 UI、日志、指标、追踪，并在反馈回路中反复修复
- 用 lint / CI / 文档整理机制维护知识库新鲜度

这一路线更像：**把环境搭好，让 agent 在里面持续工作。**

### 2. Anthropic 路线

更强调**多 agent 分工 + 可验证迭代**：

- Planner 负责把简短需求扩成完整 spec
- Generator 负责按 feature / sprint 实现
- Evaluator 负责用真实运行环境做 QA 与验收
- Generator 与 Evaluator 先协商 sprint contract，再实现与验证

这一路线更像：**把软件开发流程显式建模给 agent。**

### 3. Pi / OpenClaw 路线

以 [Pi Coding Agent / pi-mono](../sources/pi-coding-agent.md) 为代表的路线，更强调**最小核心 + 强扩展面**：

- 核心只保留基本 coding harness
- 通过 extensions / skills / prompt templates / packages 扩展能力
- 明确把 sub-agents、plan mode、permission flow 等留给外层实现

这一路线的价值在于：它把 harness 看成一个**可产品化、可二次组装的基座**。而像 [OpenClaw Memory Wiki](../sources/openclaw-memory-wiki.md) 这样的上层插件，则展示了记忆层、知识层可以如何在基座之上继续生长。

## 关键原则

### 1. 给 agent 地图，不要给一本厚手册

OpenAI 的一个重要经验是：上下文是稀缺资源，超大的规则文件会挤掉真正重要的任务与代码信息。更好的做法是让 `AGENTS.md` 保持短小，把深层知识放进结构化文档中。

### 2. Harness 的核心不是“多加规则”，而是“多加可验证性”

Anthropic 的文章里，真正拉开差距的不是更华丽的 prompt，而是：

- 计划
- 契约
- 真实 UI / API / 数据库检查
- 失败后回灌给生成者

也就是把“能不能验收”前置成系统能力。

### 3. Harness 不是越复杂越好

Anthropic 明确提到：harness 中每个组件都隐含一个假设，即“模型自己还做不到这个”。随着模型变强，这些组件需要被持续质疑、删减与重构。

## 与你现有主题的关系

这个概念和你博客里已有内容是连着的：

- [AI协作编程——如何写好项目规则](../sources/writing-a-good-claude-md.md)
- [AI赋能存量项目——从函数助手到业务伙伴](../sources/ai-coding-share.md)
- [一个提升 AI Coding 稳定性的思路](../sources/agent-coding-stability.md)
- [使用大模型来维护知识库](../sources/llm-wiki.md)
- [Pi Coding Agent / pi-mono](../sources/pi-coding-agent.md)
- [OpenClaw Memory Wiki](../sources/openclaw-memory-wiki.md)
- [假设驱动 AI 调试](hypothesis-driven-ai-debugging.md)（`DEBUG.md` / `program.md` 等外化假设与证据）

这些内容虽然当时未直接使用 “Harness Engineering” 这个词，但已经涉及：

- 项目规则
- 经验上下文
- 工作流拆解
- 技能封装
- 长期记忆层

它们都可以看作 harness 的邻近层，甚至已经是局部实现。

## 相关

- [假设驱动 AI 调试](hypothesis-driven-ai-debugging.md)
- [LLM 维护的知识库](llm-maintained-wiki.md)
- [编译式知识库](compiled-knowledge-vault.md)
- [LOP（面向大模型编程）模式](lop-patterns.md)
- [Harness Engineering 资料整理（报告）](../reports/harness-engineering-reading-notes.md)

## 来源

- [V2EX：探讨 Harness Engineering](https://www.v2ex.com/t/1202411#reply10)
- [V2EX：Harness 决定 Agent 上限：从代码执行到项目迭代](https://www.v2ex.com/t/1202475#reply3)
- [Learn Claude Code](https://github.com/shareAI-lab/learn-claude-code)
- [OpenAI：Harness engineering / 在智能体优先的世界中利用 Codex](https://openai.com/zh-Hans-CN/index/harness-engineering/)
- [Anthropic：Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)
