---
title: CSS 系列文章——CSS 基础知多少
categories: web
tags: css
comments: true
toc: true
date: 2020-08-27 10:00:17
---
### 一、CSS 是怎么组织的

先看一段 demo：

```css
.icon {
  width: 20px;
  height: 30px;
  border-radius: 4px;
}
```

上面的 demo 是我们常见的 CSS 代码，那么他是如何组织的呢？首先，可以看到花括号里面有 width, height 之类的描述词，这种描述词就是 **CSS 属性**，而 width， height 后面会有进一步细化的描述，20px, 30px 等，这就是**属性值**。每一个属性值对后面都有个分号，比如，"width: 20px;"，我们称这是一条 CSS **声明**。所有的 CSS 声明被放在了一个大的花括号里，花括号以及它所包含的声明，被称为 CSS **声明块**。而一段 CSS 名称 + 后面紧跟的块，形成一个 CSS **规则集**。

### 二、CSS 属性值的常用类型

#### 1、距离值(数值 + 长度单位)

##### (1)相对长度单位

A. 文字长度单位

- ch, 字符'0'（Unicode值是U+0030）所占据的宽度

- em, 元素的计算字体大小。如果用于字体大小属性本身，则表示元素的继承字体大小

- ex, 元素当前的x-height，也就是字母'x'的高度

- rem， 相对于根元素的字体大小

- rlh， 相对于根元素的行高大小

B. 视区长度单位

- vh, 浏览器窗口视区 1% 的高度

- vw, 浏览器窗口视区 1% 的宽度

- vmin, 等于 vh 和 vw 较小的值

- vmax, 等于 vh 和 vw 较大的值

##### (2)绝对长度单位

- px, 对于屏幕显示，1 像素通常表示一个设备像素（点）。然而，对于打印机和高分辨率屏幕，一个CSS像素意味着多个设备像素。1px=1英寸的1/96。

- cm, 厘米，1cm = 96px/2.54

- mm, 毫米，1mm = 1cm/10 = 96px/2.54/10

- in, 英寸, 1in = 2.54cm = 96px

- pc, 派卡，1pc = 12pt = 1in/6

- pt, 点，1pt = 1in/72

#### 2、角度值(数值 + 角度单位)

(1) deg，度，一个完整的圆是 360 deg

(2) grad, 百分度，角的测量单位， 一个完整的圆是 400 grad

(3) rad，弧度，弧长与半径之比，一个完整的圆是 2π 弧度, 大约是 6.2832rad, 1rad = 180 / π

(4) turn，圈数，一个完整的圆是 1turn, 1/4 圆是 0.25turn

#### 3、颜色值

(1) 颜色值关键字，颜色值的英文单词，比如: 'red', 'blue'等，目前共有 147 个，详细颜色值[戳这里](https://www.zhangxinxu.com/wordpress/2010/08/css3%e4%b8%8b%e7%9a%84147%e4%b8%aa%e9%a2%9c%e8%89%b2%e5%90%8d%e7%a7%b0%e5%8f%8a%e5%af%b9%e5%ba%94%e9%a2%9c%e8%89%b2%e5%80%bc/)

(2) transparent, 透明

(3) currentColor, 颜色变量, 当前的标签所继承的文字颜色

(4) RGB 颜色，语法包括：#RRGGBB[AA]，#RGB[A]，rgb[a](R, G, B[, A])以及rgb[a](R G B[ / A])

(5) HSL 颜色，语法包括：hsl[a](H, S, L[, A])，以及CSS Colors Level 4中新增的hsl[a](H S L[ / A])

#### 4、百分比值

相对于父辈元素对象计算占比

#### 5、数值

数值包括小数和整数，比如 `line-height: 1.2`

#### 6、关键字

比如 `border: solid` 中的 solid

#### 7、函数值

比如，`height: calc(100% - 20px)` 中的 "calc(100% - 20px)"

### 三、CSS 选择器

1、类选择器

形如: `.icon {}`

2、ID 选择器

形如: `#title{}`, 具有唯一性，不建议一个文档中多处用

3、属性选择器

形如: `[title~=hello] { color:red; }`，这个例子为包含指定值的 title 属性的所有元素设置颜色为红色

4、伪类选择器

形如：`selector : pseudo-class {property: value}`

6、伪元素选择器

`selector:pseudo-element {property:value;}`

### 四、关系选择器

1、 后代选择器

形如: `#yayunhui h1{}`, 该实例会对带有 'yayunhui' ID 的所有子元素 h1 应用样式

2、子元素选择器

以 '>' 连接，形如: `#wrap>h1 {}`，该实例只会对带有 'wrap' ID 的直接子元素 h1 应用样式

3、兄弟选择器

以 '~' 连接，形如: `.title~h1`，该实例会对带有 title 类的所有同级元素应用样式

4、相邻兄弟选择器

以 '+' 连接, 形如: `.title+h1`, 该实例只会对带有 title 类的相邻同级元素应用样式
