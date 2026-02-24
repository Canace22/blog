---
title: 浏览器渲染原理概述
categories: 'Web开发'
tags: 性能优化
author: Canace
comments: true
toc: true
date: 2025-10-28 09:47:31
---
无论使用框架还是原生 JS，浏览器都遵循自己的规则。理解这些规则，我们可以知道卡顿与流畅的交互之间的区别。

## 一、为什么要在16.67ms内渲染完一帧

JavaScript 在单线程上运行，必须将控制权让给浏览器才能绘制内容。

一帧内发生的事情如下：

0. 脚本执行(Scripting) - JavaScript 引擎运行代码。
1. 样式计算(Style Calculation ) - 浏览器确定适用的 CSS 规则，并计算最终样式，解析层叠、继承和计算值。
2. 重排（Reflow/Layout） - 计算几何属性，如宽度、高度及位置。重排可能波及父子元素，导致高昂成本。
3. 重绘（Repaint/Paint） - 为背景、边框、文本和阴影绘制像素。渐变或阴影等复杂视觉效果会拖慢此步骤。
4. 合成(Composite) - 将已绘制的图层合成并绘制到屏幕上。此步骤远比重排或重绘廉价。

帧预算计算：一秒有 1000 毫秒，除以 60 帧/秒得 1000/60 = 16.67 毫秒/帧。若上述步骤执行时间超过此值，浏览器将丢帧，导致“卡顿”（jank）。

## 二、如何提高渲染性能

现代浏览器可以轻松处理简单页面，但是一旦添加动画或众多元素，性能限制就会显现。了解哪些属性会触发哪些渲染步骤，可以帮助我们提高渲染性能。

- 脚本执行时间（Scripting time ），JavaScript 占用主线程的时间。这个阶段耗时长的话，会延迟重排和重绘。
- 更改 top、left、width、height 或 margin 等属性会触发重排。
- 更改仅影响绘制的属性，如 background-color、box-shadow、border-radius，会触发重绘但不会触发重排。
- transform 或 opacity 通常由 GPU 处理，可以跳过重排和重绘。

## 三、FPS 监控

可以通过观察动画效果，或者使用 DevTools 中的 FPS meter（Cmd+Shift+P → “FPS meter”），运行[Demo](https://github.com/luciodale/koolcodez/blob/main/src/components/articles/SquaresRendering.tsx)，会显示实时帧率。只有当我们将Demo 中的正方形数量最大化时，才会出现明显的差异。

## 结论

流畅的性能并非魔法。它来自于理解浏览器在做什么，并针对它进行性能分析。事实上，对于小型动画，浏览器已经可以渲染得很快了，性能差异可以忽略不计

参考文献：

[Inside a 16.67 Millisecond Frame - Understand how rendering works through a practical example.](https://koolcodez.com/blog/inside-the-frame/)