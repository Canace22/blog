---
title: 深入 Claude Code 的 Web 工具：WebFetch 与 WebSearch
description: 拆解 Claude Code 的 WebFetch 与 WebSearch，了解它们的输入结构、执行流程和设计取舍。
categories: AI工程化
tags: AI编程
author: Canace
toc: true
comments: true
date: 2026-08-10 11:24:36
---
Claude Code 有两个内置 Web 工具：

- WebFetch: 接收一个 URL 回答这个 URL 页面相关的问题，返回的是关于这个页面的问题答案和一些获取到的元数据

- WebSearch: 跟搜索引擎一样，接收查询信息，返回一些网址索引和标题摘要


参考文献：

[Claude Code Leak: How WebSearch Sees Your Website](https://wire.wise-relations.com/news/2026-04-01-claude-code-websearch-leak/)

[Inside Claude Code's Web Tools: WebFetch vs WebSearch](https://mikhail.io/2025/10/claude-code-web-tools/)
