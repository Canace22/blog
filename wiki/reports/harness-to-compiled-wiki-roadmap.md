# 从 Harness 到 Compiled Wiki：个人研究路线图

## 目的

把你当前两条主线统一成一条可执行研究路径：

- `Harness Engineering`：让 agent 持续完成任务
- `LLM 维护 wiki`：让知识持续沉淀并可复用

目标不是再造概念，而是形成后续可直接写博客、做分享、做实践复盘的结构骨架。

## 一句话结论

`Harness` 解决“agent 怎么干活”，`Memory/Wiki` 解决“agent 记住什么”，`Compiled Wiki` 解决“这些记忆如何可验证、可维护、可追踪”。

## 当前知识库中的三层映射

### 1. 执行层（Harness）

- [Harness Engineering（概念）](../concepts/harness-engineering.md)
- [Pi Coding Agent / pi-mono](../sources/pi-coding-agent.md)

关注点：

- agent loop
- tool use
- planning / verification
- 扩展边界（哪些放核心，哪些外置）

### 2. 记忆层（LLM-maintained wiki）

- [LLM 维护的知识库（概念）](../concepts/llm-maintained-wiki.md)
- [使用大模型来维护知识库](../sources/llm-wiki.md)

关注点：

- source -> wiki 的增量沉淀
- rules 驱动维护工作流
- queries / reports 可复用化

### 3. 维护层（Compiled knowledge）

- [编译式知识库（概念）](../concepts/compiled-knowledge-vault.md)
- [OpenClaw Memory Wiki](../sources/openclaw-memory-wiki.md)

关注点：

- claim / evidence 结构化
- provenance / confidence / contradiction / open questions
- lint / dashboard / digest

## 关键关联关系

### 关系 1：Harness 不等于 Prompt 优化

你的历史内容里，`项目规则`、`Skill`、`经验模式` 已经接近 harness 组件。真正差异在于：是否形成了稳定的执行与验证回路，而不只是一次对话效果更好。

### 关系 2：Wiki 不等于“存文档”

普通 wiki 解决“能找到”，compiled wiki 进一步解决“能不能信、哪里冲突、哪些过时、后续谁来维护”。

### 关系 3：两条线最终会合

当 agent 做研究/开发任务时：

1. Harness 提供执行框架
2. Wiki 提供长期上下文
3. Compiled 机制提供质量闸门

这三者合在一起，才接近一个可持续运行的个人 agent system。

## 研究优先级建议（30 天）

### Phase 1（第 1 周）：建立统一叙事

输出物：

- 一篇概念型博客草稿（可由本报告直接扩写）
- 一张三层关系图（Harness / Wiki / Compiled）

验收标准：

- 可以用 5 分钟讲清楚三层差异与关系
- 每层都有你现有文章或 wiki 页面可回链

### Phase 2（第 2-3 周）：补维护信号

输出物：

- 在高频概念页加入 `open questions` 小节
- 对重点页面试行 `claim vs evidence` 写法
- 建一个轻量 wiki lint 清单（人工或脚本都可）

验收标准：

- 至少 3 个概念页具备“可验证字段”
- 能快速识别“缺来源、待验证、冲突点”

### Phase 3（第 4 周）：形成可复用模板

输出物：

- 一份 `research-report template`（研究问题、证据、结论、风险、后续）
- 一份 `source ingest template`（摘要、关键点、关联概念、待验证）

验收标准：

- 新资料进入 wiki 的平均耗时下降
- 新资料与旧概念页的互链更完整

## 博客选题池（可直接开写）

- 从 Prompt 到 Harness：为什么 AI Coding 的瓶颈在执行环境
- 从 Memory 到 Wiki：为什么跨会话记忆需要结构化沉淀
- 从 Wiki 到 Compiled Wiki：知识库如何从“可读”走向“可维护”
- AGENTS.md + Wiki + Lint：个人开发者的最小 Agent 基础设施

## 下一步可立即执行的动作

1. 挑 1 个高频概念页试行 `claim/evidence/open-questions` 结构
2. 选 1 篇历史报告补 `provenance` 标注，验证可维护性收益
3. 把本报告扩成对外博客初稿（可复用现有 `harness-engineering-blog-draft` 片段）

## 相关页面

- [Harness Engineering 资料整理](harness-engineering-reading-notes.md)
- [博客草稿：我原来写的项目规则、Skill、知识库，其实已经是在做 Harness Engineering](harness-engineering-blog-draft.md)
- [Harness Engineering（概念）](../concepts/harness-engineering.md)
- [LLM 维护的知识库（概念）](../concepts/llm-maintained-wiki.md)
- [编译式知识库（概念）](../concepts/compiled-knowledge-vault.md)
