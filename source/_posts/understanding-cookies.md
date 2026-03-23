---
title: 认识 Cookie
categories: 编程基础
tags: 计算机科学
description: 'Cookie 用于保存用户状态和个性化信息，需注意安全设置避免被窃取或滥用。'
comments: true
toc: true
date: 2021-03-25 11:15:26
---
## 一、是什么

Cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，在浏览器下次向同一服务器再发起请求时，该段数据会被携带并发送到服务器。

## 二、作用

- **会话状态管理**, 如用户登录状态、购物车、游戏分数或其它需要记录的信息

- **个性化设置**, 如用户自定义设置、主题等

- **浏览器行为跟踪**,如跟踪分析用户行为等


## 三、创建 Cookie 的方式

服务器响应头部加上`Set-Cookie: name=value`，浏览器请求时为 header 加上 `Cookie: name=value`

## 四、分类

根据周期划分类别：

- **会话期 Cookie**，仅在浏览器会话期间有效

- **持久性 Cookie**，取决于过期时间（Expires）或有效期（Max-Age）

## 五、Cookie 有哪些安全问题，如何防范

1、**会话劫持**

- 用户进行身份验证时，重新生成并重新发送会话 Cookie
    
- 设置 Secure 属性，Cookie 不携带敏感信息

2、**跨站脚本攻击（XSS）**，限制访问 Cookie，设置 HttpOnly, 防止通过 JavaScript 访问 cookie 值

3、**跨站请求伪造（CSRF）**

- 设置 SameSite 属性，不发送跨站请求

- 携带敏感信息的 Cookie 设置短的生命周期

4、**深度防御措施**：设置 Cookie 前缀

## 六、相关规定

- 向用户申明使用了第三方 Cookie

- 允许用户选择不接收某些或所有 cookie。

- 允许用户在不接收 Cookie 的情况下使用大部分服务

参考文献：

[Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
