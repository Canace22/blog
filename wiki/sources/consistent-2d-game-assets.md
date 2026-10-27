# 来源：一个保持 AI 生成 2D 素材一致的技巧

- **源文件**：[`source/_posts/consistent-2d-game-assets.md`](../../source/_posts/consistent-2d-game-assets.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-10-22 16:18:00
- 原文：[The AI Trick for Consistent 2D Game Assets](https://www.reddit.com/r/aigamedev/comments/1xavthu/the_ai_trick_for_consistent_2d_game_assets/)（r/aigamedev）

## 摘要

纯文字或堆参考图很难让 AI 画出风格一致的 2D 游戏素材。更稳的做法是把新素材画进已有游戏截图，再按原画风抠到纯色背景上。作者用同一张城镇场景拆出水井、木桶、木箱等道具，并实装进游戏；背景、NPC 和道具都来自这张图。行走动画可以先出 4–8 个关键姿势，用视频模型补间后抽帧。

## 要点

1. 给模型同一场景的不同局部截图，让它在截图上画新东西，再要求「只保留该物体、画风和比例不变、品红纯色背景居中」。
2. 抠出后用脚本对齐饱和度和亮度；提示里要写品种差异、生命周期，以及物体的用法和外形，不要只给名字。
3. 详细参考图加素材清单仍是工业化标准流程；参考太多有时会把生成带偏。没有标准流程时，截图法更适合试。
4. 3D 可以先出整场景，再拆成资源表逐件生成。
5. 精灵图（sprite）行走循环：4–8 个姿势 → 视频模型补间 → 剪出需要的帧。文中举例站点为 [ludo.ai](https://ludo.ai/) 与 [Mureka](https://www.mureka.ai/)。
6. 作者认为 AI 辅助做素材和原型，仍代替不了能让人玩下去的游戏；全交给模型既不现实，也很烧钱。

## 另见

- [一致的 AI 2D 游戏素材](../concepts/consistent-2d-game-assets.md)
- [一轮对话 Vibe Coding 出可直接上手玩的浏览器 3D 游戏](word-2-game.md)
- [如何开发一个有手感的赛车游戏 demo](fable-pixel-game-vibe-coding.md)
- [面向大模型编程（LOP）在游戏制作流程中的应用畅想](ai-coding-game.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)

*修订：Cursor Agent，2026-10-22。*
