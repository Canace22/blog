---
title: ubuntu 下 tensorflow CPU release 版安装
date: 2018-05-27 09:48:31
categories: 深度学习
comments: true
---

ubuntu 下 tensorflow CPU release 版安装步骤

<!--more-->

### 安装 anaconda：

1. 下载[anaconda3-4.2.0 linux 版本](https://repo.continuum.io/archive/)

2. 到 anaconda 的下载目录下执行一下命令：`bash Anaconda3-4.2.0-Linux-x86_64.sh`

3. 接下来就是按照提示一步步的往下就行了，会自动安装各种包，直到结束

4. `echo 'export PATH="/home/canace/anaconda3/bin:$PATH"'>> ~/.bashrc`>>`source ~/.bashrc`启用 anaconda

### tensorflow 环境配置：

1. tensorflow 安装：
   `conda install tensorflow`（不要连代理，因为连了代理很可能装不成功）

#### PS:

##### conda 常用命令：

conda list：可以显示已经安装好的库。

conda install 库名 ：可以直接安装想要的库。如：conda install tensorflow

conda update 库名：升级库
