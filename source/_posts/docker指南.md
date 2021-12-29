---
title: 前端 docker 指南
categories: web
tags: devOps
description: docker 在前端自动化部署中经常用到，平常都是别人配置好的，只其所以不知其然，自己走一遍，做个笔记
comments: true
toc: true
date: 2020-09-16 09:16:49
---
## 一、下载

mac，下载完之后安装即可

(1) 下载: [地址](https://hub.docker.com/editions/community/docker-ce-desktop-mac/)

(2) 创建容器：`docker run -dp 80:80 docker/getting-started`

## 二、nginx docker

### 1、新建 docker 文件夹

(1) 文件夹下新建 Dockerfile 文件, 内容如下

```docker
FROM nginx:latest
COPY dist /usr/share/nginx/html
#　修改nginx的配置项
COPY docker/default.conf /etc/nginx/conf.d
```

(2) 端口映射，文件夹下新建 default.conf 文件, 内容如下:

```
server {
    listen       80;
    server_name  _;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

### 2、编译 docker 镜像

```
docker build -t <webserver> -f docker/Dockerfile .
```

### 3、上传镜像

```
docker push
```

### 4、关闭容器

```
docker container stop web
```

### 5、创建容器, 并将容器指向一个镜像版本

```docker
docker run -it --rm -d -p 80:80 --name web <webserver>
```
