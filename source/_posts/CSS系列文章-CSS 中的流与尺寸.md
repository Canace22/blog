---
title: CSS 系列文章——CSS 中的流与尺寸
categories: Web开发
tags: [前端,CSS]
comments: true
toc: true
date: 2020-08-27 10:12:17
---
### 一、流与宽度

1、一个水平流上只能单独显示一个元素，多个块级元素换行显示

2、**外部尺寸与流体特性**

(1) 正常流下，块级元素宽度是容器的 100%，即充满容器

(2) 流动性，是一种 margin/border/padding 和 content 内容区域自动分配水平空间的机制

(3) 格式化宽度，仅出现在"绝对定位模型"中，对于非替换元素，当 left/top 或 top/bottom 对立方位的属性值同时存在的时候，元素的宽度表现为“格式化宽度”，其宽度大小相对于最近的具有定位特性(position 属性值不是 static)的祖先元素计算
 
3、**内部尺寸与流体特性**

(1) 内部尺寸，元素的尺寸由内部的元素决定，若元素无内容，宽度表现为 0

(2) 具有包裹性，自适应性，即，超过容器自动换行，inline-block 元素，浮动元素以及绝对定位元素都具有包裹性

### 二、说说 width

1、**默认值：** auto

2、**表现：**

(1) 充分利用可用空间(fill-availiable),块级元素的默认宽度是父级容器的 100%

(2) 收缩与包裹(shrink-to-fit)，比如，浮动、绝对定位等

(3) 收缩到最小(min-content)，当每一列空间都不够时，文字能断就断

(4) 超出容器限制，默认的 width 设置，元素一般不会超出，除非设置了 white-space: noWrap 或者内容是很长的连续英文或数字

3、**首选最小宽度**

(1) 东亚文字最小宽度为每个汉字的宽度

(2) 西方文字最小宽度由特定的连续英文字符单元决定，一般以空格或者非英文字符作为分隔

(3) 类似图片这样的替换元素的最小宽度是该元素内容本身的宽度
 
4、**最大宽度**

若内部没有块级元素或块级元素未设定宽度，最大宽度是最大的连续内联盒子的宽度

5、**设置 width 值的影响**

(1) width 默认作用在 content box 上，设置 padding、margin 等会增大宽度

(2) 流动性丢失

(3) 表现不一致

6、**宽度分离**

(1) width 属性不与影响宽度的 padding/border 属性共存

(2) 方法：width 独占一层标签，padding、border 以及 margin 利用流动性在内部自适应

### 三、改变 width/height 作用细节: box-sizing

1、box-sizing，默认值：content-box

2、box-sizing 设计的初衷：解决替换元素宽度自适应问题

```css
input,textarea,img,video,object {
  box-sizing: border-box
​}
```

### 四、说说 height

1、父元素 height: auto，正常文档流下，子元素百分比值无效

2、解决方法

(1) 绝对定位

(2) 给父元素高度设置固定值

### 五、min-width/max-width

1、**适用场景：**自适应布局/流体布局

2、**屏幕自适应**

```css
🌰.container {
min-width: 1200px;
max-width: 1400px;
​}
```

3、**图片自适应**

```css
🌰img {
max-width: 100%;
height: auto;
​}
```

4、min-width/min-height 的初始值是 auto，max-width/max-height 的初始值是 none

5、会覆盖 width, 包括设置了 !important 的 width

6、二者冲突时， min-width 会覆盖 max-width

7、**应用实例**

通过改变 max-height 值实现任意高度元素的展开收起动画效果，但是 max-height 值需要设置足够小的安全值，避免动画延迟

### 六、CSS 中的盒子

1、块级盒子(block-level box)

2、**内联盒子(inline-box)**

内联盒模型

(1) 内容区域(content area)

(2) 内联盒子(inline box)，分为内联盒子和匿名内联盒子

(3) 行宽盒子(line box)

(4) 包含盒子(containing box)

(5) 标记盒子(marker box)

(6) 容器盒子(content-box, 宽高作用的盒子)，容器盒子里面又包含：content box、padding box、border box、margin box，这些称为内在盒子

3、**内联元素，外部盒子是内联盒子**

🌰button(默认值:inline-block)、img、表单控件等