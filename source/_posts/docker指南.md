---
title: docker指南
categories: web
tags: docker
description: docker 在前端自动化部署中经常用到，平常都是别人配置好的，只其所以不知其然，自己走一遍，做个笔记
comments: true
date: 2020-07-11 17:04:49
---
### 一、docker 环境配置

#### 1、下载

(1) mac，下载完之后安装即可

- 下载: [地址](https://hub.docker.com/editions/community/docker-ce-desktop-mac/)
- 创建容器：`docker run -dp 80:80 docker/getting-started`

(2) linux
  
- 设置源
  
    ```bash
    # 设置源
    sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    ```
- 安装

    ```bash
    yum list docker
    yum -y install docker
    docker -v
    ```

### 2、操作

安装 linux 版一直没成功，未完待续……