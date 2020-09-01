---
title: CSS 小技巧
comments: true
date: 2020-08-31 15:02:22
categories: web
tags: css
toc: true
description: 本文收录日常开发中一些 css 小技巧，包括文本处理、导航栏样式等。
---

### 一、文本末尾添加省略号

有时候需要控制文本不折行, 并且以 "....", 代替超出的文本部分,也就是相当于 more 功能, 用 css 实现方式如下:

```CSS
/* 单行文本 */
.noWrap{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* 多行文本 */
.noWrap {
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5em;
  max-height: 3em;
}
```

以上 css 代码中主要用到了 csss3 的一些特性, 除了以上代码,注意给个宽度, 不然不知道什么时候需要用"..."代替文本, 更多相关内容可以查看 w3c 文档。

### 二、导航栏位置固定

```css
position: fixed;
overflow: hidden;
background: #fff;
z-index: 50;
```

fixed 定位, 固定元素位置, 超出部分隐藏, 给背景颜色是因为内容是往上滑的,会跟导航栏有重叠部分, 设置 z-index 也是为了处理内容重叠的问题。

### 三、隐藏浏览器默认滚动条：

```css
::-webkit-scrollbar {
  display: none;
}
```

### 四、鼠标移动到某个元素，显示列表，重点是列表跟该元素同级，若不同级就比较烧脑了，就算用 js 也不好控制

结构：

```html
<div class="wrap">
  <span>鼠标移动到我，显示列表</span>
  <ul>
    <li></li>
  </ul>
</div>
```

样式：

```css
wrap {
  ul {
    list-style: none;
    display: none;
  }
  &:hover {
    ul {
      display: block;
    }
  }
}
```

### 五、Android 端阴影

Android 端，img 和 button，点击之后出现一块阴影区域，一开始以为是 user-select 作怪，设置为 none 无果，后来发现是 curser：pointer 的锅，在 Android 端 cursor 设置为 none，即可解决问题

### 六、导航条样式操作

```css
/* The emerging W3C standard
that is currently Firefox-only */
* {
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: orange;
}
*::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 20px;
  border: 3px solid orange;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(14, 77, 136);
}
```

### 七、图片自适应：

```css
img {
  max-width: 100%;
  max-height: 100%;
}
```

### 八、网页适应大屏幕和小屏幕的方案：

```css
html,
body {
  max-width: 1400px;
  min-width: 1200px;
}
```

### 九、利用 max-height 实现展开、收起效果:

```css
.element {
  max-height: 0;
}
.element:hover {
  max-height: 700px;
  transition: ease 0.25s;
}
```

### 十、利用 content 属性设置序号

```css
.reset {
  padding-left: 20px;
  counter-reset: wangxiaoer;
}
.counter:before {
  content: counters(wangxiaoer, "-") ". ";
  counter-increment: wangxiaoer;
}
```

### 十一、管道符号：

```css
a + a:before {
  content: "";
  padding: 10px 3px 1px;
  margin-left: 6px;
  border-left: 1px solid gray;
}
```

### 十二、flex 布局最后一行左对齐

用 flex 布局一时爽，但是里面还是有些坑需要避一避的。比如说想要有间隔的布局，但是用 space-around 和 space-between 都会有一个瑕疵，那就是，最后一行并不是左对齐的，有人会说用 aligh-content，交叉轴对其啊，但是 jusfy-content 需要 flex-start 才能做到这种效果，这样子的话，就没有居中效果了，因此，只能另辟蹊径。我采用的方法比较笨拙，就是在最后一个块级元素的后面，加多两个空的等宽的块级元素，高度设置为 0，完美实现想要的效果。

### 十三、文本模糊效果

```css
.blurry {
  color: transparent;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
```

### 十四、自定义文本选中样式

```css
.element::selection {
  color: #fff;
  background-color: orange;
}
.element::-moz-selection {
  color: #fff;
  background-color: orange;
}
```

### 十五、页面右上角贴纸

```css
.ribbon {
  position: absolute;
  right: -50px;
  top: 40px;
  background-color: rgb(226, 160, 17);
  overflow: hidden;
  white-space: nowrap;
  box-shadow: 0 0 10px rgb(82, 72, 72);
  transform: rotate(45deg);
}

.ribbon a {
  display: block;
  border: 1px solid #faa;
  color: #fff;
  font: bold 81.25% "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 1px 0;
  padding: 10px 50px;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 0 5px #444;
}
```

### 十六、input placeholder 样式修改

```css
 input::-webkit-input-placeholder {
    color: orange;
    background-color: #f9f7f7;
    font-size: 14px;
  }
  input::-moz-input-placeholder {
    color: orange;
    background-color: #f9f7f7;
    font-size: 14px;
  }
  input::-ms-input-placeholder {
    color: orange;
    background-color: #f9f7f7;
    font-size: 14px;
  }
```

### 十七、移除常用标签默认的 margin 和 padding

```css
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
dl,
dd,
ul,
ol,
th,
td,
button,
figure,
input,
textarea,
form {
  margin: 0;
  padding: 0;
}
```

### 十八、部分元素继承父元素样式并取消 outline

```css
a,
h1,
h2,
h3,
h4,
h5,
h6,
input,
select,
button,
option,
textarea,
optgroup {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-style: inherit;
  line-height: inherit;
  color: inherit;
  outline: none;
}
```
