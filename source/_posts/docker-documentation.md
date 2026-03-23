---
title: docker 打包本地 web 项目发布到服务端
categories: 工程化与运维
tags: 构建与部署
toc: true
comments: true
date: 2023-01-16 09:58:28
description: '打包 web 项目用 docker 时，先构建镜像再推送到仓库，最后在服务端拉取运行即可。'
---
## 一、Docker 入门

### 1、构建镜像

`docker build -t <image-name> .`

- -t 指定要创建的目标镜像名
- **.** ：Dockerfile 文件所在目录，可以指定Dockerfile 的绝对路径
- 设置镜像标签: `docker build -t image-name:tag`

### 2、运行应用程序

`docker run --name <container-name> -d -p 8080:80 <image-name> /bin/echo "Hello world"`

- docker run：运行应用程序
- `<image-name>`： 指定要运行的镜像，Docker 首先从本地主机上查找镜像是否存在，如果不存在，Docker 就会从镜像仓库 Docker Hub 下载公共镜像
- `/bin/echo "Hello world"`**:** 在启动的容器里执行的命令
- `—name` 指定容器名称
- `-d` 后台运行
- `-p <docker-host-port>:<container-port>` 指定端口映射

### 3、运行交互式的容器

示例：`docker run -it <image-name> /bin/bash`

- **t:** 在新容器内指定一个伪终端或终端。
- **i:** 允许对容器内的标准输入 (STDIN) 进行交互。
- 通过运行 exit 命令或者使用 CTRL+D 来退出容器

### 4、进入容器

`docker exec -it 容器ID /bin/bash`

### 5、停止容器

`docker stop <容器ID >`

### 6、查看所有容器状态

**`docker ps -a`**

### 7、启动一个已停止的容器

`docker start <容器ID>`

### 8、导出容器快照

`docker export 容器ID > name.tar`

### 9、导入容器

`docker import url`

### 10、删除容器

`docker rm -f 容器ID` 或者 `docker rm 容器名称`

### 11、端口映射

- -P 随机映射
- 指定端口映射: -p 80:10086
- 查看容器端口的映射情况：`docker port 容器ID`

### 12、查看所有镜像

**`docker images`**

### 13、删除镜像

`docker rmi 镜像名称`

了解了大概的基础之后，下面开始实战篇。

## 二、使用 docker 打包本地 web 项目发布到服务端概述

### 1、把本地项目打包成一个 docker 镜像

```bash
docker build -t <image-name> .
```

### 2、推送打包好的镜像到镜像容器服务

把 docker 镜像推送到阿里云镜像服务器需要先去阿里云镜像服务创建一个空间和一个仓库

```bash
# 登录阿里云容器服务
docker login --username=[username] registry.cn-hangzhou.aliyuncs.com
# 给镜像打 tag
docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/[命名空间]/[仓库名]:[镜像版本号]
# 推送到阿里云容器仓库
docker push registry.cn-hangzhou.aliyuncs.com/[命名空间]/[仓库名]:[镜像版本号]
```

### 3、拉取阿里云容器镜像并运行

服务器拉取阿里云容器镜像，拉取的前提是先要登录，如上

```bash
# 拉取刚刚上传的镜像
docker pull registry.cn-hangzhou.aliyuncs.com/[命名空间]/[仓库名]:[镜像版本号]
# 创建并运行容器
docker run --name blog -d -p 5000:80 registry.cn-hangzhou.aliyuncs.com/命名空间]/[仓库名]:[镜像版本号]
```

打开服务器 IP:端口号，就可以看到内容了，完美
