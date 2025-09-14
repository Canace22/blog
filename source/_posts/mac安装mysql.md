---
title: mac 安装 mysql
comments: true
date: 2019-11-13 08:42:51
categories: Web开发
tags: [后端,API&服务]
---

mac mysql 安装和使用的基本步骤

<!--more-->

### 安装

1、[下载](https://dev.mysql.com/downloads/mysql/)

2、一路 next 之后，安装完成，会看到系统偏好栏多了一个 mysql 图标，点击可以进行一些基本的设置，也可以控制数据库的开关

### 配置环境变量

1、执行命令：`PATH="$PATH":/usr/local/mysql/bin`，配置环境变量

2、登录 mysql：`mysql -u root -p`

3、查看数据库：`show databases;`

### 安装数据库图形化工具 Navicat

这里有可能会连接失败，使用 mysql 支持的加密方式改一下密码就好，比如：`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<psd>';`
