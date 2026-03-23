---
title: 关于浏览器内核及其 CSS 写法
description: '不同浏览器内核对CSS前缀要求不同，写法需注意兼容性。'
categories: Web开发
tags: CSS与可视化
comments: true
date: 2017-12-05 09:12:00
---
### 一、主流浏览器内核包括哪几种，怎么发展的？ 

1、**Trident：** IE浏览器使用的内核，启用于1997年的IE4，一直延用至IE9。很多人叫它IE内核，其实Trident实际上也是开放内核，其接口内核设计的相当成熟，因此才有许多采用IE内核而非IE的浏览器涌现，如Maxthon等。

**基于 Trident 的浏览器有：IE4~IE9,Maxthon**

2、**Geckos：** Netscape6开始采用的内核，后来的FireFox沿用该内核，Gecko的特点是代码公开，它的可开发程度极高，广受青睐。

**基于Gecko的浏览器主要有：FireFox，Redfox，K-Meleon；**

3、**Webkit：** 苹果自己的内核，用于Safari浏览器，也是开放源码的自由软件，在安全方面不受IE,FireFox制约，在国内很安全

**基于 Webkit 的浏览器主要有：Safari,Chrome。**

4、**Presto：** 该内核在2003年的Opera7中首次被使用，该款引擎的特点就是渲染速度的优化达到了极致，也是目前公认网页浏览速度最快的浏览器内核，然而代价是牺牲了网页的兼容性。

**基于 Presto 的浏览器主要是 opera Mini。**

5、还有一类浏览器是基于多种内核的，如 Maxthon3，QQ浏览器，搜狗浏览器等。

### 二、不同的浏览器内核，在CSS中该怎么写？ 
**CSS 中的写法一般是根据不同浏览器的自定义样式加前缀：** 如webkit内核浏览器的-Webkit 、Gecko内核浏览器的 -moz 、Presto内核浏览器的-o以及Trident内核浏览器的-ms。