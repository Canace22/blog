# 来源：关掉 Cursor 提交里自动加上的签名

- **源文件**：[`source/_posts/disable-cursor-commit-attribution.md`](../../source/_posts/disable-cursor-commit-attribution.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-10-15

## 摘要

Agent 提交会在说明末尾追加 `Co-authored-by: Cursor <cursoragent@cursor.com>` 或 `Made-with: Cursor`。这是 Cursor 在模型写完提交说明之后由工具追加的，项目规则拦不住。编辑器、CLI、云端 Agent 各有一份开关。

## 要点

- 编辑器：Cursor Settings → Git & PRs → Attribution，关掉 Commit Attribution 和 PR Attribution。3.11 之前在 Agents → Attribution。官方说明见 [Cursor Git 帮助](https://cursor.com/help/integrations/git)。
- CLI 不读编辑器开关。在 `~/.cursor/cli-config.json` 设置 `attribution.attributeCommitsToAgent` 与 `attribution.attributePRsToAgent` 为 `false`。没有该字段时默认开启。
- Cloud Agent 在服务器上提交，本地设置和 `commit-msg` hook 都碰不到。截至 2026-10，公开说明里没有单独关掉云端署名的选项，合并时从说明里删掉那一行。
- 企业账号可由 Admin Dashboard 对全员强制开或关。
- 已经写入且未推送的最新提交，可用 `git commit-tree` 换说明并 `git reset --soft` 指到新对象。本地仓库可用 `commit-msg` hook 删掉这两行 trailer，因为注入发生在 hook 之前。

## 另见

- [Agent 工作流](../concepts/agent-workflow.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [Cursor 的网络协议，为什么选 HTTP/1.1 才能用 Claude](http-claude.md)

---

*维护：Cursor Agent，2026-10-15。修订：Cursor Agent，2026-10-15。*
