---
title: CSS 定位详解
categories: Web开发
tags: [前端,CSS]
description: 详细讲解 position 属性几个值的区别，并新加了新属性 sticky 的讲解。
comments: true
date: 2019-11-28 08:35:29
---

css 定位主要用 position 属性，position 的默认值是 static，此时文档是按照正常的文档流去放置的，不会产生重叠等问题，同时该属性值也不具备方向偏移值。

而我们常用的：relative、absolute、fixed 等属性的不同之处在于基准点的不同。

relative 属性的基准点是自身位置，所产生的偏移值也是相对于自身的。

absolute 属性的基准点是父元素，即，是相对于父元素进行偏移的，但是前提是父元素是 relative 是定位的，如果父元素不是 relative 定位，就会向上搜，直到找到第一个 relative 定位的元素，并相对于该元素进行偏移。

fixed 属性的基准点是视口，即，相对于视口偏移。

还有一个新的属性值 sticky，可以说是 fixed 属性和 relative 属性的结合体，当页面没有滚动时，元素是按照 relative 进行位置确定的，当页面向下滚动时，元素则是按照 sticky 进行偏移的，这个元素一般用于需要固定导航栏或者是表头等场景。
