---
title: CSS2 下块级元素垂直水平居中
description: '绝对定位配合 margin auto 可实现 css2 块级元素垂直水平居中'
comments: true
date: 2019-03-16 16:41:28
categories: Web开发
tags: [前端, CSS与可视化]
---

前几天有人问我给定一个这样的结构：div => div，如何让里面的元素水平垂直居中？给出 css2 代码。这对于一直用 css3 布局方式的我来说，一时还有点蒙蔽，只知道左右居中一般用 margin：0 auto，至于垂直居中，还真没用 css2 实现过。于是动手实践，发现以下的方式而已完美达到想要的效果。

<!--more-->

```css
.box {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 500px;
  height: 500px;
  background: orange;
}
```

这个方法的一个要点是运用 position：absolute，使里面的块级元素始终相对于父元素定位，由水平居中 margin: 0 auto，可以类推上下左右都居中的话，应该 margin 都为 auto 可以达到想要的效果，至于四个方向大的定位都为 0，是为了防止位置偏移。
