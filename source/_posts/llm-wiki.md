---
title: 使用大模型来维护知识库
categories: AI探索
tags: 知识库
description: A collection of Hello World applications from helloworld.org.
author: Canace
comments: true
date: 2026-04-08 09:45:45
---
## 核心思想

我们只负责输入资料，大模型来维护 wiki。这份wiki包含了原始资料索引，与agent的对话记录总结以及输出的报告等产物索引。wiki 是持久化的，无论我们与哪种 agent 工具对话，知识库都是基础的上下文，相当于给大模型植入了记忆。

## 架构

- 原始资料：这部分资料是我们从各种途径搜集来的资料，可能有各种类别的，根据个人的知识库类型选择放什么资料。比如说我的个人博客，里面有一些我过往的技术资料，可以作为原始资料，用阅读的角度来说，这是我们要进行主题阅读的选材。

- wiki：由大模型生成和维护，里面包含资料索引和各种产物，持久化的中间层。

- 规则：一个与大模型交互的规则文件，比如我们用 cc 那就是 CLAUDE.md，用 codex，就是 AGENTS.md，文件名称可以根据情况自行定义。这份规则文件需要告诉大模型 wiki 的结构是怎样的，写作的行为习惯，以及维护 wiki 的工作流是怎样的。

## 怎么用

参考资料：

[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
[LLM Knowledge Bases](https://x.com/karpathy/status/2039805659525644595)

