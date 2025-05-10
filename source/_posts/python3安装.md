---
title: python3 安装
comments: true
date: 2019-01-06 17:42:32
categories: 服务端
tags: python
---

python3 安装指南

<!--more-->

### unbuntu

1. `yum -y install openssl*` (pip 依赖 ssl 环境)

2. 编译安装 python3：

   - [下载地址](https://www.python.org/ftp/python/)

   - 安装步骤： tar zxvf Python-3.5.2.tgz => cd Python-3.5.2 => ./configure => make && make install

3. 安装 pip3: `sudo apt-get install python3-pip`

### centOs

1. 安装 yum-utils, 用于管理 repository 及扩展包: `sudo yum install yum-utils`

2. 使用 yum-builddep 为 Python3 构建环境,安装缺失的软件依赖： `sudo yum-builddep python`

3. 下载对应版本的 Python 包：`curl -O https://www.python.org/ftp/python/3.5.0/Python-3.5.0.tgz`

4. 解压 Python 包：`tar xf Python-3.5.0.tgz`

5. 安装 Python: `cd Python-3.5.0` => `./configure` => `make` => `sudo make install`

6. 检测 Python 是否安装完成：`python3 -V`

7. 把 python3 作为默认版本：`vi /etc/profile.d/python.sh` => `alias python='/usr/local/bin/python3.5'`
