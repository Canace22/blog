# 来源：Vibe Coding 开了一堆会话，验收不过来

- **源文件**：[`source/_posts/ai-review-bottleneck.md`](../../source/_posts/ai-review-bottleneck.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-09-06 15:21:02

## 摘要

这是一篇 Agent 工作流笔记：并行开大量会话时，卡住的是编排和验收，不是模型产出速度。任务还可能互相改同一批文件。做法是按不重叠模块分批、人负责验收；AI 最多帮着调度任务池。把问题和想法发给 GPT-6 Astra 后做出了一个调度工具，圈交叉范围仍比较费 token。

## 要点

- 一堆会话同时做完，人一次验收不过来；做完的内容还得回头翻看，精力跟不上。
- 并行任务容易文件交叉。同目录常见治理是目录加锁、任务串行，或做冲突检测，这块很容易出问题。
- Worktree 能隔离改动，但合回来之后验收堆叠还在。
- 当前 AI 验收多半是按步骤截图、对照描述有没有 bug；产品做到哪才算对，常常要人在看的过程中才临时改意图，模型推不出来。
- 游戏策划到实现的信息会层层衰减；人与人协作已如此，更不能指望 AI 补全未说清的产品意图。
- 可交给 AI 的是调度：人往池子里丢任务，AI 按无交叉模块分批，人改状态、做验收。
- 智能化是辅助生产，不是代替人该走的路和该踩的坑。

## 另见

- [Agent 工作流](../concepts/agent-workflow.md)
- [Claude Code 并行代理](../concepts/claude-code-parallel-agents.md)
- [Codex Agent Harness 套壳实现自己的 AI 产品](how-can-i-use-codex-harness.md)
- [我的 vibe coding 撞墙了，兄弟们](vibe-coding-problem.md)
- [查询：AI编程和 Vibe Coding 的差异在哪](../queries/ai-programming-vs-vibe-coding.md)
- [AI 使用边界与提效反噬](../concepts/ai-usage-boundary-and-efficiency-backfire.md)
- [最新版 Codex 工作流的问题](ai-self-awareness.md)
- [Harness Engineering](../concepts/harness-engineering.md)

*维护：Cursor Agent，2026-09-07。*
