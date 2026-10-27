---
title: 一个保持 AI 生成 2D 素材一致的技巧
description: 先在游戏截图上画出新素材再抠出来，比只写文字或堆参考图更容易保住画风。
categories: AI工程化
tags: AI编程
author: Canace
comments: true
toc: true
date: 2026-10-22 16:18:00
---

今天在 Reddit 上看到一位博主分享的方法，我顺着试了试。先看实验效果：能提出风格统一的道具，后面还有实装进游戏的画面。

![从同一张城镇场景里拆出的水井、木桶、木箱、手推车、告示牌和灯笼](/images/consistent-2d-props.jpg)

## 怎么让 2D 素材画风一致

他实践一段时间后发现，只用文字生成素材，一致性做不到。就算带上参考图，也不保证成功。他觉得最有效的办法，是把游戏截图（同一场景的不同部分）交给 GPT，让它在截图上画出新素材，再把素材单独抠出来。抠出来之后，就可以放到任何想放的位置。

隔离素材时，他用的提示词是：

> Take the chicken coop with its fenced run and chickens from this game screenshot. Show it alone, exactly as it is drawn in this image - same art style, colours, ink lines, shading, angle and proportions - with nothing else from the scene, centered on a flat solid magenta background.

抠完之后，颜色往往还要对一下。他让模型写了个脚本，调饱和度和亮度，让新素材和游戏里已有的部分对上。

另外几条也实用：

- 记得要求品种多样，不然你种出来的胡萝卜都会长得一样。
- 问一问某些资产的生命周期，比如从完整到用过、坏掉。
- 尽量描述这个东西实际怎么用、具体长什么样，而不只报一个名字。你如果只说「发货箱」，模型就会画它能画出来的最普通的箱子。

说白了，就是先有场景，再从场景里反推素材。

我之前试过，3D 也能套这套思路。比如先让混元出一整个场景并导出，再拆成资源表，按表去生成 3D 资源。

评论区有人问：为什么不直接给一套参考图？他的做法是准备一个参考图文件，里面放各种风格的图，再配一份素材清单。清单上写已经试过的创作提示、尺寸要求，以及每件东西的描述。

博主的回答挺有意思。他说这当然一直是标准做法，但他最近觉得这些模型看东西的方式和人不一样，参考资料堆太多，有时反而把生成带偏。他承认对方的方法有效，自己只是最近在试这条新流程，目前效果还不错。

我的理解是：详细参考图加清单，更适合已经有标准流程的工业化生产。自己业余玩玩、还没有标准流程的时候，可以试试这种先画进截图、再抠出来的办法。当然也有人直接买资源包，那是另一条路。

实装之后，画面里的背景、NPC 和道具，都是从上面那张图里拆出来的。

![实装进游戏后的城镇广场，水井、木桶、推车和告示牌都在场景里](/images/consistent-2d-ingame.jpg)

## 2D 精灵图的行走和跑步

评论区还有一个做行走、跑步动画的办法，我试了一下，能用。

精灵图（sprite）要循环，就先做出这一圈里的 4 到 8 个姿势，再用视频模型在这些姿势之间做动画，然后把想要的帧剪出来。我只是让 AI 生成了八个姿势，看着已经有模有样。

![走路动画 demo](/images/walk-runtime.gif)

另外看到两个站点，需要的可以自己去看：

- 用 AI 做动画：[ludo.ai](https://ludo.ai/)
- AI 音乐生成：[Mureka](https://www.mureka.ai/)

## 写在最后

最近网上对 AI 做游戏的火气挺大，讨论也很多。我分享的是 AI 辅助游戏开发的一些方法和思路。就我自己的看法，AI 现在还没法完全代替人，做出有意思、能让人持续玩下去的游戏。好游戏不只是把玩法复刻出来，后面还有很多细节和底子。

做游戏本身也是在堆资源。全交给 AI 并不现实，也很烧钱。看到一些独立开发者说，AI 做的游戏回不了本，还不如去卖 AI 游戏开发的课，就很扎心。

来源：[The AI Trick for Consistent 2D Game Assets](https://www.reddit.com/r/aigamedev/comments/1xavthu/the_ai_trick_for_consistent_2d_game_assets/)
