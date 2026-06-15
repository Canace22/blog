---
title: 程序员愿意为 Claude 写文档，但不愿为同事写
description: Mark Dominus 把 Claude 交接文档和项目总结审阅后提交进仓库，AI 写、人来审，解决没人愿意写文档的老问题。
categories: AI探索
tags: AI编程
author: Canace
toc: true
comments: true
date: 2026-06-13 10:00:00
---

Higher-Order Perl 这本书的作者 Mark Dominus，在用 Claude 做项目时，会让 Claude 维护一份"交接文档"（handoff doc），方便下一个 Claude 会话快速上手。

他说在论坛上看到一个常见吐槽——程序员愿意精心写 `CLAUDE.md` / `PROJECT.md` 给 AI 看，却不愿给同事写文档。这让他意识到：是不是可以把 Claude 的交接文档直接提交到代码仓库呢？

接着他开始尝试，流程大概是这样：

1. 项目结束后，让 Claude 从头写一份**高质量的项目总结**（不是流水账，是结构化概述）

2. 自己认真审阅、修改后 commit 进 repo

3. 未来有人用 `git grep` 翻代码时就可以有用的信息了

试过之后，他给了觉得下面两中内容是可以直接贴到 commit 描述里的

- 任务结束后，让 Claude 记的笔记

- Claude 写的项目总结

他觉得 Claude 写的总结质量还不错，十秒生成，审阅花不了一小时。

但是有个小坑：Claude 曾照抄了上一份报告末尾他自己加的"Approved-by"段落，他发现时已经审完了，所以好像也算没错……

从这段经验可以知道，AI 能解决"没人愿意写文档"的老问题——让 AI 写，人来审，顺手就提交了，不用专门花时间去梳理项目情况，费时费力去写。

看完他这个，我感觉还挺有价值，于是让 AI 提取了一份 skill，准备自己也试试，除了能让别人了解这个项目的来龙去脉，还能让不同的 AI 对项目的了解有个全貌，也是一种解决 AI 协作问题的好方法。

参考文献：

[Programmers will document for Claude, but not for each other](https://blog.plover.com/2026/03/09/#documentation-wins-2)
