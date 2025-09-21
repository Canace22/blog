---
title: 解决 github dns 污染问题
categories: 编程基础
tags: 计算机科学
comments: true
date: 2021-05-22 09:17:08
---
最近 github 老是抽风，打不开，排查了一番，发现电脑端开启代理的 pac 模式就会出现这个问题，全局模式和不开代理是没问题的。手机端连了公司的 wifi 会打不开，不连 wifi 打得开，目测是 dns 被污染了。

解决方法就是去网上用[ ping 工具 ](https://www.ipaddress.com/)ping 一下 github 域名，看看哪些能用，然后在本地再 ping 一下，ok 的话就去 host 文件里面配置一下 github 的 ip 为刚刚测试的可用 ip。如果还是不行看看抓包一下，看看请求的哪几个域名失败嘞，重复以上步骤。

操作步骤如下：

```
获取可用 ip

打开 host 文件
sudo vi /etc/hosts

修改 github 域名指向的 ip
140.82.112.4    github.com
```