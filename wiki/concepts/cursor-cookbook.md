# Cursor Cookbook

## Definition

Cursor 官方维护的 SDK 示例仓库，提供 TypeScript API 在自建应用 / 脚本 / 工作流中调用 Cursor coding agent。

## Source-Backed Themes

- **Quickstart**：最小 Node.js 示例，创建本地 agent、发送 prompt、流式响应
- **App Builder**：Web 原型工具，在沙盒云环境快速启动 agent 搭建项目
- **Agent Kanban**：看板管理 Cursor Cloud Agents，按状态/仓库分组，预览 artifacts，创建新 agent
- **Coding Agent CLI**：终端命令行接口，从 terminal 直接召唤 Cursor agent
- **需 API Key**：从 [cursor.com/dashboard/integrations](https://cursor.com/dashboard/integrations) 获取

## Relationship To This Wiki

- 属于 [AI 辅助开发](../concepts/ai-assisted-development.md) 工具链的一员
- 与开源 **Coding Agent**（Codex / Claude Code / Pi 等，见 [OpenClaw Agent 基座](../sources/openclaw-agent-pi-mono.md)）类似，但 Cursor SDK 为商业闭源、需 API Key
- 与 [Harness Engineering](../concepts/harness-engineering.md) 相关——通过 SDK 将 AI coding agent 嵌入自定义工作流

## 另见

- [Cursor 使用 Playwright MCP](../sources/cursor-playwright-mcp.md)
- [一个提升 AI Coding 稳定性的思路](../sources/agent-coding-stability.md)
- [Claude Code 并行代理](claude-code-parallel-agents.md)（Agent Kanban / 多会话编排的对照）
- [Claude Code 常见工作流](claude-code-workflows.md)

## Current Evidence In Repo

- [Cursor Cookbook 来源](../sources/cursor-cookbook.md)

## Synthesis

Cursor SDK 的定位是让开发者在自己产品里集成 Cursor agent 能力，而非直接使用 Cursor IDE。核心价值在于：本地+云端统一 API、流式事件监听、状态管理。相比开源 Codex/Claude Code，优势是 Cursor 自身产品体验好；劣势是闭源、需付费 API Key。

---

*维护：Cursor Agent，2026-06-03。*
