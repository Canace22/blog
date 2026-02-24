---
title: CSS 系列文章——盒尺寸
description: '替换元素尺寸由固有、HTML和CSS属性共同决定，合理设置避免布局异常'
categories: Web开发
tags: [前端, CSS与可视化]
comments: true
toc: true
date: 2020-08-27 10:42:17
---
盒尺寸分为以下四种：content box、padding box、border box 以及 margin box，也就是容器盒子中的内在盒子的尺寸。

### 一、替换元素

1、🎓是**什么**

通过修改某个属性值呈现内容可以被替换掉的元素

2、🎓**替换元素有哪些**

🌰img, object, video, ifram, texarea, input 等

3、🎓**特性**：

(1) 样式表现在 CSS 作用域之外，即内容上的外观不受页面上的 CSS 影响

(2) 有默认尺寸，🌰video/ifram/canvas(300px x 150px)，img(0)等

(3) 在很多 CSS 属性上有自己的一套表现规则，🌰vertical-align 的基线不是 baseline，而是下边缘
 
4、🎓替换元素在不同浏览器的 display 值可能会不一样

5、🎓**尺寸计算规则**

```md
📚**相关概念**
​
(1) 固有尺寸，即元素本身的尺寸，不可改变

(2) HTML 尺寸，只能通过 HTML 原生属性改变

(3) CSS 尺寸，可以通过 CSS 的 width 和 height 或者 max-width/min-width 和
max-height/min-height 设置的尺寸，对应盒尺寸中的 content box
```

(1) 若没有 CSS 尺寸和 HTML 尺寸，则使用固有尺寸作为最终宽高

(2) 若没有 CSS 尺寸，则使用 HTML 尺寸作为最终宽高

(3) 若没有 CSS 尺寸，则最终尺寸由 CSS 属性决定

(4) 若”固有尺寸“含有固有的宽高比例，同时仅设置了宽度或仅设置了高度，则元素依然按照固有的宽高比例显示

(5) 若上述条件都不符合，则宽高表现为默认宽高值的比
 
6、🎓**替换元素不设置 src，表现为普通内联元素**

基于伪元素的图片内容生成技术

(1) 图片不设置 src

(2) after 伪元素 content 设置为 attr(alt);

7、🎓**content 属性**

(1) content 属性生成的对象被称为"匿名替换元素"

(2) 📚实用技术: 

- content 辅助元素生成

- content 字符内容生成

- content 图片生成(使用 url 显示图片)

- content 计数器(counter-reset,counter-increment,counter(counter-reset),counters(name, string)，实现计数嵌套)

### 二、padding

1、🎓默认模式下，使用 padding 会**增加元素尺寸**

2、🎓内联元素 padding 对视觉层和布局层具有双重影响
 
3、🎓**属性值特性**

(1) 百分比值相对于宽度计算

(2) 不支持负值

- ol/ul 列表内置 padding-left，单位是 px, 🌰Chrome 浏览器下是 40px

- 很多表单元素都内置 padding

4、**📚运用**

(1) 增加点击区域

(2) 实现管道符

(3) 实现一些图标,比如,双层圆环和三道杠

### 三、border

1、🎓**基本常识**

(1) 不支持百分比值

(2) 关键字: thin(1px)、medium(3px)、thick(4px)

(3) 默认宽度 medium

2、**border-style**

(1) 默认值：none

(2) 常用值：solid、dashed、dotted、double

(3) 重置边框性能高的方法

```css
🌰div{
  border: 1px solid;
  border-bottom: 0 none;
​}
```

3、**border-color**

默认值：currentColor

4、📚**运用**

(1) 增加点击区域

(2) 利用 transparent 等特性生成三角形、梯形等图形

(3) 实现等高布局

### 四、margin

1、📚**margin 失效的情况**

(1) display 计算值 inline 的非替换元素的垂直 margin

(2) 表格中的 tr 和 td 元素或设置 display 计算值是table-cell 或 table-row 的元素

(3) margin 合并时，更改 margin 值时

(4) 绝对定位元素非定位方位的 margin 值

(5) 定高容器的子元素 margin-bottom

(6) 定宽元素的子元素 margin-right

(7) 内联特性导致的 margin 无效

2、**margin:auto 填充规则**

(1) 如果一侧定值，一侧 auto，则 auto 为剩余空间大小

(2) 若两侧均是 auto，则平分剩余空间

3、**margin 合并**

(1) 🎓**是什么**

块级元素的 margin-top 和 margin-bottom 合并

(2) 🎓**发生 margin 合并的场景**

- 相邻兄弟元素

- 父级元素和第一个子元素/最后一个子元素, 阻止合并方法

  - 父元素设置为块级格式化上下文
  
  - 设置border-top/border-bottom
  
  - 设置padding-top/padding-bottom
  
  - 父元素和第一个子元素或最后一个子元素间添加内联元素进行分隔
  
  - 父元素设置 height，min-height或max-height（margin-bottom合并）

- 空块级元素, 阻止合并方法
  
  - 设置垂直方向border
  
  - 设置垂直方向 padding
  
  - 内部添加内联元素
  
  - 设置height / min-height

- 计算规则

  - 正正取大值
  
  - 正负值相加
  
  - 负负取绝对负值最大的值

4、🔧**运用**

(1) **margin 设置负值实现两端对齐**

```css
🌰.parent { 
  margin-left: -20px; 
} 
.child { 
  float: left; 
  width: 100px; 
  margin-left: 20px; 
}​​​
```
 
(2) 滚动模式下底部留白使用padding会有兼容问题，使用子元素 margin 比较靠谱

(3) **实现等高布局**

```css
🌰.box { 
  overflow: hidden; 
} 
.left, .right { 
  margin-bottom: -9999px; 
  padding-bottom: 9999px; 
}
```