---
title: CSS 常用布局及解决方案
comments: true
date: 2021-06-05 10:45:33
categories: Web开发
toc: true
tags: [前端, CSS与可视化]
---

CSS 常用布局包括元素的水平、垂直居中，单栏布局、三栏布局等，本文分析多种情况下的布局方案。

<!--more-->

## 一、居中

### 1. 水平居中

**(1) 基于盒模型的实现**

- 子元素为行内元素

```html
<div class="parent parent-box">
  <span class="child">子元素为行内元素</span>
</div>
```

```css
.parent-box {
  width: 200px;
  height: 100px;
  border: 1px solid purple;
}
/* 行内元素直接设置文本居中 */
.parent {
  text-align: center;
}
```

- 子元素为定宽块状元素

```html
<div class="parent-box">
  <div class="child child-box">定宽子元素</div>
</div>
```

```css
.parent-box {
  width: 200px;
  height: 100px;
  border: 1px solid purple;
}
.child-box {
  width: 100px;
  height: 20px;
}
/* 设置 margin 值，平分剩余空间 */
.child {
  margin: auto;
}
```

- 子元素为不定宽块状元素

```html
<div class="parent parent-box">
  <div class="child">子元素为不定宽块状元素</div>
</div>
```

```css
.parent-box {
  width: 200px;
  height: 100px;
  border: 1px solid purple;
}
/* 子元素设置为 inline，父元素设置文本居中 */
.parent {
  text-align: center;
}
.child {
  display: inline;
}
```

**(2) 基于 flex 的实现**

```html
<div class="parent parent-box">
  <div class="child">flex 布局</div>
</div>
```

```css
.parent-box {
  width: 200px;
  height: 100px;
  border: 1px solid purple;
}
/* 使用弹性盒子，水平轴设置为居中 */
.parent {
  display: flex;
  justify-content: center;
}
```

### 2. 垂直居中

**(1) 基于盒模型的实现**

- 父元素一定，子元素为单行内联文本

```html
<div class="parent parent-box">
  <div class="child">父元素一定，子元素为单行内联文本</div>
</div>
```

```css
.parent-box {
  width: 260px;
  border: 1px solid purple;
}
/* 设置一个任意行高 */
.parent {
  line-height: 100px;
}
```

- 父元素一定，子元素为多行内联文本

```html
<div class="parent parent-box">
  <div class="child">
    父元素一定，子元素为多行内联文本父元素一定，子元素为多行内联文本父元素一定，子元素为多行内联文本父元素一定，子元素为多行内联文本
  </div>
</div>
```

```css
.parent-box {
  width: 300px;
  border: 1px solid;
  margin: 0 20px;
}
/* 父元素设置 line-height */
.parent {
  line-height: 300px;
}
/* 子元素设置为内联块级盒子，垂直居中，行高设置为任意一个值 */
.child {
  display: inline-block;
  line-height: 1.5;
  vertical-align: middle;
}
```

- 父元素一定，子元素为块级元素

```html
<div class="parent">
  <div class="child child-box"></div>
</div>
```

```css
.parent {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid purple;
}
.child-box {
  width: 100px;
  height: 100px;
  border: 1px solid purple;
}
/* 原理就是 margin 平分剩余空间 */
.child {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}
```

**(2) 基于 flex 的实现**

```html
<div class="parent parent-box">
  <div class="child"></div>
</div>
```

```css
.parent-box {
  width: 300px;
  height: 300px;
  border: 1px solid purple;
}

.parent {
  display: flex;
  align-items: center;
}

.child {
  width: 100px;
  height: 100px;
  border: 1px solid purple;
}
```

## 二、单列布局

### 1. header、content、footer 为浏览器宽度

- 方案 1：计算中间列高度

```html
<body class="layout">
  <div class="header">头部</div>
  <div class="content">内容</div>
  <div class="footer">尾部</div>
</body>
```

```css
.layout {
  margin: 0 auto;
  height: 100vh;
}

.header,
.footer {
  height: 40px;
  background: #009cff;
}

.content {
  height: calc(100vh - 80px);
}
```

- 方案 2：flex 布局

```css
.layout {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100vh;
}

.header,
.footer {
  height: 40px;
  background: #009cff;
}

.content {
  flex: 1;
}
```

### 2. header、footer 宽度为浏览器宽度，content 宽度小于浏览器宽度居中

```html
<body class="layout">
  <div class="header">头部</div>
  <div class="content">内容</div>
  <div class="footer">尾部</div>
</body>
```

