---
title: 修改滚动条样式的兼容写法
categories: Web开发
tags: CSS与可视化
comments: true
date: 2021-06-15 15:50:12
---

滚动条样式在火狐、ie、chrome 等浏览器的样式是不一致的，工作中我们经常需要根据自己的需要定制滚动条，这里给出一个兼容的写法

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
