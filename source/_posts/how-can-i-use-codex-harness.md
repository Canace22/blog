---
title: Codex Agent Harness 套壳实现自己的 AI 产品
description: 用 Codex 开源 Agent Harness 套壳做自己的 AI 产品：自建产品层与任务编排，编码执行交给 Codex。
categories: AI工程化
tags: AI编程
author: Canace
toc: true
comments: true
date: 2026-08-26 09:17:47
---

最近 Codex 不是开源了 Agent Harness 吗？我们老大就说：那我们都不用继续做自己的 Agent 了，直接套壳他这个就好了！

恩，好像是个好办法！自己辛苦做的可能没别人专业。那么具体要怎么套壳呢？

刚好一直有一个想做没做的想法：用便宜模型聊需求，根据任务难度，自动选模型，委派给 Claude 做计划和方案，再让 Codex 去执行，可以做一个 MVP。

![Codex Agent Harness Product](https://Canace22.github.io/picx-images-hosting/20260826/image.2dpfqp0xz4.webp)

这个 MVP 大概的职能分层是这样的

```md
浏览器 UI 产品层，主要是自定义的 UI 交互
↓
ChatController Agent 入口，通过聊天，与便宜模型交互，确定需求和做任务调度
↓
Orchestrator 排队、锁目录、持久化、取消与审批等，这层是需要我们自己去实现的
↓
AppServerClient JSON-RPC 协议适配
↓
Codex Agent Harness 模型推理、工具调用、读写代码、执行命令，这一层就直接用 Codex 开源的 Agent Harness
↓
文件系统 / Shell / Git 系统层，这部分就是我们的服务器或者是电脑环境了，具体的安全相关的，在上一层已经做了，这里就不需要我们做什么了
```

看，是不是感觉可以省去我们很大一部分功夫，我们只需要专注于产品和任务编排就行了，相比自己实现 agent 真是翻天覆地的变化啊。

上面比较可能有几个点会比较难理解，比如任务怎么做编排、App Server是干嘛的，Codex Agent Harness在这里是怎么用的 blabla，下面稍微展开讲一下吧。

## Agent 控制

Agent 主要由我们的宿主程序控制。总控模型（自定义的便宜模型）主要用来跟我们聊需求，输出的是任务文档，包含提交目标、验收条件、任务难度等。程序根据任务难度，选择调用不同的 Agent。

## 任务编排

任务编排是我们的套壳工程里工作量的最大的部分。

普通消息总控模型可以直接回答，不会创建后台任务。只有它调用 delegate_code_task，才会创建一个工作流（workflow）。

如果总控模型判断某个任务为简单任务，宿主程序会直接创建一个 Codex 任务。复杂任务则先创建 Claude 规划任务，Claude 成功返回一份非空计划以后，系统再创建 Codex 执行任务，并把用户目标、验收条件和 Claude 计划一起写进一份固定的执行提示。

注意这里我没有说拿到计划就丢给 Codex 执行。我们日常用过 Hermes 或者 Openclaw 的可能都用过这个工作流，Claude做完方案就丢给 Codex，这里有个坑，如果 Claude 出现服务异常了呢？我们的工作流不能断在这里，所以要把原本的任务原材料也一起给到 Codex，算是一种灾备吧。

还有一个我们需要考虑的问题，我们用到了不同的 Agent，要并行读写目录的话记得加上目录锁，或者串行工作流。

除了上面的，权限审批也是做在这一层，我们的程序需要去做处理。

程序的工作还是不少的吧！谁说 AI 时代不需要程序员了！

## Codex App Server

App Server 是 Codex 进程对外提供的一套控制协议。

他提供了一整套 Codex 客户端能力：

- 用户认证与会话历史
- 对话线程管理
- 发起、继续、分叉或中断任务
- 命令执行、文件修改、工具调用等事件
- 实时流式输出 Agent 的工作进度
- 用户审批与权限控制

核心数据结构是：

- **Thread**：一段完整对话
- **Turn**：用户的一次请求及 Codex 随后的处理过程
- **Item**：对话、命令、文件修改、工具调用等具体事件

客户端通过类似 JSON-RPC 2.0 的双向协议与它通信，基本流程是：

`建立连接 → initialize → 创建或恢复 Thread → 启动 Turn → 持续接收流式事件 → Turn 完成`

支持 stdio、WebSocket 和 Unix Socket。stdio 是默认方式；WebSocket 目前仍属于实验能力，远程暴露时需要 TLS 和身份验证。

他在我们这个套壳工程里，充当的是一个桥梁，有了他我们就能跟 Codex 进程通信，调用 Codex 的能力。

## Codex Agent Harness

我们知道 harness 就是一个 agent 执行的环境，在我们的这个套壳工程里，扮演的是“真正执行编码任务的智能体运行时”，它可能包括：

- 接收任务 prompt，运行完整的 agent loop。
- 加载工作目录中的 AGENTS.md 等项目指令。
- 调用 Codex 模型进行推理和规划。
- 决定何时读文件、搜索代码、执行命令、修改文件。
- 遇到敏感操作时发出审批请求。
……

总结一下，有了 Codex Agent Harness，我们完全可以不自己另外开发 Agent，实现自己的 AI 产品，套壳的模型可能是这样的：产品层->任务编排层->Codex Agent Harness->系统能力。

参考文档：

[Codex git 地址](https://github.com/openai/codex)

[Codex App Server](https://learn.chatgpt.com/docs/app-server)

[Codex SDK](https://learn.chatgpt.com/docs/codex-sdk)
