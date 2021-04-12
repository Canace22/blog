---
title: webpack 动态修改资源域名
categories: web
tags: 工作总结
description: webpack 动态修改资源域名方法分享
comments: true
date: 2021-04-09 17:15:37
---

昨天同事接到一个比较奇葩的需求，要他把某个展示的页面，静态资源域名改为 localhost:8080, 平板端则改为 teacherIp。同事跑来问我，我就想到有动态更改 CDN 的需求，没听过这种需求，觉得很奇葩，让他问问能不能 APP 那边做拦截修改，答约不能，没有解决他们那边的问题。好吧，那就看看咯，stackoverflow 有回答说用 **webpack_public_path** 可以，然后国内网友又说不能先设置 publicPath 才能改成功，这种方法对 css 资源无效 blabla 的，小伙子实践了一通，也发现不行。

## 一、项目背景

项目的静态资源原本有两套逻辑，web 端和安卓端是在编译完后上传到七牛，使用七牛资源，pc 客户端则是使用本地资源。所以原来的静态资源要么是 './'，要么是七牛地址。目前的需求是要在项目中去动态切换静态资源地址，即需要在编译完成后去做地址切换，然后客户端做一层代理映射到对应资源。

## 二、解决方案

原有代码不动，还是该上传到七牛就上传，不上传就用本地资源。webpack 文档中有以下描述:

> webpack 暴露了一个名为 __webpack_public_path__ 的全局变量。所以在应用程序的 entry point 中，可以直接如下设置：

`__webpack_public_path__ = process.env.ASSET_PATH;`

参考上述文档描述，可以在 main 文件中加入以下切换路由的代码

```js
const query = location.href.split('&');

let params = {};
for (let i = 1; i < query.length; i++) {
  let pair = query[i].split('=');
  params[pair[0]] = pair[1];
}
if (params.teacherIp == 'localhost') {
  __webpack_public_path__ = 'http://localhost:8080/';
} else if (params.teacherIp) {
  __webpack_public_path__ = `http://${teacherIp}/`;
}
```

这样写会先加载七牛资源，符合条件的话，资源路径会被替换，重新加载新的资源，实现了上述需求。但是这意味着资源都会被加载两次，并不是最优解。
