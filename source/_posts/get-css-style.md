---
title: 获取 DOM style 的正确姿势
categories: Web开发
tags: [前端, CSS与可视化]
description: 获取 DOM style 的正确姿势
author: Canace
comments: true
date: 2022-06-22 10:20:29
---
今天在写一个很简单的 demo 时发现获取 dom.style.width 一直都是空的，打印 dom.style 里面设置的其他属性也都是空的，这就很玄学了。明明设置了几个 css 属性，怎么拿到的全是空呢？先来看看我的 demo:

```html
<style type="text/css">
  body {
    margin: 0;
  }
  #status {
    width: 10px;
    height: 10px;
    background: orange;
  }
</style>

<div id="status"></div>
```

```js
function updateProgress () {
  var div = document.getElementById("status");
  console.log(div.style.width)
  var width = +div.style.width.replace('px','')
  div.style.width = width + 5 + "px";
  if (width < window.innerWidth) {
    requestAnimationFrame(updateProgress);
  }
}
requestAnimationFrame(updateProgress);
```

上面的例子，第一次打印的是个空，说明第一次是没有获取到 width 值的，第二次之后能打印到数据，这其中有什么差异呢？demo 中可以看到我的 css 样式写在了 style 标签里面，进了函数之后直接设置为了行内样式，这就是二者的区别。这里引用一下 MDN 的描述

> The HTMLElement.style property is not useful for completely learning about the styles applied on the element, since it represents only the CSS declarations set in the element's inline style attribute, not those that come from style rules elsewhere, such as style rules in the section, or external style sheets. To get the values of all CSS properties for an element you should use Window.getComputedStyle() instead.

上面的意思就是 HTMLElement.style 并没有写入我们设置的所有 css 属性，只写入了行内 css 属性，要获取其他地方的属性可以使用 Window.getComputedStyle() 方法，下面来改进一下 demo

```js
function updateProgress () {
  var div = document.getElementById("status");
  console.log(window.getComputedStyle(div).width);
  var width = +window.getComputedStyle(div).width.replace('px','')
  div.style.width = width + 5 + "px";
  if (width < window.innerWidth) {
    requestAnimationFrame(updateProgress);
  }
}
requestAnimationFrame(updateProgress);
```