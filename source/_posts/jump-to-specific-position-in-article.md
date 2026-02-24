---
title: 浏览器页面跳转至文章指定位置的方法探究
categories: Web开发
tags: JavaScript&TypeScript
description: 探究浏览器页面跳转至文章指定位置的方法，比较锚点跳转和 Text Fragments 跳转的优缺点，总结两种跳转方式的使用场景
author: Canace
comments: true
toc: true
date: 2024-12-24 14:49:55
---
浏览器页面跳转到指定位置的方法有很多，比如scrollIntoView、链接锚点等，这里我们只对比锚点链接和Text Fragment两种方式。

## 一、锚点链接 (ID跳转)

### 1. 特点
- 需要在目标元素上设置id属性
- 跳转精确到元素级别
- 兼容性好，所有浏览器都支持
- 语法简单直观

### 2. 示例
```html
<a href="#id">跳转到指定位置</a>
<div id="id">指定位置</div>
```

## 二、Text Fragment跳转

### 1. 特点
- 不需要预先在HTML中设置标记
- 可以直接定位到具体文本内容
- 支持高亮显示匹配文本（通过CSS ::target-text）
- 语法较复杂，需要进行URL编码
- 浏览器兼容性有限（主要支持Chrome系列浏览器）

### 2. 示例
```html
  <a href="#:~:text=encodeURIComponent(<text>)">跳转到文字</a>
```

```css
::target-text {
  background-color: yellow;
}
```


## 三、使用场景对比

**锚点链接**
- 固定结构的页面导航
- 需要广泛浏览器兼容性的场景
- 目录式导航结构

**Text Fragment**
- 需要精确定位到具体文本内容
- 动态内容或搜索结果跳转
- 文档阅读时的精确引用
- 不方便或不想修改原HTML结构的场景

这两种跳转方式各有优势，建议根据具体使用场景选择合适的方式：如果是构建网站的主要导航，使用传统的锚点链接更稳妥，如果需要精确引用或分享特定文本段落，Text Fragment则可能更适合。

[详细 Demo](https://canace22.github.io/demo/link-to-target/index.html)

参考资料：
[Smarter than 'Ctrl+F': Linking Directly to Web Page Content](https://alfy.blog/2024/10/19/linking-directly-to-web-page-content.html)