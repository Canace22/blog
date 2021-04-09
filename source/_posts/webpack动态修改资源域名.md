---
title: webpack 动态修改资源域名
categories: web
tags: 工作总结
description: webpack 动态修改资源域名方法分享
comments: true
date: 2021-04-09 17:15:37
---
昨天同事接到一个比较奇葩的需求，要他把互动课堂展示的页面，静态资源域名改为 localhost:8080, 平板端则改为 teacherIp。同事跑来问我，我就想到有动态更改 CDN 的需求，没听过这种需求，觉得很奇葩，让他问问能不能 APP 拦截去修改，答约不能，没有解决他们那边的问题。好吧，那就看看咯，stackoverflow 有回答说用 __webpack_public_path__ 可以，然后国内网友又说不能先设置 publicPath 才能改成功，这种方法对 css 资源无效 blabla 的，小伙子实践了一通，也发现不行。