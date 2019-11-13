---
title: CSS 布局篇
comments: true
date: 2019-08-11 10:45:33
categories: web
tags: css
---

css 基本布局介绍，包括元素的水平、垂直居中，单列布局、三列布局等，文章分析了多种情况下的布局方案，参考自知乎《css 十八般武艺全在这里了》。

<!--more-->

一、布局

1、居中

(1) 水平居中

A、子元素行内元素

```html
<div class="parent">
  <span class="child">子元素为行内元素</span>
</div>
```

```css
.parent {
  text-align: center;
  width: 200px;
  height: 100px;
  border: 1px solid purple;
}
```

B、子元素为定宽块状元素

```html
<div class="parent">
  <div class="child">定宽子元素</div>
</div>
```

```css
.parent {
  width: 200px;
  height: 100px;
  border: 1px solid purple;
}
.child {
  width: 100px;
  height: 20px;
  margin: auto;
}
```

C、子元素为不定宽块状元素

```html
<div class="parent">
  <div class="child">子元素为不定宽块状元素</div>
</div>
```

```css
.parent {
  text-align: center;
  width: 200px;
  height: 100px;
  border: 1px solid purple;
}
.child {
  display: inline;
}
```

D、flex 布局

```html
<div class="parent">
  <div class="child">flex 布局</div>
</div>
```

```css
.parent {
  display: flex;
  justify-content: center;
}
```

(2) 垂直居中

A、父元素一定，子元素为单行内联文本

```html
<div class="parent">
  <div class="child">父元素一定，子元素为单行内联文本</div>
</div>
```

```css
.parent {
  width: 260px;
  height: 100px;
  line-height: 100px;
  border: 1px solid purple;
}
```

B、父元素一定，子元素为多行内联文本

```html
<div class="parent">
  <div class="child">
    父元素一定，子元素为多行内联文本父元素一定，子元素为多行内联文本父元素一定，子元素为多行内联文本父元素一定，子元素为多行内联文本
  </div>
</div>
```

```css
.parent {
  display: table-cell;
  vertical-align: middle;
  width: 260px;
  height: 100px;
  border: 1px solid purple;
}
```

C、子元素为块级元素

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  width: 500px;
  height: 500px;
  border: 1px solid purple;
}

.child {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100px;
  height: 100px;
  margin: auto;
  border: 1px solid purple;
}
```

D、flex 布局

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  display: flex;
  align-item: center;
  width: 500px;
  height: 500px;
  border: 1px solid purple;
}
```

2、单列布局

(1) header、content、footer 宽度相同

```html
<div class="layout">
  <div class="header">头部</div>
  <div class="content">内容</div>
  <div class="footer">尾部</div>
</div>
```

```css
.layout {
  /*   width: 960px; */
  /*设置width当浏览器窗口宽度小于960px时，单列布局不会自适应。*/
  max-width: 960px;
  margin: 0 auto;
}

.header {
  width: 100%;
  height: 72px;
  background: palegoldenrod;
}

.content {
  width: 100%;
  height: calc(100% - 144px);
  background: rgb(27, 27, 26);
}

.footer {
  width: 100%;
  height: 72px;
  background: rgb(211, 211, 75);
}
```

(2) header、footer 宽度为浏览器宽度，content 宽度小于浏览器宽度居中

```html
<div class="header">
  <div class="layout">头部</div>
</div>
<div class="content" class="layout">内容</div>
<div class="footer">
  <div class="layout">尾部</div>
</div>
```

```css
.layout {
  /*   width: 960px; */
  /*设置width当浏览器窗口宽度小于960px时，单列布局不会自适应。*/
  max-width: 960px;
  height: 100%;
  margin: 0 auto;
}

.header,
.footer {
  width: 100%;
  height: 72px;
  background: rgb(211, 211, 75);
}

.content {
  width: 960px;
  height: calc(100% - 144px);
  background: rgb(27, 27, 26);
  margin: auto;
}
```

3、三列布局

(1) float + margin，要点两边元素固定宽度，中间元素的 margin-left、margin-right 对应左右元素的宽，先写两侧栏，再写主面板

```html
<div class="content">
  <div class="sub">sub</div>
  <div class="extra">extra</div>
  <div class="main">main</div>
</div>
```

```css
.content {
  width: 100%;
  height: 100%;
}

.sub {
  float: left;
  width: 20%;
  height: 100%;
  background: rgb(56, 165, 238);
}

.extra {
  float: right;
  width: 10%;
  height: 100%;
  background: rgb(56, 165, 238);
}

.main {
  margin-left: 20%;
  margin-right: 10%;
}
```

(2) position + margin，左右元素绝对定位，中间元素的 margin-left、margin-right 对应左右元素的宽度

```html
<div class="sub">left</div>
<div class="main">main</div>
<div class="extra">right</div>
```

```css
.sub,
.extra {
  position: absolute;
  top: 0;
  width: 200px;
  height: 100%;
  background: rgb(56, 165, 238);
}

.sub {
  left: 0;
}

.extra {
  right: 0;
}

.main {
  margin: 0 200px;
}
```

(3) flex

```html
<div class="layout">
  <aside class="aside">侧边栏宽度固定</aside>
  <div class="main">主内容栏宽度自适应</div>
</div>
<div class="layout">
  <div class="main">主内容栏宽度自适应</div>
  <aside class="aside">侧边栏宽度固定</aside>
</div>
<div class="layout">
  <aside class="aside">左侧边栏宽度固定</aside>
  <div class="main">主内容栏宽度自适应</div>
  <aside class="aside">右侧边栏宽度固定</aside>
</div>
<div class="layout">
  <aside class="aside">第1个侧边栏宽度固定</aside>
  <aside class="aside">第2个侧边栏宽度固定</aside>
  <div class="main">主内容栏宽度自适应</div>
</div>
<div class="layout">
  <div class="main">主内容栏宽度自适应</div>
  <aside class="aside">第1个侧边栏宽度固定</aside>
  <aside class="aside">第2个侧边栏宽度固定</aside>
</div>
```

```css
.layout {
  display: flex;
}

.main {
  flex: 1;
}

.aside {
  width: 200px;
}
```
