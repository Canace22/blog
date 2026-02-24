---
title: web 安全——CSRF
categories: 编程基础
tags: 计算机科学
description: 'CSRF 攻击利用用户已认证身份发送恶意请求，防范需结合 token 校验和 cookie 设置。'
comments: true
toc: true
date: 2021-04-22 10:03:52
---
## 一、是什么

CSRF (Cross-Site Request Forgery)，是一种伪装成受信任用户给网站发送恶意请求的 web 攻击方式。比如下面这个例子

```html
<img src="https://www.example.com/index.php?action=delete&id=123">
```

上述例子由于用户对于 [https://www.example.com](https://www.example.com) 已经是受信任的用户，点击图片发送一些恶意请求给服务器是不会再次进行校验的，因此利用这个漏洞，攻击者可以执行一些操作，使自己受益。

CSRF 产生原因：浏览器发起请求会默认带上包括会话 cookie 在内的所有的 cookie，因此，若用户已经受信任于某个网站，该网站是无法去区分请求是伪装用户发出的，还是真实用户发出的。

## 二、CSRF 攻击的影响

攻击者可以任意操作受信任网页，比如修改用户登录密码，使用用户账户进行购物等

## 三、防范 CSRF 攻击的方法

1. 确认一下使用的框架有自带的 CSRF 防御机制，有的话就直接使用
2. cookie 设置 SameSite 属性，不发送跨站请求
3. 使用常规的请求头部
4. 校验请求头部的 origin 值
5. 使用双重认证 cookie，这种方式的实现大概是浏览器发起请求时，除了cookie携带身份之外，请求参数也需要携带身份信息，服务端会校验这两个值是否相等，相等则身份受信任
6. 对于涉及敏感信息的交互，可以使用以下方法进行防范
    - 重新认证
    - 使用一次性 token
    - 使用验证码进行校验
7. XSS 攻击的防范策略也适用于 CSRF
8. 改变状态的请求不使用 get 方法

参考资源：

[Cross-Site Request Forgery Prevention Cheat Sheet]([https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html]