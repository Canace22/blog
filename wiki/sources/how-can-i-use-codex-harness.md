# 来源：Codex Agent Harness 套壳实现自己的 AI 产品

- **源文件**：[`source/_posts/how-can-i-use-codex-harness.md`](../../source/_posts/how-can-i-use-codex-harness.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-08-26 09:17:47

## 摘要

用 Codex 开源 Agent Harness 做产品套壳：自建浏览器 UI 与任务编排，编码执行交给 Codex。分层是产品层 → ChatController → Orchestrator → AppServerClient → Codex Agent Harness → 文件系统 / Shell / Git。

## 要点

- 不必自研完整 Agent。产品层负责交互，编排层负责排队、目录锁、持久化、取消与审批；真正读改代码、跑命令的是 Codex Harness。
- 总控用便宜模型聊需求，输出含目标、验收条件和难度的任务文档。简单任务直接建 Codex 任务；复杂任务先让 Claude 出计划，再交给 Codex 执行。
- Claude 规划失败时不能把工作流卡死。执行提示里要同时带上原始目标、验收条件和计划，当作灾备。
- 多 Agent 并行读写同一目录时要加目录锁，或改成串行工作流。权限审批也做在编排层。
- Codex App Server 是对外控制协议：Thread / Turn / Item，走类似 JSON-RPC 2.0 的双向通道，支持 stdio、WebSocket 和 Unix Socket。
- Harness 在这里是编码运行时：收 prompt、跑 agent loop、读 `AGENTS.md`、调工具、遇敏感操作发审批。

## 另见

- [Harness Engineering](../concepts/harness-engineering.md)
- [从 Harness 到 Compiled Wiki：个人研究路线图](../reports/harness-to-compiled-wiki-roadmap.md)
- [查询：AI 产品的形态分化与底层逻辑](../queries/ai-product-forms-and-models.md)
- [查询：我的文章涵盖 AI Coding 哪几方面](../queries/ai-coding-coverage.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [原来我一直用错了 Cowork](use-cowork.md)

*维护：Cursor Agent，2026-09-02。*
