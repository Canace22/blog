---
title: Web 安全概述
categories: web
tags: web安全
toc: true
comments: true
date: 2020-08-17 09:38:42
---
### 一、是什么

防止网站受到未授权的访问、使用、修改或者破坏

### 二、常见 Web 安全问题

1、XSS(Cross-site scripting) 攻击

(1) 是什么

XSS 是一个用来描述一类攻击的术语，它允许攻击者通过网站将客户端脚本注入到其他用户的浏览器中

(2) 分类：

- 反射型 XSS 攻击, 传递给服务器的用户数据被立即返回并在浏览器中原样显示时发生

- 持久型 XSS 攻击,  存储在站点中的恶意脚本在用户不知情的情况下执行，再原样地返回给其他用户

(3) 防范方法

删除或禁用任何可能包含可运行代码指令的标记

2、SQL 注入

(1) 是什么

恶意用户通过脚本，能够在数据库上执行任意SQL代码，从而允许访问、修改或删除数据

(2) 发生场景

传递给底层SQL语句的用户输入可以修改该语句的语义

3、CSRF (Cross-site request forgery)

(1) 是什么

恶意用户通过表单等手段，窃取用户的身份信息，在另一个用户不知情的情况下利用其身份信息执行操作

(2) 防范方法

服务器端要求每个 POST 请求都包含一个用户特定的由站点生成的密钥


### 三、常见 Web 安全策略

1、内容安全策略(CSP)

(1) 是什么

一个安全层，用于检测并削弱某些特定类型的攻击，比如, 跨站脚本 (XSS) 和数据注入攻击等

(2)怎么做

- 客户端, 头部加上 http-equiv="Content-Security-Policy", 并添加相应的策略描述， 比如这样

  ```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
  ```

- 服务端, 返回数据时，http 头部加上 Content-Security-Policy

2、通信安全策略

(1) 传输层安全协议(TSL)

(2) HTTPS

参考文档：

[内容安全策略( CSP )](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

[Website security](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security)