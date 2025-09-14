---
title: git域名配置
date: 2017-05-09 16:58:31
categories: 工程化与运维
tags: 开发工具
comments: true
---

git 域名配置

<!--more-->

1. 在 Godaddy 购买的域名；

2. 查找 DNSpod 解析域名，没什么难度，就是添加一条记录，保存而已，记得在添加域名到 DNSpod 之后，复制两个 NS 地址到 godaddy 的域名服务器下；

3. Git 项目根目录下创建 CNAME 文件，把域名填进去，push 就行了。
