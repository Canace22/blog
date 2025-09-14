---
title:  字符串与代码的严谨性
categories: Web开发
tags: JavaScript&TypeScript
description: 忏悔下工作中遇到的问题
author: Canace
comments: true
date: 2022-08-19 14:12:25
---
工作中有这么一段代码

```js
if(params.url.includes('/v3')){
  url = 'a'
}else if(params.url.includes('/app')){
  url = 'b'
} else {
  url = 'c'
}
```

这段根据 api 判断请求地址的写法，乍一看好像没什么问题,api 可以保证后面不会出现这些字符串，但是加密之后呢？加密字符串是可能出现这些字符的, get 请求的 url 也会带上这些字符，后果就是请求错误的地址，导致前后端找半天。

由此可见，在使用字符串做判断时，一定要保证字符串的安全性，不然逻辑不严谨，会出现莫名其妙的难以排查的问题。