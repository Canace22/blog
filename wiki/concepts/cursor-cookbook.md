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

- 属于 [[AI-assisted development]] 工具链的一员
- 类似 [[Coding Agent]]（Codex/Claude Code/Pi），但属于商业闭源 SDK
- 与 Harness Engineering 理念相关——通过 SDK 将 AI coding agent 嵌入自定义工作流

## Current Evidence In Repo

- [Cursor Cookbook 来源](../sources/cursor-cookbook.md)

## Synthesis

Cursor SDK 的定位是让开发者在自己产品里集成 Cursor agent 能力，而非直接使用 Cursor IDE。核心价值在于：本地+云端统一 API、流式事件监听、状态管理。相比开源 Codex/Claude Code，优势是 Cursor 自身产品体验好；劣势是闭源、需付费 API Key。

---
*Synthesized by assistant, 2026-04-30*
