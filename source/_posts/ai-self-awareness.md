---
title: 最新版 Codex 工作流的问题
description: AI 不问确认就按推测继续干，理解偏了整条进度就废，该人介入的节点不能省。
categories: AI工程化
tags: AI编程
author: Canace
comments: true
date: 2026-09-07 11:31:01
---
现在最新的 Codex 用 GPT-6 有一个工作流上的更新，就是不会卡在 AI 问问题这个节点，会继续往下走。这看起来是挺好的，终于可以一个任务走到底了，但是这样的工作流真的好吗？

我今天就遇到了一个坑。

我输入了一个意图，然后去干别的了。但是，我里面有错别字，AI 试图问了我，我没一直盯着，他就按照自己的推测继续了。等我回来他已经在我的项目里酷酷干了半天活了，一周的几个点 token 消耗完了。

![qa-1](https://Canace22.github.io/picx-images-hosting/20260907/image.96ahudbnb3.webp)

我纠正了一下他，又去干别的了。等他干完了通知我，我一看人傻了整个项目被重写了，比前一半还要偏了，更悲催的是花了我十几个点的周额度，就写了一堆不知道是什么的东西。

![qa-2](https://Canace22.github.io/picx-images-hosting/20260907/image.6m4nhqb6qi.webp)

用 AI 做决策就是会有这样一些意向不到的问题，稍微理解偏了，后续整个进度就废了，有些需要人介入的地方，还是不能省。