```css
.layout {
  margin: 0;
  height: 100vh;
}

.header,
.footer {
  height: 40px;
  background: #009cff;
}

.content {
  width: 80%;
  height: calc(100vh - 80px);
  background: #eee;
  margin: 0 auto;
}
```

另一种方案参考上一个 demo

## 三、三列布局

### 1. 基于盒模型的实现

- **float + margin**

左右两列先写，中间列最后写，左右列分别设置一个宽度左右浮动，中间列 margin 左右分别设置为左右列的宽度。

```html
<body class="layout">
  <div class="sub">sub</div>
  <div class="extra">extra</div>
  <div class="main">main</div>
</body>
```

```css
.layout {
  height: 100vh;
  margin: 0;
}

.sub {
  float: left;
  width: 20%;
  height: 100px;
  background: #009cff;
}

.extra {
  float: right;
  width: 10%;
  height: 200px;
  background: #009cff;
}

.main {
  margin-left: 20%;
  margin-right: 10%;
  height: 100%;
  background: #dff;
}
```

- **position + margin**

左右元素绝对定位，中间元素的 margin-left、margin-right 对应左右元素的宽度。

```html
<body class="layout">
  <div class="sub">left</div>
  <div class="main">main</div>
  <div class="extra">right</div>
</body>
```

```css
.layout {
  min-height: 100vh;
  margin: 0;
}

.sub,
.extra {
  position: absolute;
  top: 0;
  height: 100%;
  background: rgb(56, 165, 238);
}
.sub {
  left: 0;
  width: 10%;
}

.extra {
  right: 0;
  width: 20%;
}

.main {
  margin-left: 10%;
  margin-right: 20%;
}
```

以上实现都是中间列要么写在中间，要么写在最后面，不利于主要内容的 seo 和优先渲染，那若是我们想优先渲染主要内容该怎么办呢？DOM Tree 是从上往下解析的，所以我们需要把 main 提到前面，于是就有了下面的布局方案。

### 2. 基于盒模型的三列布局增强版

- **双飞翼布局**

双飞翼布局也是用 float+margin 进行布局，不同的是 main 被提到了最前面，里面加了个子元素。该布局方案的精髓在于左列和中间列左浮动，右列右浮动，左列设置 margin: -100%，把该列拉回原本的位置，右列设置 margin 为负的自身宽度，回到上一行。main 的宽度设置为容器宽度，子元素 margin 的左右设置为左右列的宽度。

```html
<body class="layout">
  <div class="main">
    <div class="content"></div>
  </div>
  <div class="left"></div>
  <div class="right"></div>
</body>
```

```css
.layout {
  min-height: 100vh;
  margin: 0;
}
.left {
  float: left;
  width: 200px;
  height: 100vh;
  margin-left: -100%;
  background-color: antiquewhite;
}
.right {
  float: right;
  width: 200px;
  height: 200px;
  margin-left: -200px;
  background-color: aquamarine;
}
.main {
  width: 100%;
  float: left;
}
.content {
  height: 100vh;
  margin-left: 200px;
  margin-right: 200px;
  background-color: bisque;
}
```

- **圣杯布局**

圣杯布局比双飞翼布局相比，元素嵌套没这么深，主要精髓在于，所有列设置左浮动，左右列设置 position: relative,分别设置对应方向的偏移值。父元素设置左右 margin 分别为左右列的宽度。

```html
<body class="layout">
  <div class="main">content</div>
  <div class="left">left</div>
  <div class="right">right</div>
</body>
```

```css
.layout {
  min-height: 100vh;
  margin: 0;
  margin-left: 300px;
  margin-right: 200px;
}
.left {
  float: left;
  position: relative;
  margin-left: -100%;
  left: -300px;
  width: 300px;
  height: 100vh;
  background-color: antiquewhite;
}
.right {
  float: left;
  position: relative;
  right: -200px;
  width: 200px;
  height: 200px;
  margin-left: -200px;
  background-color: aquamarine;
}
.main {
  float: left;
  width: 100%;
  height: 100vh;
  background-color: bisque;
}
```

### 3. 基于 flex 实现三栏布局

```html
<body class="layout">
  <div class="main">主内容栏宽度自适应</div>
  <aside class="left">侧边栏宽度固定</aside>
  <aside class="right">侧边栏宽度固定</aside>
</body>
```

```css
.layout {
  display: flex;
  height: 100vh;
  margin: 0;
}

.main {
  flex: 1;
  background: #aaa;
}

.left,
.right {
  height: 100%;
}
.left {
  order: -1;
  width: 10%;
  background: #009cff;
}

.right {
  width: 20%;
  background: orange;
}
```
