---
title: table-cell等分
comments: true
date: 2019-03-20 10:43:51
categories: Web开发
tags: [前端,CSS与可视化 ]
---

table 里面的元素等分，是经常遇到的需求，一般都会想所有宽度设为相同的应该就等分了，但是然并卵，今天就遇到了这种坑，就算设了宽度一致，还是没有等分，场景是这样的，一个 tr 里面第一个 th 的宽度跟其他不一样，table 宽度为 100%，最后实现等分的方法如下：

<!--more-->

```scss
table {
  width: 100%;
  height: 100%;
  position: relative;
  display: table;
  table-layout: fixed;
  th,
  td {
    padding: 10px;
    border: solid 1px #d9d9d9;
    background-color: #f7f9fa;
    text-align: center;
    display: table-cell;
    width: 2%;
  }
}
```

从上面的例子不难看出，实现等分的秘诀就在于设置了 `display: table; table-layout: fixed;` 和 `display: table-cell; width: 2%;`
