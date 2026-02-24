---
title: Windows 奇技淫巧
description: '查看端口占用用 netstat 和 findstr 快速定位进程别忘了加参数。'
categories: 工程化与运维
tags: 系统设计
comments: true
date: 2020-12-04 09:59:51
---
## 查看端口占用情况

1、 `win + R` => "cmd" 打开命令窗口

2、查看所有被占用的端口: `netstat -anon`

3、查找占用端口的进程: `netstat -anon | findstr "10001"`

