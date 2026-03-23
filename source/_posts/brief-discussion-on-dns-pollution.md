---
title: 浅谈 DNS 污染
categories: 编程基础
tags: 计算机科学
description: 'DNS 污染导致域名解析错误，可用 nslookup 检测，改 host 或换 HTTPS 可尝试解决。'
author: Canace
comments: true
date: 2023-12-03 22:41:30
toc: true
---
## 什么是 DNS 污染

说到 DNS 污染，作为程序的我第一想到的就是 github 又连不上了，网上一搜，csdn等国内网站清一色的让改 host。那么为什么要让改 host 呢？因为 github 域名可能被污染了，域名解析返回的 IP 可能是错误的，需要指回正确的 IP，我们才能正常打开。我们怎么判断要打开的域名可能被污染了呢？可以使用 nslookup 命令行工具，查询要访问域名和对应域名解析服务器返回的 IP，看一下是不是正常的地址。如果跟我们平常使用的 IP 相去甚远，可能是伪造的 IP。

```
nslookup domain [dns-server(ex:114.114.114.114/8.8.8.8)] 
```

## 如何解决 DNS 污染问题

要解决 DNS 污染问题，上面我们提到了，出现的原因是域名解析返回的 IP 错了，可以通过改 host 文件的方法，打开正确的 IP。还有一种情况是我们访问的是未经加密传输的 http 地址，可能被误伤了，也会拿到错误的 IP，这种情况下可以试试用 https 地址访问。如若上面的方式都不行，可能打不开网页的原因不是 DNS 污染了，有可能 IP 被加入了 GFW 的黑名单。

```
获取可用 ip

打开 host 文件
sudo vi /etc/hosts

修改 github 域名指向的 ip
140.82.112.4    github.com
```

参考文献:

[浅谈HTTP劫持、DNS污染的影响及解决办法](https://github.com/hoochanlon/fq-book/blob/master/docs/doub/6t3mypbm-5.md)

[深入理解GFW：DNS 污染](https://gfwrev.blogspot.com/2009/11/gfwdns.html)