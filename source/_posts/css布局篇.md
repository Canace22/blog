---
title: CSS 布局篇
comments: true
date: 2021-04-02 10:45:33
categories: web
toc: true
tags: css
---

css 基本布局介绍，包括元素的水平、垂直居中，单列布局、三列布局等，文章分析了多种情况下的布局方案。

<!--more-->

## 一、居中

### 1. 水平居中

**(1) 基于盒型的实现**

- 子元素行内元素

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="WNGKJKj" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="水平居中——子元素行内元素">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/WNGKJKj">
  水平居中——子元素行内元素</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

- 子元素为定宽块状元素

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="oNBZELg" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="水平居中——子元素为定宽块状元素">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/oNBZELg">
  水平居中——子元素为定宽块状元素</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

- 子元素为不定宽块状元素

<p class="codepen" data-height="310" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="BapWYpd" style="height: 310px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="水平居中——子元素为不定宽块状元素">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/BapWYpd">
  水平居中——子元素为不定宽块状元素</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

**(2) 基于 flex 的实现**

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="VwPpQba" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="水平居中——基于 flex 的实现">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/VwPpQba">
  水平居中——基于 flex 的实现</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 2. 垂直居中

**(1) 基于盒模型的实现**

- 父元素一定，子元素为单行内联文本

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="KKaWQvB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="垂直居中——父元素一定，子元素为单行内联文本">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/KKaWQvB">
  垂直居中——父元素一定，子元素为单行内联文本</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

- 父元素一定，子元素为多行内联文本

<p class="codepen" data-height="411" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="wvgJyyy" style="height: 411px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="垂直居中——父元素一定，子元素为多行内联文本">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/wvgJyyy">
  垂直居中——父元素一定，子元素为多行内联文本</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

- 子元素为块级元素

<p class="codepen" data-height="405" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="MWJpVBy" style="height: 405px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="垂直居中——子元素为块级元素">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/MWJpVBy">
  垂直居中——子元素为块级元素</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

**(2) 基于 flex 的实现**

<p class="codepen" data-height="410" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="ExZWEGX" style="height: 410px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="垂直居中——基于 flex 的实现">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/ExZWEGX">
  垂直居中——基于 flex 的实现</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 二、单列布局

### 1. header、content、footer 为浏览器宽度

<p class="codepen" data-height="339" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="BapWrMg" style="height: 339px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="单列布局——header、content、footer 为浏览器宽度">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/BapWrMg">
  单列布局——header、content、footer 为浏览器宽度</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 2. header、footer 宽度为浏览器宽度，content 宽度小于浏览器宽度居中

<p class="codepen" data-height="390" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="NWdpYQP" style="height: 390px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="单列布局—— header、footer 宽度为浏览器宽度，content 宽度小于浏览器宽度居中">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/NWdpYQP">
  单列布局—— header、footer 宽度为浏览器宽度，content 宽度小于浏览器宽度居中</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 三、三列布局

### 1. 基于盒模型的实现

- **float + margin**

两边元素固定宽度，利用浮动性，使中间元素填充剩余空间，删除左右的其中一个，则可以实现一个元素固定，另一个元素填充剩余空间

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="QWdprwy" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="三列布局——float + margin">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/QWdprwy">
  三列布局——float + margin</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

- **position + margin**

左右元素绝对定位，中间元素的 margin-left、margin-right 对应左右元素的宽度

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="yLgMjoX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="三列布局——position + margin">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/yLgMjoX">
  三列布局——position + margin</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 2. 基于 flex 实现三栏布局

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="AnnaLoveLife" data-slug-hash="vYgxjeq" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="三列布局——基于 flex">
  <span>See the Pen <a href="https://codepen.io/AnnaLoveLife/pen/vYgxjeq">
  三列布局——基于 flex</a> by Anna (<a href="https://codepen.io/AnnaLoveLife">@AnnaLoveLife</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
