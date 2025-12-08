---
title: AI 协作编程在现有中大型项目中的落地实践
categories: 'AI探索'
author: Canace
comments: true
date: 2025-12-06 16:12:13
---
最近老大准备在全组推行 AI Coding，号召所有人都用 AI 写代码，尽量不要自己手撸，让大家对 AI 有个基本认知。但是很多同事可能写了十几二十年代码早已习惯原有的编程模式，一下切换到 AI 编辑器可能会遇到以下几个问题：

- **AI 编辑器与自己使用的编辑器差异很大**，无从下手，比如我们组有同事可能用 WebStorm、eclipse或者 Visual Studio 的，这些编辑器可能有很多强大的工具在现代 AI 编辑器中还未迭代出来。
- **在祖传代码中，AI 似乎显得很弱**，据我了解，挺多人在老项目中可能就是写写一些函数这种简单应用，不太敢用 AI 去改业务代码
- **使用 AI 效率太低**，AI 没有我们长期维护项目的人了解业务逻辑，有时候很简单的一个逻辑，我们几分钟明明就能搞定的，让 AI 去解决可能要调一上午甚至一天，出来的代码可能还不尽人意，要么写得过于复杂，难以阅读，要么就是质量太差，后期要各种补坑。

针对以上的一些问题，结合个人一年的 AI 协作编程经验，准备做一个简单的经验分享，希望能让大家对 AI 协作编程有个大致的了解，用起来更得心应手。

## 一、如何从传统 IDE 切换到 AI IDE

### 1. 如何尽快上手

我原本用的 VSCode，切换到 Cursor 属于是无痛切换。市面上的很多 AI IDE 我也下载了几个体验，基本都是类似 VSCode 的。所以这里就大致理一下 VSCode 怎么用能更顺手，VSCode 本身的功能比较有限，得益于**插件**市场，极大的扩展了他的能力。所以要用好 VSCode，得**先看看自己有哪些需求，然后找到符合自己要求的插件**，比如我们可能已经习惯了用 WebStorm 的主题配色，突然换到 Cursor，配色等都不是我们熟悉的，可能会比较影响编码，还有就是用惯了 git 图形界面操作，在 Cursor 找半天，影响到代码提交等，这些都可以用插件解决。

有的朋友可能同时维护多个项目，每天都在不同的项目上救火，同时打开多个Cursor 窗口去运行不同的项目很麻烦，而且 CurSor 本身有性能问题，多开几个可能就卡死了。这里大家还是可以跟用其他IDE 一样，从项目根目录打开多个项目，比如我有一个 Work 目录专门用于存项目代码，里面有好几个项目，我有时候可能同时在处理两个项目的问题，就可以打开 Work 目录，用于使用 AI 进行协作，启动项目则是另外用 git bash 去跑命令，这样就达到了开一个 IDE 同时跑多个项目的目的，命令行中断不怎么吃性能，而且开了之后丢在那里不管就行，我们专注于 Coding。

### 2. 传统编辑器和 AI 编辑器的本质区别

上面讲的外观、操作习惯的不同是二者表面上差异，即使不做任何改变，我们基本都能凑合使用，让我们很难适应的可能是改几行代码，又给我们输出一些提示，代码上蹿下跳的，有点不习惯，而且这种代码补全功能，代码重构能力，我们即使不用 AI IDE ，用编辑器插件也可以，所以为啥要用 AI IDE，他到底强大在哪里呢？

AI IDE 与传统 IDE 有着本质的区别

- 使用传统 IDE 时，编码步骤可能是这样的：重构代码 -> 脑子里构思逻辑 -> 搜索相关文件 -> 一个个打开 -> 逐行修改
- 使用 AI IDE 时，则需要这样：描述意图（“把所有用到了 UserID 的地方改成 UserUUID”） -> AI 检索上下文 -> AI 生成 Diff -> 确认

可见 AI 协作编程需要颠覆我们原来的编程工作流，这种思想上的转变是很必要的，思想是行动的先驱，我们只有转换了基本思维，才能更好的用好 AI IDE 这种工具。

## 二、如何让AI编辑器“理解”你的项目

## 三、梳理开发工作流

## 四、如何保证代码质量

## 


参考文献：

[First attempt will be 95% garbage: A staff engineer's 6-week journey with Claude Code](https://www.sanity.io/blog/first-attempt-will-be-95-garbage)

[Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)

[12-factor-agents](https://github.com/humanlayer/12-factor-agents/tree/main)

[与Cursor结对编程四个月，我顿悟了！](https://mp.weixin.qq.com/s/RyBYqG04wR1Hq2CbfxU2eg)

[AIGC主导项目开发的最佳实践](https://www.yuque.com/jujingyi-mzjzr/bg139y/gc7xcm7r9f5e4g5z?singleDoc#R9619)

[提示工程指南](https://www.promptingguide.ai/zh)

[AI for Coding：从 Vibe Coding 到规范驱动开发](https://mp.weixin.qq.com/s/HaazAEMGqH1GBTmn9qI73g)

