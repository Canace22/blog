---
title: CSS 基础
comments: true
date: 2019-01-26 13:55:01
categories: Web开发
tags: [前端, CSS与可视化]
---

css 基础知识笔记，包括专业术语介绍、css 流概述等，具体内容可以查看全文

<!--more-->

## 一、 专业术语概览

1. 属性，eg. height, width...

2. 值的常用类别

   - 整数值, eg. z-index: 1

   - 数值, eg. line-height: 1.5

   - 百分比值, eg. padding: 20%

   - 长度值，eg. 12px

   - 颜色值, eg. #fff

3. 关键字, eg. transparent, solid

4. 变量

5. 长度单位分类：

   - 相对字体长度单位, eg. em, rem

   - 相对视区长度单位, eg. vh, vw

   - 绝对长度单位, eg. px

6. 功能符：eg. rgba, url, scale

7. 选择器：

   - 类选择器, .

   - ID 选择器，唯一性, #

   - 属性选择器，[]

   - 伪类选择器，:

   - 伪元素选择器，::before, ::after

   - 关系选择器：后代选择器（空格连接）、相邻后代选择器（>），兄弟选择器（~），相邻兄弟选择器（+）

## 二、css 流

1. 流被破坏的原因：给块级元素设置了绝对宽度，而这个宽度实际是作用域 content-box 的，另外有设置了 border、padding、margin 等，把盒子撑大了。

2. 防止流破坏的方式：

   - 宽度分离，即内容层跟包裹层分离，在包裹层设置 width，内容层设置 border、poadding、margin 等属性值。

   - 设置 box-sizing（content-box, padding-box, border-box），兼容性不好，慎用

   - 使用 flex 布局

3. 父元素没有设置 height，网上查找到顶部也没有设置 height，则子元素设置 height:100% 无效

4. 元素支持 height: 100% 的方法：

   - 父元素或向上的元素设置 height

   - 使用绝对定位
