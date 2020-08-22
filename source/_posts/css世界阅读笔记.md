---
title: 《CSS世界》阅读笔记
categories: 阅读笔记
tags: css
comments: true
toc: true
date: 2020-08-14 10:47:53
---
### 一、CSS 历史及文档流

#### 1、CSS 简史

(1) 1994 年被提议

(2) 1996 年 W3C 正式推出 CSS1

(3) 1998 年 W3C 正式推出 CSS2，推行内容和表现分离，table 布局开始没落

(4) 2007 年发布 CSS2.1，IE8 开始全面支持 CSS2.1

(5) CSS3 在 CSS 2.1 的基础上进行改进，布局方法更多样(flex,grid,媒体查询等），视觉表现更丰富

#### 2、 CSS1 及 CSS2 的目的

为图文信息展示服务

#### 3、文档流(流)

(1) **是什么**

元素的基本定位和布局机制

(2) **文档流是如何影响元素布局的**

- 正常文档流

- 破坏文档流，实现特殊布局

- 改变文档流，实现更加丰富的布局效果

(3) **流体布局**

"div+css" 布局，比如有名的双飞燕布局、圣杯布局等

### 二、CSS 基础知多少

#### 1、CSS 是怎么组织的

先看一段 demo：

```css
.icon {
  width: 20px;
  height: 30px;
  border-radius: 4px;
}
```

上面的 demo 是我们常见的 CSS 代码，那么他是如何组织的呢？首先，可以看到花括号里面有 width, height 之类的描述词，这种描述词就是 **CSS 属性**，而 width， height 后面会有进一步细化的描述，20px, 30px 等，这就是**属性值**。每一个属性值对后面都有个分号，比如，"width: 20px;"，我们称这是一条 CSS **声明**。所有的 CSS 声明被放在了一个大的花括号里，花括号以及它所包含的声明，被称为 CSS **声明块**。而一段 CSS 名称 + 后面紧跟的块，形成一个 CSS **规则集**。

#### 2、CSS 属性值的常用类型

(1）**距离值**(数值 + 长度单位)

相对长度单位

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

绝对长度单位

- px, 对于屏幕显示，1 像素通常表示一个设备像素（点）。然而，对于打印机和高分辨率屏幕，一个CSS像素意味着多个设备像素。1px=1英寸的1/96。

- cm, 厘米，1cm = 96px/2.54

- mm, 毫米，1mm = 1cm/10 = 96px/2.54/10

- in, 英寸, 1in = 2.54cm = 96px

- pc, 派卡，1pc = 12pt = 1in/6

- pt, 点，1pt = 1in/72

(2) **角度值**(数值 + 角度单位)

- deg，度，一个完整的圆是 360 deg

- grad, 百分度，角的测量单位， 一个完整的圆是 400 grad

- rad，弧度，弧长与半径之比，一个完整的圆是 2π 弧度, 大约是 6.2832rad, 1rad = 180 / π

- turn，圈数，一个完整的圆是 1turn, 1/4 圆是 0.25turn

(3) **颜色值**

- 颜色值关键字，颜色值的英文单词，比如: 'red', 'blue'等，目前共有 147 个，详细颜色值[戳这里](https://www.zhangxinxu.com/wordpress/2010/08/css3%e4%b8%8b%e7%9a%84147%e4%b8%aa%e9%a2%9c%e8%89%b2%e5%90%8d%e7%a7%b0%e5%8f%8a%e5%af%b9%e5%ba%94%e9%a2%9c%e8%89%b2%e5%80%bc/)

- transparent, 透明

- currentColor, 颜色变量, 当前的标签所继承的文字颜色

- RGB 颜色，语法包括：#RRGGBB[AA]，#RGB[A]，rgb[a](R, G, B[, A])以及rgb[a](R G B[ / A])

- HSL 颜色，语法包括：hsl[a](H, S, L[, A])，以及CSS Colors Level 4中新增的hsl[a](H S L[ / A])

(4) **百分比值**

相对于父辈元素对象计算占比

(5) **数值**

数值包括小数和整数，比如 `line-height: 1.2`

(6) **关键字**

比如 `border: solid` 中的 solid

(7) **函数值**

比如，`height: calc(100% - 20px)` 中的 "calc(100% - 20px)"

#### 3、选择器

(1) **类选择器**，形如: `.icon {}`

(2) **ID 选择器**, 形如: `#title{}`, 具有唯一性，不建议一个文档中多处用

(3) **属性选择器**, 形如: `[title~=hello] { color:red; }`，这个例子为包含指定值的 title 属性的所有元素设置颜色为红色

(4) **伪类选择器**, `selector : pseudo-class {property: value}`

(5) **伪元素选择器**, `selector:pseudo-element {property:value;}`

#### 4、关系选择器

(1) 后代选择器, 形如: `#yayunhui h1{}`, 该实例会对带有 'yayunhui' ID 的所有子元素 h1 应用样式

(2) 子元素选择器, 以 '>' 连接，形如: `#wrap>h1 {}`，该实例只会对带有 'wrap' ID 的直接子元素 h1 应用样式

(3) 兄弟选择器, 以 '~' 连接，形如: `.title~h1`，该实例会对带有 title 类的所有同级元素应用样式

(4) 相邻兄弟选择器,以 '+' 连接, 形如: `.title+h1`, 该实例只会对带有 title 类的相邻同级元素应用样式

### 三、CSS 中流与尺寸

#### 1、流与宽度

(1) 一个水平流上只能单独显示一个元素，多个块级元素换行显示

(2) 外部尺寸与流体特性

- 正常流下，块级元素宽度是容器的 100%，即充满容器

- 流动性，是一种 margin/border/padding 和 content 内容区域自动分配水平空间的机制

- 格式化宽度，仅出现在"绝对定位模型"中，对于非替换元素，当 left/top 或 top/bottom 对立方位的属性值同时存在的时候，元素的宽度表现为“格式化宽度”，其宽度大小相对于最近的具有定位特性(position 属性值不是 static)的祖先元素计算
 
(3) 内部尺寸与流体特性

- 内部尺寸，元素的尺寸由内部的元素决定，若元素无内容，宽度表现为 0

- 具有包裹性，自适应性，即，超过容器自动换行，inline-block 元素，浮动元素以及绝对定位元素都具有包裹性

#### 2、说说 width

(1) 默认值： auto

(2) 表现：

- 充分利用可用空间(fill-availiable),块级元素的默认宽度是父级容器的 100%

- 收缩与包裹(shrink-to-fit)，比如，浮动、绝对定位等

- 收缩到最小(min-content)，当每一列空间都不够时，文字能断就断

- 超出容器限制，默认的 width 设置，元素一般不会超出，除非设置了 white-space: noWrap 或者内容是很长的连续英文或数字

(3) 首选最小宽度

- 东亚文字最小宽度为每个汉字的宽度

- 西方文字最小宽度由特定的连续英文字符单元决定，一般以空格或者非英文字符作为分隔

- 类似图片这样的替换元素的最小宽度是该元素内容本身的宽度
 
(4) 最大宽度

若内部没有块级元素或块级元素未设定宽度，最大宽度是最大的连续内联盒子的宽度

(5) 设置 width 值的影响

- width 默认作用在 content box 上，设置 padding、margin 等会增大宽度

- 流动性丢失

- 表现不一致

(6) 宽度分离

- width 属性不与影响宽度的 padding/border 属性共存

- 方法：width 独占一层标签，padding、border 以及 margin 利用流动性在内部自适应

#### 3、改变 width/height 作用细节: box-sizing

(1) box-sizing，默认值：content-box

(2) box-sizing 设计的初衷：解决替换元素宽度自适应问题

```css
input,textarea,img,video,object {
  box-sizing: border-box
​}
```

#### 4、说说 height

(1) 父元素 height: auto，正常文档流下，子元素百分比值无效

(2) 解决方法

- 绝对定位

- 给父元素高度设置固定值

#### 5、min-width/max-width
 
(1) 适用场景：自适应布局/流体布局

(2) 屏幕自适应

```css
🌰.container {
min-width: 1200px;
max-width: 1400px;
​}
```

(3) 图片自适应

```css
🌰img {
max-width: 100%;
height: auto;
​}
```

(4) min-width/min-height 的初始值是 auto，max-width/max-height 的初始值是 none

(5) 会覆盖 width, 包括设置了 !important 的 width

(6) 二者冲突时， min-width 会覆盖 max-width

(7) 通过改变 max-height 值实现任意高度元素的展开收起动画效果，但是 max-height 值需要设置足够小的安全值，避免动画延迟
  
#### 6、CSS 中的盒子

(1) 块级盒子(block-level box)

(2) 内联盒子(inline-box)

内联盒模型

- 内容区域(content area)

- 内联盒子(inline box)，分为内联盒子和匿名内联盒子

- 行宽盒子(line box)

- 包含盒子(containing box)

- 标记盒子(marker box)

- 容器盒子(content-box, 宽高作用的盒子)，容器盒子里面又包含：content box、padding box、border box、margin box，这些称为内在盒子

(3) 内联元素，外部盒子是内联盒子

🌰button(默认值:inline-block)、img、表单控件等

### 四、盒尺寸

盒尺寸分为以下四种：content box、padding box、border box 以及 margin box，也就是上面提到的容器盒子中的内在盒子的尺寸

#### 1、替换元素

(1) 🎓是什么

通过修改某个属性值呈现内容可以被替换掉的元素

(2) 🎓替换元素有哪些

🌰img, object, video, ifram, texarea, input 等

(3) 🎓特性：

- 样式表现在 CSS 作用域之外，即内容上的外观不受页面上的 CSS 影响

- 有默认尺寸，🌰video/ifram/canvas(300px x 150px)，img(0)等

- 在很多 CSS 属性上有自己的一套表现规则，🌰vertical-align 的基线不是 baseline，而是下边缘
 
(4) 🎓替换元素在不同浏览器的 display 值可能会不一样

(5) 🎓尺寸计算规则

```md
📚相关概念
​
- 固有尺寸，即元素本身的尺寸，不可改变

- HTML 尺寸，只能通过 HTML 原生属性改变

- CSS 尺寸，可以通过 CSS 的 width 和 height 或者 max-width/min-width 和
max-height/min-height 设置的尺寸，对应盒尺寸中的 content box
```

- 若没有 CSS 尺寸和 HTML 尺寸，则使用固有尺寸作为最终宽高

- 若没有 CSS 尺寸，则使用 HTML 尺寸作为最终宽高

- 若没有 CSS 尺寸，则最终尺寸由 CSS 属性决定

- 若”固有尺寸“含有固有的宽高比例，同时仅设置了宽度或仅设置了高度，则元素依然按照固有的宽高比例显示

- 若上述条件都不符合，则宽高表现为默认宽高值的比
 
(6) 🎓替换元素不设置 src，表现为普通内联元素

基于伪元素的图片内容生成技术

- 图片不设置 src

- after 伪元素 content 设置为 attr(alt);

(7) 🎓content 属性

- content 属性生成的对象被称为"匿名替换元素"

- 📚实用技术: 

  - content 辅助元素生成
  
  - content 字符内容生成
  
  - content 图片生成(使用 url 显示图片)
  
  - content 计数器(counter-reset,counter-increment,counter(counter-reset),counters(name, string)，实现计数嵌套)
 
#### 2、padding

(1) 🎓默认模式下，使用 padding 会增加元素尺寸

(2) 🎓内联元素 padding 对视觉层和布局层具有双重影响
 
(3) 🎓属性值特性

- 百分比值相对于宽度计算

- 不支持负值

- ol/ul 列表内置 padding-left，单位是 px, 🌰Chrome 浏览器下是 40px

- 很多表单元素都内置 padding

(4) 📚运用

- 增加点击区域

- 实现管道符

- 实现一些图标,比如,双层圆环和三道杠

#### 3、border

(1) 🎓基本常识

- 不支持百分比值

- 关键字: thin(1px)、medium(3px)、thick(4px)

- 默认宽度 medium

(2) border-style

- 默认值：none

- 常用值：solid、dashed、dotted、double

- 重置边框性能高的方法

```css
🌰div{
  border: 1px solid;
  border-bottom: 0 none;
​}
```

(3) border-color

- 默认值：currentColor

(4) 📚运用

- 增加点击区域

- 利用 transparent 等特性生成三角形、梯形等图形

- 实现等高布局

#### 4、margin

1、📚margin 失效的情况

(1) display 计算值 inline 的非替换元素的垂直 margin

(2) 表格中的 tr 和 td 元素或设置 display 计算值是table-cell 或 table-row 的元素

(3) margin 合并时，更改 margin 值时

(4) 绝对定位元素非定位方位的 margin 值

(5) 定高容器的子元素 margin-bottom

(6) 定宽元素的子元素 margin-right

(7) 内联特性导致的 margin 无效

2、margin:auto 填充规则

(1) 如果一侧定值，一侧 auto，则 auto 为剩余空间大小

(2) 若两侧均是 auto，则平分剩余空间

3、margin 合并

(1) 🎓是什么

块级元素的 margin-top 和 margin-bottom 合并

(2) 🎓发生 margin 合并的场景

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

4、🔧运用

(1) margin 设置负值实现两端对齐

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

(3) 实现等高布局

```css
🌰.box { 
  overflow: hidden; 
} 
.left, .right { 
  margin-bottom: -9999px; 
  padding-bottom: 9999px; 
}
```
 
 

 
 

 
 
 
 
 
 
 
 
 
 

### 五、内联元素与流

#### 1、x-height

(1) 是什么: 指小写字母 x 的高度，术语描述就是基线和等分线(mean line)(也称作中线，midline)之间的距离

(2) 内联元素默认都是基线对齐的, 即 x-height/2

(3) ex: 实现不受字体和字号影响的内联元素的垂直居中对齐(1ex = x-height)

    ```css
    .icon-arrow { 
      display: inline-block; 
      width: 20px; 
      height: 1ex; 
      background: url(arrow.png) no-repeat center; }
    ```

#### 2、line-height

(1) 默认值：normal，支持数值、百分比值以及长度值

(2) 无论内联元素 line-height 如何设置，最终父级元素的高度都是由数值大的那个 line-height 决定的，称之为“内联元素 line-height 的大值特性

(4) 🔧运用

- 利用行距的上下等分机制，实现内联元素垂直居中

-  通过调整 line-height 实现多行文本垂直居中
 
#### 3、vertical-align

(1) 默认值是 baseline，即基线对齐(相对字母 x 的下边缘对齐)

(2) 属性值分类

- 线类，如 baseline(默认值)、top、middle、bottom

  - 一个 inline-block 元素，如果里面没有内联元素，或者 overflow 不是 visible，则该元素的基线就是其 margin 底边缘;否则其基线就是元素里面最后一行内联元素的基线。

  - vertial-align:top/bottom ，就是垂直上/下边缘对齐，具体定义如下:
  
    - 内联元素:元素底部和当前行框盒子的顶部/底部对齐

    - table-cell 元素:元素底 padding 边缘和表格行的顶部/底部对齐

  - vertial- align:middle

    - 内联元素:元素的垂直中心点和行框盒子基线往上 1/2 x-height 处对齐。(近似居中)

    - table-cell 元素:单元格填充盒子相对于外面的表格行居中对齐。

    - 如果想要实现真正意义上的垂直居中对齐，只要想办法让字符 x 的中心位置就是容器的垂直中心位置即可，通常的做法是设置 font-size:0

- 文本类，如 text-top、text-bottom

  - vertical-align:text-top:盒子的顶部和父级内容区域的顶部对齐
  
  - vertical-align:text-bottom:盒子的底部和父级内容区域的底部对齐。

  - 特点

    - 文本类属性值的垂直对齐与左右文字大小和高度都没有关系

    - 文本类属性值的垂直对齐可以像素级精确控制

- 上标下标类，如 sub、super

- 数值, 如 20px、2em

  - 根据计算值的不同，相对于基线往上或往下偏移，到底是往上还是往下取决于 vertical- align 的计算值是正值还是负值，如果是负值，往下偏移，如果是正值，往上偏移
 
- 百分比类，如 20%等

  - 相对于 line-height 的计算值计算的

(3) 有效的前提

- 只能应用于内联元素以及 display 值为 table-cell 的元素

- 对 table-cell 元素而言，vertical-align 起作用的是 table-cell元素自身

(4) 无效的情况

浮动和绝对定位使元素块状化

(5) 任意一个块级元素，里面若有图片，则块级元素高度基本上都要比图片的高度高

(6) 幽灵空白节点

- 产生原因：字母 x 往下的行高产生的多余的间隙

- 解决方法

  - 图片块状化。可以一口气干掉“幽灵空白节点”、line-height 和 vertical-align。

  - 容器 line-height 足够小。只要半行间距小到字母 x 的下边缘位置或者再往上，自然就没有了撑开底部间隙高度空间了。比方说，容器设置 line-height:0。

  - 容器 font-size 足够小。此方法要想生效，需要容器的 line-height 属性值和当前 font-size 相关，如 line-height:1.5 或者 line-height:150%之类;否则只会让下面的间隙变得更大，因为基线位置因字符 x 变小而往上升了。
  
  - 图片设置其他 vertical-align 属性值。间隙的产生原因之一就是基线对齐，所以我们设置 vertical-align 的值为 top、middle、bottom 中的任意一个都是可以的。

(7) 20px 图标对齐的处理技巧

- 图标高度和当前行高都是 20px。很多小图标背景合并工具都是图标宽高多大生成的CSS 宽高就是多大，这其实并不利于形成可以整站通用的 CSS 策略，建议图标原图先扩展成统一规格，比方说这里的 20px×20px，然后再进行合并，可以节约大量 CSS 以及对每个图标对齐进行不同处理的开发成本。

- 图标标签里面永远有字符。这个可以借助:before 或:after 伪元素生成一个空格字符轻松搞定。

- 图标 CSS 不使用 overflow:hidden 保证基线为里面字符的基线，但是要让里面潜在的字符不可见。

### 六、流的破坏与保护

#### 1、float

(1) 本质: 实现文字环绕效果
 
(2) 作用机制

- 破坏文档流

- 让父元素的高度塌陷

- 行框盒子区域限制

(3) 特性

- 包裹性

- 块状化并格式化上下文

- 破坏文档流

- 没有任何 margin 合并

(4) 流体布局

- 核心: 一侧定宽一侧自适应

- 问题： 纯浮动布局容错性差，容易出现比较严重的布局问题

#### 2、clear

(1) 目的：处理 float 属性带来的高度塌陷等问题

(2) 作用本质: 让自己不和 float 元素在一行显示

(3) 值

- none:默认值，左右浮动

- left: 去除左侧浮动
  
- right:去除右侧浮动

- both: 去除两遍浮动
 
(4) tips

- 块级元素才有效

- 借助伪元素清除浮动，需要配合 display 一起使用

- 只能在一定程度上消除浮动的影响
 
#### 3、BFC(block formatting context), 块级格式化上下文

(1) 作用

- BFC 元素，不发生 margin 重叠

- 可以用来清除浮动的影响

(2) 触发场景

- html 根元素

- float 的值不为 none;

- overflow 的值为 auto、scroll 或 hidden;

- display 的值为 table-cell、table-caption 和 inline-block 中的任何一个;

- position 的值不为 relative 和 static。

(3) 流体布局

- 自适应内容由于封闭而更健壮，容错性更强

- 自适应内容自动填满浮动以外区域，无须关心浮动元素宽度，可以整站大规模应用

#### 4、overflow

(1) 支持的属性

- visible:默认值

- hidden:剪裁

  - 剪裁界线是 border box 内边缘

  - 可以用于清除浮动

- scroll:滚动条区域一直在

- auto:不足以滚动时没有滚动条，可以滚动时滚动条出现
 
(2) tips

- 如果容器可滚动(假设是垂直滚动)，则 padding-bottom 也算在滚动尺寸之内

- 如果 overflow-x 和 overflow-y 属性中的一个值设置为 visible 而另外一个设置为 scroll、auto 或 hidden，则 visible 的样式表现会如同 auto

- 默认产生滚动条的标签: html、textarea

- 在 PC 端，无论是什么浏览器，默认滚动条均来自 html，而不是 body 标签

- 在PC端，窗体滚动高度可以使用 document.documentElement.scrollTop 获取，但是在移动端，可能就要使用 document.body.scrollTop 获取。

- 获取滚动条宽度的方式：width - document.getElementById("ele").clientWidth

(3) 自定义滚动条

- 整体部分，::-webkit-scrollbar

- 两端按钮，::-webkit-scrollbar-button

- 外层轨道，::-webkit-scrollbar-track

- 内层轨道，::-webkit-scrollbar-track-piece

- 滚动滑块，::-webkit-scrollbar-thumb

- 边角，::-webkit-scrollbar-corner
 
(4) 依赖 overflow 的样式效果: text-overflow:ellipsis 实现单行文字超出显示 ……
  
 
 
 
 