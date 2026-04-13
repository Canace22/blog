# Harness Engineering 资料整理

## 目的

整理你近期收集的 Harness Engineering 相关资料，先沉淀为知识库条目，供后续写博客或扩展成个人笔记。

## 一句话结论

跨资料综合看，**Harness Engineering** 的重点不是“让模型更会说”，而是“为 agent 设计一个可持续工作的软件环境”。它关注：

- 任务如何拆解
- 上下文如何组织
- 工具如何接入
- 结果如何验证
- 失败如何回灌
- 多 agent 如何协作
- 经验如何沉淀为长期记忆

## 资料清单

### 社区讨论

- [V2EX：Harness 决定 Agent 上限：从代码执行到项目迭代](https://www.v2ex.com/t/1202475#reply3)
- [V2EX：探讨 Harness Engineering](https://www.v2ex.com/t/1202411#reply10)

### 教学与实践

- [shareAI-lab / learn-claude-code](https://github.com/shareAI-lab/learn-claude-code)
- [OpenAI：Harness engineering / 在智能体优先的世界中利用 Codex](https://openai.com/zh-Hans-CN/index/harness-engineering/)
- [Anthropic：Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)

## 核心共识

以下判断为跨资料综合：

### 1. 模型不是全部，环境设计才决定能否长期跑通

社区讨论与官方实践都在指向同一个结论：模型能力重要，但在真实开发里，决定 agent 上限的往往是 harness。

这里的 harness 不只是“调一调 prompt”，而是把以下东西组合起来：

- 输入给什么
- 允许做什么
- 出错后看什么
- 完成后怎么验收
- 多轮任务如何分阶段推进

### 2. Harness 是把“临时对话”升级成“可执行工作流”

如果没有 harness，agent 更像一次性的聊天工具；有了 harness，agent 才更像一个能连续推进任务的执行系统。

### 3. 验证能力是 harness 的硬核部分

资料里最值得注意的共同点不是“提示词技巧”，而是**验证机制**：

- 能不能跑测试
- 能不能看日志
- 能不能看浏览器真实表现
- 能不能对照 spec 与验收标准
- 能不能把失败结果再喂回 agent

## 分资料要点

### 1. V2EX 讨论

两条 V2EX 讨论更像中文社区对 harness 话题的入口：

- 一条偏概念辨析，强调它不是单纯 prompt engineering
- 一条偏经验总结，强调 agent 真正落地时，执行框架与反馈回路比单一模型更关键

从搜索摘要看，社区讨论里比较常见的判断是：

- `prompt engineering -> context engineering -> harness engineering` 是逐层扩展关系
- 真正稳定的 agent 依赖一整套“执行外壳”
- 很多人会把 harness 误解成“更复杂的提示词模板”

此外，你给的第二个 V2EX 链接还把 [Learn Claude Code](https://github.com/shareAI-lab/learn-claude-code) 当成入门材料推荐，说明中文社区已经开始把它当作 harness 的实践型教材。

### 2. Learn Claude Code

这个仓库最有价值的地方，是它把 harness 拆成了可学习的系统部件，而不是停留在抽象口号。

它列出的学习骨架包括：

- `agent loop`
- `tools`
- `planning`
- `context management`
- `permissions`
- `memory`
- `prompt construction`
- `tasks`
- `teams`
- `MCP`
- `hooks`
- `worktrees`

这份结构的意义在于：它让 harness 不再是模糊概念，而是一张“agent 系统构成图”。

一个很好记的总结是：

- **模型负责思考**
- **Harness 负责提供工作环境**

### 3. OpenAI

OpenAI 这篇材料虽然标题和页面入口写着 harness engineering，但正文更像是在讲：**在 agent-first 世界里，如何把仓库、文档和观测能力重新组织成 agent 能长期工作的系统。**

其中几个高价值点：

- 代码仓库应成为 agent 的 **system of record**
- `AGENTS.md` 要短，只当地图，不要把所有知识都堆进去
- 真正稳定的信息应放进结构化 `docs/`
- agent 需要可读的反馈回路：UI、日志、指标、追踪
- 知识库不是写完就算，要配合 lint / CI / 结构化整理一起维护

这条路线很适合已有工程团队，因为它不是重新发明 agent，而是**重构现有工程环境，让 agent 更容易成功。**

### 4. Anthropic

Anthropic 这篇文章提供了更“开发流程化”的 harness 设计视角。

其核心是一个三 agent 结构：

- `planner`：把短需求扩成完整需求文档
- `generator`：围绕 feature / sprint 实现
- `evaluator`：做 QA、运行浏览器、比对验收标准

里面最值得记的不是多 agent 本身，而是两个细节：

- `generator` 与 `evaluator` 先协商 sprint contract，再开始实现
- `evaluator` 不是读代码点评，而是去跑真实应用，例如通过 Playwright 做浏览器级验证

这说明 Anthropic 把 harness 的重点放在：

- 计划显式化
- 产出契约化
- 验证自动化
- 反馈闭环化

另外，这篇文章还提醒了一个很重要的工程判断：

> harness 中每个组件都默认模型自己还做不到这件事。

因此，harness 不是越复杂越好，而是应该随着模型能力提升不断删减和重构。

## 对你现有知识库的启发

Harness Engineering 和你已经写过的几条线高度相邻：

### 1. 项目规则

- [AI协作编程——如何写好项目规则](../sources/writing-a-good-claude-md.md)

你之前强调的 `What / Why / How`、规则要短、规则渐进，其实已经非常接近 harness 中的“上下文治理层”。

### 2. 工作流拆解

- [AI赋能存量项目——从函数助手到业务伙伴](../sources/ai-coding-share.md)

你写过“任务拆解”“约束”“Review”“自动化测试”，这些都不是单次 prompt 技巧，而是典型 harness 组件。

### 3. 稳定性与经验库

- [一个提升 AI Coding 稳定性的思路](../sources/agent-coding-stability.md)

你提的“经验上下文”“问题解决模式”“Skill 雏形”，可以视为把个人经验抽象为 harness 的一部分。

### 4. 长期记忆层

- [使用大模型来维护知识库](../sources/llm-wiki.md)

wiki、规则文件、可持续更新的知识层，本质上也是 harness 的外部记忆和系统记录层。

## 目前可提炼出的写作题目

如果你后面准备写博客，这批资料比较适合发展成下面几种文章：

### 1. 概念辨析型

- `Harness Engineering 是什么，它和 Prompt / Context Engineering 有什么区别？`

### 2. 方法论迁移型

- `我原来写的项目规则、Skill、经验库，其实已经是在做 Harness Engineering`

### 3. 工程实践型

- `如何给 AI Coding 搭一个最小可用 Harness：规则、文档、日志、测试、浏览器验证`

### 4. 个人知识库结合型

- `为什么说 AGENTS.md + wiki + docs，本质上也是一种 Harness`

## 暂存问题

后续你写正式笔记时，可以优先回答这些问题：

1. 你的“最小 Harness”包含哪些组件？
2. 哪些东西必须进 `AGENTS.md`，哪些应该进入 `docs/` 或 wiki？
3. 你更认同 OpenAI 的“仓库即系统记录”路线，还是 Anthropic 的“planner / generator / evaluator”路线？
4. 你已有的 Skill、经验库、wiki，哪些已经可以算 harness 组件？
5. 对个人开发者而言，harness 的投入产出比边界在哪里？

## 相关页面

- [Harness Engineering](../concepts/harness-engineering.md)
- [LLM 维护的知识库](../concepts/llm-maintained-wiki.md)
- [LOP（面向大模型编程）模式](../concepts/lop-patterns.md)
