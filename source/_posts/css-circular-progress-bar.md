---
title: CSS 实现圆环进度条
description: '圆环进度条通过设置边框和旋转动画实现，关键在控制显示区域和动画角度。'
categories: Web开发
tags: [前端, CSS与可视化]
comments: true
date: 2021-06-21 10:45:29
---

圆环进度条是我们工作中经常会碰到的一个需求，首先我们来看看要实现一个圆环我们会怎么做？

```html
<div class="wrapper">
  <div class="circle"></div>
</div>
```

```css
.circle {
  width: 160px;
  height: 160px;
  border: 20px solid green;
  border-radius: 50%;
}
```

要实现一个半圆环我们会怎么做？

```css
.wrapper {
  position: absolute;
  width: 100px;
  height: 200px;
  overflow: hidden;
}
.circle {
  position: absolute;
  top: 0;
  width: 160px;
  height: 160px;
  border: 20px solid green;
  border-radius: 50%;
}
```

要实现这个半圆的进度动画，我们可以先把半圆隐藏起来，一点点出现。要把半圆隐藏起来我们可以把它旋转到容器的外面，一点点出现我们可以把该半圆慢慢的旋转回来

```css
.circle {
  position: absolute;
  top: 0;
  width: 160px;
  height: 160px;
  border: 20px solid transparent;
  border-radius: 50%;
  animation: rotate-a 3s linear infinite;
}
.left-circle {
  border-bottom: 20px solid green;
  border-left: 20px solid green;
  left: 0;
}
@keyframes rotate-a {
  0% {
    transform: rotate(-135deg);
  }
  50%,
  100% {
    transform: rotate(45deg);
  }
}
```

由于我们的容器宽度只有 100，旋转 -135 度之后，这个半圆就看不到了，从动画 50% 开始，我们把半圆过度到旋转 45 度角，也就是回到正立的状态。这是一个半圆进度动画的实现，右半边进度动画也是一样的实现思路，只不过是反过来而已。最终的 demo 如下

```html
<div class="circle-progress">
  <div class="wrapper right">
    <div class="circle right-circle"></div>
  </div>
  <div class="wrapper left">
    <div class="circle left-circle"></div>
  </div>
</div>
```

```css
.circle-progress {
  position: relative;
  width: 199px;
  height: 200px;
}
.circle-progress .wrapper {
  width: 100px;
  height: 200px;
  position: absolute;
  top: 0;
  overflow: hidden;
}
.circle-progress .right {
  right: 0;
}
.circle-progress .left {
  left: 0;
}
.circle-progress .circle {
  width: 160px;
  height: 160px;
  border: 20px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: 0;
  transform: rotate(-135deg);
}
.circle-progress .right-circle {
  border-top: 20px solid green;
  border-right: 20px solid green;
  right: 0;
  animation: circle_right 5s linear infinite;
}
.circle-progress .left-circle {
  border-bottom: 20px solid green;
  border-left: 20px solid green;
  left: 0;
  animation: circle_left 5s linear infinite;
}
@keyframes circle_right {
  0% {
    transform: rotate(-135deg);
  }
  50%,
  100% {
    transform: rotate(45deg);
  }
}
@keyframes circle_left {
  0%,
  50% {
    transform: rotate(-135deg);
  }
  100% {
    transform: rotate(45deg);
  }
}
```
