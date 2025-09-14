---
title: CSS 系列文章 —— 层叠
categories: Web开发
tags: [前端,CSS]
comments: true
toc: true
date: 2020-08-27 11:25:17
---
### 一、层叠上下文

1、**特性**

(1) 层叠上下文的层叠水平要比普通元素高

(2) 层叠上下文可以阻断元素的混合模式

(3) 层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的“层叠上下文”

(4) 每个层叠上下文和兄弟元素独立，也就是说，当进行层叠变化或渲染的时候，只需要考虑后代元素

(5) 每个层叠上下文是自成体系的，当元素发生层叠的时候，整个元素被认为是在父层叠上下文的层叠顺序中

2、**创建**

(1) 页面根元素默认具有层叠上下文，称为根层叠上下文

(2) z-index 值为数值的定位元素

(3) 其他 CSS3 属性

  - 元素为 flex 布局元素(父元素 display:flex|inline-flex)，同时 z-index值不是 auto

  - 元素的 opacity 值不是 1

  - 元素的 transform 值不是 none

  - 元素 mix-blend-mode 值不是 normal

  - 元素的 filter 值不是 none

  - 元素的 isolation 值是 isolate

  - 元素的 will-change 属性值为上面 2~6 的任意一个

  - 元素的-webkit-overflow-scrolling 设为 touch

### 二、层叠顺序

1、若层叠上下文元素不依赖 z-index 数值，则其层叠顺序是 z-index:auto，可看成 z:index:0 级别

2、若层叠上下文元素依赖 z-index 数值，则其层叠顺序由 z-index 值决定

3、兄弟层叠顺序一样，后者会覆盖前者，在上面

4、**z-index 负值**

(1) 层叠顺序在层叠上下文元素的背景色之上，块状元素之下

(2) **应用**

  - 可访问性隐藏
  
  - IE8 下的多背景模拟
  
  - 定位在元素的后面 