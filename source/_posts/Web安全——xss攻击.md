---
title: Web安全 —— XSS攻击
categories: web
tags: web安全
description: XSS 是比较古老的 web 安全攻击，本文将讲述 XSS 攻击是什么，有哪些类型以及如何进行 XSS 攻击
comments: true
toc: true
date: 2021-03-17 11:15:17
---
## 一、是什么

XSS(Cross-site scripting) 是一个用来描述一类攻击的术语，它允许攻击者通过网站将客户端脚本注入到其他用户的浏览器中，从而获取用户的 cookie 等信息，盗取用户的钱财或隐私。比如在评论框中输入一段 js 脚本，若该内容未被处理就传给服务端，然后直接显示到页面上，可能就会触发 xss 攻击。

XSS 的作用机制是恶意代码未经过滤，与网站正常的代码混在一起，浏览器无法分辨哪些脚本是可信的，恶意脚本可以被执行。

## 二、分类

### 反射型 XSS 攻击

传递给服务器的用户数据被立即返回并在浏览器中原样显示时发生，这种攻击一般是一次性的。

### 持久型 XSS 攻击

存储在站点中的恶意脚本在用户不知情的情况下执行，再原样地返回给其他用户，这种攻击由于脚本会被服务端存到数据库，以字符串的形式拼接到 html 中，所以是持久的，危害比较大。

## 三、XSS 攻击示例

### 1、如何攻击直接使用浏览器输入字符串的网页

规则是下面这样，对这个实例进行攻击，让浏览器执行 `prompt(1)`

```js
function escape(input) {
  // warm up
  // script should be executed without user interaction
  return '<input type="text" value="' + input + '">';
}
```

上面的实例很简单，拿到什么就输出什么，未做任何处理，所以可以直接写一段脚本:

```html
"><script>prompt(1);</script>
```

由于实例是直接把输入值拼接到 value 属性中的，所以可以先用 `">` 闭合掉属性和标签，然后写入我们的脚本，就可以正常执行了。

### 2、网页对输入框字符串做了闭合标签筛选，并且直接使用筛选完的字符串，如何进行攻击

第二关比较费点脑子，加了个过滤规则，遇到闭合的尖括号就把内容替换为空，也就是上面这种直接写 script 标签的方法行不通了

```js
function escape(input) {
  // tags stripping mechanism from ExtJS library
  // Ext.util.Format.stripTags
  var stripTagsRE = /<\/?[^>]+>/gi;
  input = input.replace(stripTagsRE, '');

  return '<article>' + input + '</article>';
}
```

既然在 script 标签里行不通，那么可以把脚本写在事件里面，比如这样

```html
<img src=# onerror="prompt(1)"
```

以上代码即使不匹配尖括号也能执行，src 引用的图片不存在就会执行 onerror 事件

```html
<body onload="prompt(1)//"
```

当页面加载完所有的 dom 就会执行 onload，所以上面的代码也能执行

## 四、防范方法

- 针对使用标签注入代码问题，进行 HTML 转义输入值，比如使用 escapeHTML 转义
- 针对链接跳转，建一个白名单，进行内容校验，比如禁止以白名单中的包含值开头`['http','https','scheme','javascript:',location.href="xxx"]`
- 前后端分离
- CSP
- 输入内容长度控制
- HTTP-only Cookie
- 验证码

参考文档：

[Website security](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security)

[如何防止 XSS 攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)

[prompt(1) to win](http://prompt.ml/0)

[alert(1) to win](https://alf.nu/alert1)

[XSS game](https://xss-game.appspot.com/)