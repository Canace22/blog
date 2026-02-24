---
title: element-plus 缩放问题解决
description: '使用 zoom 缩放导致 element-plus 组件失效，改用 transform 并调整坐标计算可解决。'
categories: Web开发
tags: [前端, 框架与库]
author: Canace
comments: true
date: 2024-03-19 16:02:09
---

由于懒，一个项目选择了使用缩放的方式适配小屏幕，使用的 UI 框架是 element-plus，发现了以下一些缩放后引发的问题

## table 组件 resizable 属性失效

使用 zoom 属性对 body 进行缩放，发现 table 组件 resizable 属性失效了，也就是表格拖动宽度无效，改成使用 transform 可以解决这个问题。

```css
body {
  transform: scale(0.8);
  transform-origin: 0 0;
  width: calc(100% / 0.8) !important;
  height: calc(100% / 0.8);
}
```

## 下拉框错位

由于上面对 body 进行了缩放，坐标肯定不能按照 100% 去算了，下拉框相关的组件需要设置 `:teleported="false"` 不要挂载到 body 下面。
