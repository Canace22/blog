# Claude Code 并行代理

## 定义

在 Claude Code 里**同时推进多项 AI 工作**的四种官方路径，以及 worktree、`/batch` 等隔离与批量手段。选型取决于：谁协调、工作人员是否要互聊、是否会编辑同一文件。

## 来源

- [Claude Code 并行运行代理](../sources/claude-code-parallel-agents.md)（官方文档剪藏）
- [Claude Code 常见工作流程](../sources/claude-code-common-workflows.md)（worktree 并行会话、子代理委派）

## 四种并行方式

| 方式 | 协调者 | 典型场景 |
| --- | --- | --- |
| 子代理 | 当前会话里的 Claude | 搜索/读库/日志等「一次性淹没上下文」的辅助活 |
| 代理视图 | 人分派，Claude 在后台跑 | 多独立任务；要一屏看状态、按需介入 |
| 代理团队 | Claude 主导者（实验性，默认关） | 拆项目、分配、队友互相同步 |
| 动态工作流 | 脚本固定编排 | 超大任务或多角度互验（审计、批量迁移） |

## 隔离与边界

- **Worktree**：并行会话/file 冲突的第一道防线；Agent View 分派时自动建 worktree。
- **`/batch` skill**：5–30 个子代理 + worktree + 各开 PR，是子代理模式的规模化打包。
- **不是「并行代理」的**：后台 bash（只跑命令）、分叉子代理（spawn 方式）、Routine（云端定时，非本机并行）。

并行会显著增加 token 消耗。

## 选型 checklist

1. 辅助结果还会细查原文吗？不会 → 倾向子代理；要稍后批量看 → 代理视图。
2. 需要 Claude 在多个 worker 之间分配与同步吗？是 → 代理团队（注意文件分区）。
3. 流程是否可脚本化、且要交叉验证？是 → 动态工作流。
4. 会改同一文件吗？是 → worktree 或按文件集拆分任务。

## 监控入口

- `claude agents` — 代理视图（后台会话）
- `/agents` — 当前会话子代理（≠ `claude agents`）
- `/tasks` — 当前会话后台任务
- `/workflows` — 动态工作流运行

## 与本 Wiki 的关系

- [AI 角色分工：多角色专业化实践](ai-worker.md)：人为多角色隔离；Claude Code 子代理/团队是产品内建的并行角色。
- [Claude Code 常见工作流](claude-code-workflows.md)：单会话内的 plan mode、headless、计划任务与并行互补。
- [Cursor Cookbook](cursor-cookbook.md)：Agent Kanban / Cloud Agents 是 Cursor 侧的类似「多 agent 编排」对照。

## 综合结论

并行不是越多越好：子代理解决**主对话被辅助输出淹没**；代理视图解决**人多任务、晚介入**；团队与工作流解决**协调成本与互验**。文件冲突用 worktree 或任务分区硬性隔开；token 与审阅成本仍由人承担。

---

*维护：Cursor Agent，2026-06-13。*
