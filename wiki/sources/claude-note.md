# 来源：Claude Code 使用笔记

- **源文件**：[`source/_posts/claude-note.md`](../../source/_posts/claude-note.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-07-27 09:53:30

## 摘要

文章记录 Claude Code 长任务中的权限配置取舍。`bypassPermissions` 可以减少中途确认，但会同时放开删除、强制推送和网络请求等高风险操作；更保守的选择是使用 `auto` 模式。

## 要点

- 权限确认会打断长任务，但确认本身也是危险操作的保护层。
- `bypassPermissions` 适合用户已经理解并能承担风险的受控环境。
- 日常使用可优先选择 `auto`，只在真正危险的操作前停下来确认。
- 权限模式改变的是执行边界，不会提高任务理解或代码质量。

## 另见

- [Claude Code 常见工作流](../concepts/claude-code-workflows.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)

*维护：assistant（Codex），2026-08-12。*
