# 来源：在 CLI 里用 Claude Design 做原型设计

- **源文件**：[`source/_posts/claude-design-cli-prototyping.md`](../../source/_posts/claude-design-cli-prototyping.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-07-09 14:56:25

## 摘要

文章整理了在 Claude Code 中连接 Claude Design、同步设计系统、生成与迭代原型、导出交互页面，以及把结果导入前端项目的完整流程。文中还补充了提示词结构、Playwright 自检和适用边界。

## 要点

- CLI 原型流程由登录、设计系统同步、视觉探索、交互导出和代码导入组成。
- 提示词应明确目标、布局、内容、受众和约束，并分轮调整布局与交互。
- 导入现有仓库时，应复用项目组件和变量，避免生成第二套设计系统。
- 原型导出后，可用 Playwright 检查不同视口下的重叠、溢出和对比度问题。
- Claude Design 更适合视觉与交互探索；鉴权、状态管理和后端集成仍需在真实项目中完成。

## 另见

- [Claude Code 常见工作流](../concepts/claude-code-workflows.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [AI 工程化写作主轴](../reports/ai-engineering-theme-synthesis.md)

*维护：assistant（Codex），2026-08-12。*
