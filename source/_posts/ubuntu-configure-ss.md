---
title: ubuntu 下配置ss
description: '配置 ubuntu 下 ss 时需注意安装正确包并手动设置网络代理，确保 json 配置文件格式正确。'
date: 2018-05-27 09:49:30
categories: 工程化与运维
tags: 系统设计
comments: true
---

ubuntu 下配置 ss 步骤

<!--more-->

1. pip install shadowshocks

2. 创建 json 文件，内容如下：

```
    {
    "server":"ip",
    "server_port":3002,
    "local_port":1080,
    "password":"psd",
    "timeout":600,
    "method":"加密方法"
    }
```

3. 系统设置>>网络设置>>网络代理>>手动，填写 socks 主机和端口信息：127.0.0.1：1080

4. sslocal -c /home/canace/文档/ss.json 开启全局 ss
