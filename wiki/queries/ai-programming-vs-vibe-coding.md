# AI编程和 Vibe Coding 的差异在哪

- **性质** 对话整理成可复用 Q&A
- **日期** 2026-08-20
- **项目上下文** 博客 wiki / AI 工程化协作方式
- **关键词** AI编程、Vibe Coding、代码审查、Accept All、学习反馈、原型与可维护系统

## 问题

很多人把这两个词混着用。打开 Cursor、Claude Code 或 Codex，用中文让模型写代码，就叫 AI 编程，也叫 Vibe Coding。工具是同一套，但做法差得很远。

混了以后会出现两种浪费。如果把周末玩具那套流程拿去改要上线的系统，代码会写得很快，自己却越来越看不懂，出了事也没人接得住。如果每个小实验都按工程审查来走，原型又会慢得没必要。

## 回答

先看人还管不管代码。

在 AI 编程里，模型负责写初稿，人还要定目标、做取舍、看 diff、跑测试，并且把结果接进现有系统。在 Vibe Coding 里，人暂时不管代码长什么样，主要是看界面、说出下一步、跑一下，再把报错贴回去。

Karpathy 在 2025 年 2 月把后一种做法叫 vibe coding。他自己几乎不碰键盘，永远点 Accept All，也不看 diff。报错出现以后，他就原样丢回对话。这样搞下去，代码会慢慢超出自己读得懂的范围。他写明了，这适合周末做完可以扔掉的项目。Simon Willison 后来加了一条更硬的线。如果你已经审过、测过，也看懂了，这件事就该算成用模型帮忙打字。

自己对照时，看这几处就够。

人还读不读关键路径，能不能跟人讲清为什么这样写。如果读得懂，也说得清，就还停在 AI 编程这边。如果点了 Accept All，又不打算事后补看，那就已经在 Vibe 了。

出了 bug 以后，应当先想清楚是需求、架构还是实现坏了，然后再补上下文。如果一直改到错误消失为止，调试就等于交给运气了。

如果质量靠规则、测试、审查和回归来守，代码才可能活过下周。如果只靠能跑和当下感觉，下周改起来就会很痛。

Vibe 适合做原型、demo、一次性玩具，以及先看方向。存量项目、要上线、要维护，以及要把理解留下来的活，就走 AI 编程。

真干活时很少只用一种。可以先用 Vibe 做出一条能跑的竖切，等方向对了，再补测试、拆模块、写规则，并且审一遍关键路径。

## 在当前项目里的落点

仓库里已经有对应材料，所以不必另起概念页。

- [AI 辅助开发](../concepts/ai-assisted-development.md) 管的是 AI 编程这一侧。架构取舍、验证和集成仍由人负责。
- [我的 vibe coding 撞墙了](../sources/vibe-coding-problem.md) 写的是 Vibe 循环。先描述需求，再接收代码，然后运行，出错了再修。人像传菜员。代码写得越来越多，自己的理解却没有跟上。
- [从函数助手到业务伙伴](../sources/ai-coding-share.md) 里，人更像项目经理或架构师，AI 是实习生。这套做法还停在 AI 编程里。
- [一轮对话 Vibe Coding 出可直接上手玩的浏览器 3D 游戏](../sources/word-2-game.md) 更接近 Vibe。它用概念图加一条完整提示词，并要求不要再问设计决策，目的是尽快做出可玩原型。如果只是确认这个 demo 值不值得继续做，这样写是合适的。
- [如何开发一个有手感的赛车游戏 demo](../sources/fable-pixel-game-vibe-coding.md) 则是切回 AI 编程的例子：先定视角和运动规则，分阶段验收，把代码量当负债。对照 Reddit 上那条 4 万行仍开不动车的帖子，差的不是工具，是预期和验收。

判断自己站在哪边，可以看这四件事。

1. 会不会 Accept All，并且还不看 diff。
2. 出了 bug 是先理解原因，还是先把日志丢回去碰运气。
3. 这段代码下周还要改，还要上线吗。
4. 能不能讲清为什么这样设计。

## 验证点

- 能说清差别落在代码还归谁管。只看工具品牌，分不清这两件事。
- 能举出至少一种适合 Vibe 的任务，也能举出一种必须走 AI 编程的任务。
- 看到 Accept All、不看 diff、报错直接贴回时，能认出这是 Vibe。不要把它当成已经在做工程化。
- 原型过了以后，能说出切回 AI 编程时至少要补审查、测试，以及模块或规则。
- 对照 [我的 vibe coding 撞墙了](../sources/vibe-coding-problem.md)，如果感觉没学到东西，先查审查和复盘有没有断掉。

## 总结

AI 编程还把工程师身份留在手里。Vibe Coding 会暂时把这个身份挂起来。玩具可以这样干。如果系统以后还要长期维护，就不能一直挂着。

## 另见

- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [我的 vibe coding 撞墙了，兄弟们](../sources/vibe-coding-problem.md)
- [一轮对话 Vibe Coding 出可直接上手玩的浏览器 3D 游戏](../sources/word-2-game.md)
- [如何开发一个有手感的赛车游戏 demo](../sources/fable-pixel-game-vibe-coding.md)
- [AI 使用边界与提效反噬](../concepts/ai-usage-boundary-and-efficiency-backfire.md)
- [我的文章涵盖 AI Coding 哪几方面](ai-coding-coverage.md)
- [如何把「费米化」用在 AI 提效边界管理里](fermiization-for-ai-boundary.md)
- [从函数助手到业务伙伴](../sources/ai-coding-share.md)

*Query 草稿由 Cursor Agent 按 human-writing 改过正文，2026-08-20；lint 补两篇游戏来源链，2026-09-02。*
