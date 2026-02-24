---
title: CSS 系列文章 —— 内联元素与流
categories: Web开发
tags: [前端, CSS与可视化]
comments: true
toc: true
date: 2020-08-27 10:12:17
---
### 一、x-height

1、**是什么:** 指小写字母 x 的高度，术语描述就是基线和等分线(mean line)(也称作中线，midline)之间的距离

2、内联元素默认都是基线对齐的, 即 x-height/2

3、**ex**: 实现不受字体和字号影响的内联元素的垂直居中对齐(1ex = x-height)

```css
.icon-arrow { 
  display: inline-block; 
  width: 20px; 
  height: 1ex; 
  background: url(arrow.png) no-repeat center; }
```

### 二、line-height

1、**默认值**：normal，支持数值、百分比值以及长度值

2、无论内联元素 line-height 如何设置，最终父级元素的高度都是由数值大的那个 line-height 决定的，称之为“内联元素 line-height 的大值特性

3、🔧**运用**

(1) 利用行距的上下等分机制，实现内联元素垂直居中

(2)  通过调整 line-height 实现多行文本垂直居中

### 三、vertical-align

1、**默认值**是 baseline，即基线对齐(相对字母 x 的下边缘对齐)

2、**属性值分类**

(1) **线类**，如 baseline(默认值)、top、middle、bottom

- 一个 inline-block 元素，如果里面没有内联元素，或者 overflow 不是 visible，则该元素的基线就是其 margin 底边缘;否则其基线就是元素里面最后一行内联元素的基线。

- vertial-align:top/bottom ，就是垂直上/下边缘对齐，具体定义如下:

  - 内联元素:元素底部和当前行框盒子的顶部/底部对齐

  - table-cell 元素:元素底 padding 边缘和表格行的顶部/底部对齐

- vertial- align:middle

  - 内联元素:元素的垂直中心点和行框盒子基线往上 1/2 x-height 处对齐。(近似居中)

  - table-cell 元素:单元格填充盒子相对于外面的表格行居中对齐。

  - 如果想要实现真正意义上的垂直居中对齐，只要想办法让字符 x 的中心位置就是容器的垂直中心位置即可，通常的做法是设置 font-size:0

(2) **文本类**，如 text-top、text-bottom

- vertical-align:text-top:盒子的顶部和父级内容区域的顶部对齐

- vertical-align:text-bottom:盒子的底部和父级内容区域的底部对齐。

- 特点

  - 文本类属性值的垂直对齐与左右文字大小和高度都没有关系

  - 文本类属性值的垂直对齐可以像素级精确控制

(3) **上标下标类**，如 sub、super

(4) **数值**, 如 20px、2em

  - 根据计算值的不同，相对于基线往上或往下偏移，到底是往上还是往下取决于 vertical- align 的计算值是正值还是负值，如果是负值，往下偏移，如果是正值，往上偏移
 
(5) **百分比类**，如 20%等

相对于 line-height 的计算值计算的

3、**有效的前提**

(1) 只能应用于内联元素以及 display 值为 table-cell 的元素

(2) 对 table-cell 元素而言，vertical-align 起作用的是 table-cell元素自身

4、**无效的情况**

浮动和绝对定位使元素块状化

5、任意一个块级元素，里面若有图片，则块级元素高度基本上都要比图片的高度高

6、**幽灵空白节点**

(1) 产生原因：字母 x 往下的行高产生的多余的间隙

(2) 解决方法

- 图片块状化。可以一口气干掉“幽灵空白节点”、line-height 和 vertical-align。

- 容器 line-height 足够小。只要半行间距小到字母 x 的下边缘位置或者再往上，自然就没有了撑开底部间隙高度空间了。比方说，容器设置 line-height:0。

- 容器 font-size 足够小。此方法要想生效，需要容器的 line-height 属性值和当前 font-size 相关，如 line-height:1.5 或者 line-height:150%之类;否则只会让下面的间隙变得更大，因为基线位置因字符 x 变小而往上升了。

- 图片设置其他 vertical-align 属性值。间隙的产生原因之一就是基线对齐，所以我们设置 vertical-align 的值为 top、middle、bottom 中的任意一个都是可以的。

7、**20px 图标对齐的处理技巧**

(1) 图标高度和当前行高都是 20px。很多小图标背景合并工具都是图标宽高多大生成的CSS 宽高就是多大，这其实并不利于形成可以整站通用的 CSS 策略，建议图标原图先扩展成统一规格，比方说这里的 20px×20px，然后再进行合并，可以节约大量 CSS 以及对每个图标对齐进行不同处理的开发成本。

(2) 图标标签里面永远有字符。这个可以借助:before 或:after 伪元素生成一个空格字符轻松搞定。

(3) 图标 CSS 不使用 overflow:hidden 保证基线为里面字符的基线，但是要让里面潜在的字符不可见。
