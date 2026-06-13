# 来源：Claude Code 并行运行代理

- **来源类型**：Claude Code 官方文档剪藏（大型代码库文档「并行代理」章节）
- **原文**：[并行运行代理](https://code.claude.com/docs/zh-CN/large-codebases#%E6%B7%BB%E5%8A%A0%E6%8C%89%E7%9B%AE%E5%BD%95-skills)
- **整理日期**：2026-06-13

## 摘要

对比 Claude Code 四种并行化路径：**子代理**（单会话内委派）、**代理视图**（后台多会话一屏监控）、**代理团队**（实验性，主导者协调任务列表与队友消息）、**动态工作流**（脚本批量跑子代理并交叉验证）。另述 worktree 隔离、`/batch` skill、以及与子代理/后台 bash/routine 的边界。

## 四种并行方式

| 方法 | 提供什么 | 何时用 |
| --- | --- | --- |
| 子代理 | 单会话内委派；独立上下文；结果摘要回主对话 | 辅助任务会淹没主对话（搜索、日志、大段文件），且之后不再细查原文 |
| 代理视图 | `claude agents` 一屏分派/监控后台会话 | 多个独立任务；fire-and-forget；需要时再介入 |
| 代理团队 | 多会话 + 共享任务列表 + 代理间消息；主导者协调（默认关闭） | 希望 Claude 拆项目、分配并保持同步 |
| 动态工作流 | 脚本跑许多子代理并互验（研究预览） | 任务过大或需多角度交叉检查（全库审计、大批量迁移、研究互证） |

工作人员本质都是 Claude 会话；不同工具通过 [MCP](https://code.claude.com/docs/zh-CN/mcp) 暴露。

## 辅助机制（非独立「跑代理」方式）

- **Worktrees**：每会话独立 git 检出，避免并行改同一文件；Agent View 自动为分派会话建 worktree；子代理也可各用 worktree。
- **`/batch` skill**：把大改动拆成 5–30 个 worktree 隔离子代理，各开 PR；是子代理 + worktree 打包，不是第五种协调风格。
- **后台 bash**：跑 shell 不阻塞对话，不生成代理。
- **分叉子代理**：继承完整对话上下文，仍是子代理的一种 spawn 方式。
- **Routine**：云端按计划跑，不是本机并行会话。

并行会增加 token 消耗（见 [Costs](https://code.claude.com/docs/zh-CN/costs)）。

## 选型三问

1. **谁协调？** Claude 单对话委派 → 子代理；人交付后检查 → 代理视图；Claude 计划分配 → 代理团队；脚本固定流程 → 动态工作流。
2. **工作人员要互聊吗？** 子代理只回报主对话；代理视图只回报你；代理团队队友可互发消息、共享任务列表。
3. **会碰同一文件吗？** 用 worktree 隔离；代理团队默认不隔离 worktree，需 [分区工作](https://code.claude.com/docs/zh-CN/agent-teams#avoid-file-conflicts) 让各队友负责不同文件集。

## 检查运行中工作

- 后台会话：`claude agents`（代理视图）
- 当前会话子代理：`/agents`（Running / Library；与 `claude agents` 不同）
- 当前会话后台项：`/tasks`
- 动态工作流：`/workflows`
- 桌面：并行会话总览见桌面文档

## 另见

- [Claude Code 并行代理](../concepts/claude-code-parallel-agents.md)
- [Claude Code 常见工作流程（来源）](claude-code-common-workflows.md)
- [Claude Code 常见工作流](../concepts/claude-code-workflows.md)
- [AI 角色分工：多角色专业化实践](../concepts/ai-worker.md)
- [Cursor Cookbook](../concepts/cursor-cookbook.md)（Cursor 侧 Agent Kanban / Cloud Agents 对照）

---

*维护：Cursor Agent，2026-06-13。*
