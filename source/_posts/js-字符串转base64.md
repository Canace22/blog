---
title: Js 字符串转 base64
categories: Web开发
tags: JavaScript
comments: true
date: 2021-04-23 13:56:12
---
最近想把字符串转换成 base64，不想用库，搜了下浏览器环境下 js 原生就支持字符串跟 base64 的相互转换，看看 demo:

```js
// 加密
var a = btoa('canace22@qq.com') 
// 解密
var b = atob(a)
console.log(a)  // Y2FuYWNlMjJAcXEuY29t
console.log(b)  // canace22@qq.com
```

上面的 demo 可以看到 window 对象有两个 base64 相关的方法: atob 和 btoa，分别用于解密和加密。这里的加密只能加密可以转为 ACII 的字符，那如果要加密其他的unicode字符的话，就需要做一层转义

```js
// 加密
var a = btoa(encodeURIComponent('万水千山总是情！')) 
// 解密
var b = decodeURIComponent(atob(a))
console.log(a)  // JUU0JUI4JTg3JUU2JUIwJUI0JUU1JThEJTgzJUU1JUIxJUIxJUU2JTgwJUJCJUU2JTk4JUFGJUU2JTgzJTg1JUVGJUJDJTgx
console.log(b)  // 万水千山总是情！
```