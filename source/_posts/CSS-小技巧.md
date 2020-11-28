---
title: CSS 小技巧
comments: true
date: 2020-11-28 12:02:22
categories: web
tags: css
toc: true
description: 本文收录日常开发中一些 css 小技巧。
---

## 文本末尾添加省略号

有时候需要控制文本不折行, 并且以 "....", 代替超出的文本部分,也就是相当于 more 功能, 用 css 实现方式如下:

```CSS
/* 单行文本 */
.noWrap{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* 多行文本 */
.noWrap {
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5em;
  max-height: 3em;
}
```

以上 css 代码中主要用到了 csss3 的一些特性, 除了以上代码,注意给个宽度, 不然不知道什么时候需要用"..."代替文本, 更多相关内容可以查看 w3c 文档。

## Android 端阴影

Android 端，img 和 button，点击之后出现一块阴影区域，一开始以为是 user-select 作怪，设置为 none 无果，后来发现是 curser：pointer 的锅，在 Android 端 cursor 设置为 none，即可解决问题

## 导航条样式操作

```css
/* The emerging W3C standard
that is currently Firefox-only */
* {
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: orange;
}
*::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 20px;
  border: 3px solid orange;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(14, 77, 136);
}
```

## 利用 max-height 实现展开、收起效果

```css
.element {
  max-height: 0;
}
.element:hover {
  max-height: 700px;
  transition: ease 0.25s;
}
```

## 利用 content 属性设置序号

```css
.reset {
  padding-left: 20px;
  counter-reset: wangxiaoer;
}
.counter:before {
  content: counters(wangxiaoer, "-") ". ";
  counter-increment: wangxiaoer;
}
```

## flex 布局最后一行左对齐

用 flex 布局一时爽，但是里面还是有些坑需要避一避的。比如说想要有间隔的布局，但是用 space-around 和 space-between 都会有一个瑕疵，那就是，最后一行并不是左对齐的，有人会说用 aligh-content，交叉轴对其啊，但是 jusfy-content 需要 flex-start 才能做到这种效果，这样子的话，就没有居中效果了，因此，只能另辟蹊径。我采用的方法比较笨拙，就是在最后一个块级元素的后面，加多两个空的等宽的块级元素，高度设置为 0，完美实现想要的效果。

## 文本模糊效果

```css
.blurry {
  color: transparent;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
```

## 自定义文本选中样式

```css
.element::selection {
  color: #fff;
  background-color: orange;
}
.element::-moz-selection {
  color: #fff;
  background-color: orange;
}
```

## input 

### placeholder 样式修改

```css
 input::-webkit-input-placeholder {
    color: orange;
    background-color: #f9f7f7;
    font-size: 14px;
  }
  input::-moz-input-placeholder {
    color: orange;
    background-color: #f9f7f7;
    font-size: 14px;
  }
  input::-ms-input-placeholder {
    color: orange;
    background-color: #f9f7f7;
    font-size: 14px;
  }
```

### 去 border

在重写 checkbox 样式时，发现用 border 属性修改不了外框样式，摸索了一下发现这个外框来自于 appearance，设置为 none，把 outline 去掉，即可

```css
input[type="checkbox"] {
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  outline: none;
}
```

## 利用色相反转实现深色模式

不需要反转的元素可以在加一层反转，使其反转回来，比如下面的 img

```css
@media (prefers-color-scheme: dark) {
  html,
  img {
    filter: invert(1) hue-rotate(180deg);
  }
}
```
