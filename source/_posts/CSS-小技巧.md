---
title: CSS 小技巧
comments: true
date: 2018-07-29 16:08:22
categories: web
tags: css
---

本文收录日常开发中一些 css 小技巧，包括文本处理、导航栏样式等。

<!--more-->

1、文本不折行

有时候需要控制文本不折行, 并且以 "....", 代替超出的文本部分,也就是相当于 more 功能, 用 css 实现方式如下:

```CSS
.noWrap{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

```

以上 css 代码中主要用到了 csss3 的一些特性, 除了以上代码,注意给个宽度, 不然不知道什么时候需要用"..."代替文本, 更多相关内容可以查看 w3c 文档。

2、导航栏位置固定

```css
position: fixed;
overflow: hidden;
background: #fff;
z-index: 50;
```

fixed 定位, 固定元素位置, 超出部分隐藏, 给背景颜色是因为内容是往上滑的,会跟导航栏有重叠部分, 设置 z-index 也是为了处理内容重叠的问题。

3、隐藏浏览器默认滚动条：

```css
::-webkit-scrollbar {
  display: none;
}
```

4、鼠标移动到某个元素，显示列表，重点是列表跟该元素同级，若不同级就比较烧脑了，就算用 js 也不好控制

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

5、Android 端，img 和 button，点击之后出现一块阴影区域，一开始以为是 user-select 作怪，设置为 none 无果，后来发现是 curser：pointer 的锅，在 Android 端 cursor 设置为 none，即可解决问题

6、导航条样式操作

```css
// 自定义导航条
/* width */
::-webkit-scrollbar {
  width: 8px;
  height: 16px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  height: 10px;
  background-color: #d9d9d9;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(14, 77, 136);
}
```

7、图片自适应：

```css
img {
  max-width: 100%;
  height: auto !important;
}
```

8、网页适应大屏幕和小屏幕的方案：

```css
html,
body {
  max-width: 1400px;
  min-width: 1200px;
}
```

9、利用 max-height 实现展开、收起效果:

```css
.element {
  max-height: 0;
}
.element:hover {
  max-height: 700px;
  transition: ease 0.25s;
}
```

10、利用 content 属性设置序号

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

11、管道符号：

```css
a + a:before {
  content: "";
  padding: 10px 3px 1px;
  margin-left: 6px;
  border-left: 1px solid gray;
}
```

12、flex 布局最后一行左对齐

用 flex 布局一时爽，一直爽，但是里面还是有些坑需要避一避的。比如说想要有间隔的布局，但是用 space-around 和 space-between 都会有一个瑕疵，那就是，最后一行并不是左对齐的，有人会说用 aligh-content，交叉轴对其啊，但是 jusfy-content 需要 flex-start 才能做到这种效果，这样子的话，就没有居中效果了，因此，只能另辟蹊径。我采用的方法比较笨拙，就是在最后一个块级元素的后面，加多两个空的等宽的块级元素，高度设置为 0，完美实现想要的效果。
