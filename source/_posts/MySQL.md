---
title: centos7 安装 MySQL
comments: true
date: 2019-03-09 18:58:56
categories: 系统
tags: mysql
---

centos7 安装 MySQL

<!--more-->

### 系统环境

```
centOS7 64位
```

### 部署过程

1. 添加 mysql yum 源：

   ```
   rpm -Uvh https://repo.mysql.com//mysql80-community-release-el7-2.noarch.rpm
   ```

2. 查看 yum 源中所有 Mysql 版本：

   ```
   yum repolist all | grep mysql
   ```

3. 禁用其他版本：

   ```
   yum-config-manager --disable mysql80-community
   ```

4. 启用要安装的版本 mysql5.7

   ```
   yum-config-manager --enable mysql57-community
   ```

5. 检查配置是否生效

   ```
   yum repolist enabled | grep mysql
   ```

6. 开始安装:

   ```
   yum install mysql-community-server
   ```

7. 启动服务：

   ```
   service mysqld start
   ```

8. 查看 mysql 状态:

   ```
   service mysqld status
   ```

9. 查看临时密码：

   ```
   grep 'temporary password' /var/log/mysqld.log
   ```

10. 登录

    ```
    mysql -uroot -p
    ```
