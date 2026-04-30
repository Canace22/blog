# Cursor Cookbook

## 来源
- `wiki/sources/cursor-cookbook.md`（转发自 Telegram 频道「嘴码专项工作频道」，2026-04-30）

## 核心要点

Cursor Cookbook 是 Cursor 官方维护的 SDK 示例仓库，提供 TypeScript API 用于在自建 App / 脚本 / 工作流中调用 Cursor coding agent。

## 主要内容

| 示例 | 说明 |
|------|------|
| Quickstart | 最小 Node.js 示例，创建本地 agent、发送 prompt、流式响应 |
| App Builder | Web 原型工具，在沙盒云环境快速启动 agent 搭建项目 |
| Agent Kanban | 看板管理 Cursor Cloud Agents，按状态/仓库分组，预览 artifacts，创建新 agent |
| Coding Agent CLI | 终端命令行接口，从 terminal 直接召唤 Cursor agent |

## 技术特性

- **TypeScript SDK**：支持本地和云端 runtime
- **流式事件**：实时监听 agent 执行进度
- **状态管理**：prompt、model、取消、artifacts、对话状态均可编程控制
- **需 API Key**：从 [cursor.com/dashboard/integrations](https://cursor.com/dashboard/integrations) 获取

## 与其他概念关联

- 属于 [[AI-assisted development]] 工具链的一员
- 类似 [[Coding Agent]]（Codex/Claude Code/Pi），但属于商业闭源 SDK
- 与 Harness Engineering 理念相关——通过 SDK 将 AI coding agent 嵌入自定义工作流
