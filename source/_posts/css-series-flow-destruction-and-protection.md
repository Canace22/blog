---
title: CSS 系列文章 —— 流的破坏与保护
categories: Web开发
tags: [前端, CSS与可视化]
comments: true
toc: true
date: 2020-08-27 11:08:17
---
### 一、float

1、**本质:** 实现文字环绕效果
 
2、**作用机制**

(1) 破坏文档流

(2) 让父元素的高度塌陷

(3) 行框盒子区域限制

3、**特性**

(1) 包裹性

(2) 块状化并格式化上下文

(3) 破坏文档流

(4) 没有任何 margin 合并

4、**流体布局**

(1) 核心: 一侧定宽一侧自适应

(2) 问题： 纯浮动布局容错性差，容易出现比较严重的布局问题

### 二、clear

1、**目的**：处理 float 属性带来的高度塌陷等问题

2、**作用本质**: 让自己不和 float 元素在一行显示

3、**值**

(1) none:默认值，左右浮动

(2) left: 去除左侧浮动
  
(3) right:去除右侧浮动

(4) both: 去除两遍浮动
 
4、**tips**

(1) 块级元素才有效

(2) 借助伪元素清除浮动，需要配合 display 一起使用

(3) 只能在一定程度上消除浮动的影响

### 三、BFC(block formatting context), 块级格式化上下文

1、**作用**

(1) BFC 元素，不发生 margin 重叠

(2) 可以用来清除浮动的影响

2、**触发场景**

(1) html 根元素

(2) float 的值不为 none;

(3) overflow 的值为 auto、scroll 或 hidden;

(4) display 的值为 table-cell、table-caption 和 inline-block 中的任何一个;

(5) position 的值不为 relative 和 static。

3、**流体布局**

(1) 自适应内容由于封闭而更健壮，容错性更强

(2) 自适应内容自动填满浮动以外区域，无须关心浮动元素宽度，可以整站大规模应用

### 四、overflow

1、**支持的属性**

(1) visible:默认值

(2) hidden:剪裁

  - 剪裁界线是 border box 内边缘

  - 可以用于清除浮动

(3) scroll:滚动条区域一直在

(4) auto:不足以滚动时没有滚动条，可以滚动时滚动条出现
 
2、**tips**

(1) 如果容器可滚动(假设是垂直滚动)，则 padding-bottom 也算在滚动尺寸之内

(2) 如果 overflow-x 和 overflow-y 属性中的一个值设置为 visible 而另外一个设置为 scroll、auto 或 hidden，则 visible 的样式表现会如同 auto

(3) 默认产生滚动条的标签: html、textarea

(4) 在 PC 端，无论是什么浏览器，默认滚动条均来自 html，而不是 body 标签

(5) 在PC端，窗体滚动高度可以使用 document.documentElement.scrollTop 获取，但是在移动端，可能就要使用 document.body.scrollTop 获取。

(6) 获取滚动条宽度的方式：width - document.getElementById("ele").clientWidth

3、**自定义滚动条**

(1) 整体部分，::-webkit-scrollbar

(2) 两端按钮，::-webkit-scrollbar-button

(3) 外层轨道，::-webkit-scrollbar-track

(4) 内层轨道，::-webkit-scrollbar-track-piece

(5) 滚动滑块，::-webkit-scrollbar-thumb

(6) 边角，::-webkit-scrollbar-corner
 
4、**依赖 overflow 的样式效果**: text-overflow:ellipsis 实现单行文字超出显示 ……

### 五、position:absolute

1、**特性**

(1) 块级格式化上下文

(2) 脱离文档流

(3) 包裹性

(4) 计算和定位是相对于祖先定位元素的 padding box
 
2、**包含块(containing block)**

(1) **是什么**: 元素用来计算和定位的一个框

(2) **计算规则**
  
  - 根元素(很多场景下可以看成是<html>)被称为“初始包含块”，其尺寸等同于浏览器可视窗口的大小

  - 对于其他元素，如果该元素的 position 是 relative 或者 static，则“包含块”由其最近的块容器祖先盒的 content box 边界形成

  - 如果元素 position:fixed，则“包含块”是“初始包含块”

  - 如果元素 position:absolute，则“包含块”由最近的 position 不为 static的祖先元素建立
 

3、**absolute 元素**

(1) 只有在父元素是定位元素，absolute 元素才会被 overflow 影响

(2) absolute 元素设置了对立定位，会格式化宽度/高度，不设置宽度 width/height 会变为 100%

(3) absolute 元素设置 margin:auto

  - 如果一侧定值，一侧 auto，auto 为剩余空间大小;

  - 如果两侧均是 auto，则平分剩余空间。

4、**与 clip 属性配合**

(1) 可以剪裁 fixed

(2) 配合 absolute，可以实现可访问性元素隐藏，比如经常要用到一些 checkbox 之类的，但是原本的样式太丑了，可以选择用着这种方案隐藏掉原来的 checkbox，但是又不影响点击
 
5、**tips**
 
(1) 无依赖绝对定位:只对当前元素设置绝对定位和偏移值，不影响其他元素的样式

(2) 有的时候 fixed 元素或者 absolute 元素莫名的滚动了，可能是 transform 属性在作妖

(3) 父元素 relative 定位会限制 absolute 子元素

(4) 为了减小当前元素的样式对其他元素样式的影响，可以尽量减小 relative 的作用范围