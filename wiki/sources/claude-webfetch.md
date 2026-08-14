# 来源：深入 Claude Code 的 Web 工具：WebFetch 与 WebSearch

- **源文件**：[`source/_posts/claude-webfetch.md`](../../source/_posts/claude-webfetch.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-08-10 11:24:36

## 摘要

简要区分 Claude Code 的两个内置 Web 工具：WebFetch 面向指定 URL 获取页面内容并回答相关问题，WebSearch 面向查询词返回搜索结果索引和标题摘要。

## 要点

- WebFetch 的输入核心是 URL 和围绕该页面的问题，输出包含答案及抓取到的页面元数据。
- WebSearch 的输入核心是查询信息，输出类似搜索引擎的网页索引、网址和标题摘要。
- 两者分别对应「读取已知页面」与「发现候选页面」两个阶段，可以先搜索再抓取。
- 原文目前是简要笔记，具体执行流程与设计取舍仍需结合引用资料继续补充和核验。

## 另见

- [Claude Code 常见工作流](../concepts/claude-code-workflows.md)
- [Claude Code 常见工作流程](../sources/claude-code-common-workflows.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)

*维护：Cursor Agent，2026-08-12。*
