---
title: Electron vs Tauri
description: 对比体积、启动速度、Rust 成本和 WebView 一致性之后，个人工作台从 Electron 切到了 Tauri，安装包从三四百兆降到 20 兆。
categories: Web开发
tags: [前端, 跨端方案]
author: Canace
comments: true
date: 2026-10-16 09:42:17
---
最近写了个个人工作台软件，分享出来给朋友用，朋友给我提了个建议：考虑下把 Electron 换成 Tauri 2 框架，直接调用系统 webview ，安装包估计就只有15M，内存占用小，启动飞快。

听起来是个不错的方案，我就是用 electron 写的，每次启动都有一点等待时间，包还越来越大。

为什么这么大，我大概是知道原因的，electron 捆绑了 chromium 和 node.js，像包小也不太可能。但是为什么很多项目都还在用，不升级到 tauri 呢？

我研究了下他们的差异，tauri 作为后起之秀，在性能和跨端方面是可以甩 electron 几条街的，我没想到的是它竟然还能打 ios 和安卓包。那么为什么没有被很多大团队青睐呢？

很多大团队都是有一定历史包袱的，开发人员用惯了 JavaScript 类语言，一下子切到 rust 可能有点开发不友好，我之前 rust 刚出来学过一下，感觉还是没那么容易从 js 切过去的。

成熟的产品基本都有稳定的用户群体，对于 UI 的渲染一致性是有要求的，这点用原生 webview 的 tauri 要做到需要做不少的工作。

还有就是对原生 api 的支持度了，tauri 目前的支持完整性远没有 electron 好，生态也相对没这么成熟。

不过如果不介意以下三点，想要绝佳的性能和原生体验的话，tauri 还是值得一试的，我就从 electron 切过来了，包的体积一下子从三四百兆降到了 20 兆，打开的速度也是秒开，很惊人。

具体的效果看我之前的 electron 包和现在的 tauri 包效果

https://github.com/Canace22/md-render/releases