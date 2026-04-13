---
title: "Thread by @ShenHuang_"
source: "https://x.com/shenhuang_/status/2043469166418735204?s=46"
author:
  - "[[@ShenHuang_]]"
published: 2026-04-13
created: 2026-04-13
description: "上周花了好几亿 token debug 一个 race condition，全失败。 后来受 Karpathy auto-research 启发，只加了一句话：\"把所有假设和证据写到 DEBUG.md。\" AI 列了 5 个假设。其中第 3 个没有任何反对证据。 3 行实验"
tags:
  - "clippings"
---

> 已 ingest：`wiki/sources/shenhuang-hypothesis-debug-x-thread.md`（本剪藏可删）

**Shen Huang** @ShenHuang\_ [2026-04-12](https://x.com/ShenHuang_/status/2043469166418735204)

上周花了好几亿 token debug 一个 race condition，全失败。

后来受 Karpathy auto-research 启发，只加了一句话："把所有假设和证据写到 DEBUG.md。"

AI 列了 5 个假设。其中第 3 个没有任何反对证据。

3 行实验 → 根因确认 → 5 分钟修完。

之前蛮干浪费的 token 比最后修 bug 多了 1000 倍。

血泪教训总结的 4 条 debug 规则：

1\. 改代码之前必须先列假设

2\. 每次实验最多改 5 行

3\. 所有证据写文件 — 防上下文压缩丢掉推理链

4\. 同一方向失败 2 次 → 强制换假设

已经写成 Claude Code / Gemini Cli skill 开源了更新在我的 Github：https://github.com/LichAmnesia/lich-skills/tree/main/skills/debug-hypothesis…

![图像](https://pbs.twimg.com/media/HFvcW_7b0AAYlbo?format=jpg&name=large)