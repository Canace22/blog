---
title: SSH 端口号修改
categories: 工程化与运维
description: 搬瓦工 ssh端口号修改的方法
comments: true
date: 2019-11-21 10:18:12
---

1、登录[搬瓦工](https://bwh88.net/)

2、打开我的服务器，打开 root shell interactive

3、输入 `vim /etc/ssh/sshd_config`

4、点击 i 键，i 修改 Port 值

5、esc => :wq 保存

6、 reboot 重启服务器

至此，ssh 端口恢复
