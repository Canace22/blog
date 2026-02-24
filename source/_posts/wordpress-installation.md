---
title: wordpress安装
date: 2018-05-20 16:58:59
categories: 网站建设
tags: 开发工具
---

[原文链接：](https://codex.wordpress.org/zh-cn:%E5%AE%89%E8%A3%85_WordPress#.E6.AD.A5.E9.AA.A43:.E8.AE.BE.E7.BD.AEwp-config.php)

1. 下载并解压缩 WordPress 程序安装包

2. 在你的网页服务器上为 WordPress 创建一个数据库, 并且创建一个 MySQL 拥有所有权限可以进入和修改的用户

3. 重命名 wp-config-sample.php 文件为 wp-config.php

4. 把 WordPress 文件夹放在你服务器上想要放的地方:

(1) 如果你想把通过顶级域名来访问你的 WordPress 博客 (例如 http://example.com/),移动或上传所有解压后的 WordPress 文件夹里面的文件(但不包括 WordPress 文件夹本身) 到你服务器的根目录下.

(2) 如果你想通过子域名来访问你的博客(例如 http://example.com/blog/), 将 wordpress 重命名为你想要的子目录名称， 接着上传至你的网站服务器。 例如，你想让 WordPress 安装在子目录"blog"中，你就应该将"wordpress"这个文件夹重命名为"blog"，接着上传至你的网站服务器的根目录中。

5. 在你喜欢的浏览器中访问 wp-admin/install.php 以便启动安装程序.

(1) 如果你在根目录下安装 WordPress,，你应该访问: http://example.com/wp-admin/install.php

(2) 如果你将 WordPress 安装在子目录 blog 下，你应该访问: http://example.com/blog/wp-admin/install.php
