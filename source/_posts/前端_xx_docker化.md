---
title: 前端 XX docker 化
comments: true
toc: true
date: 2023-01-16 11:07:31
categories: web
tags: devOps
description: 前端 XX docker 化方案
---
## 一、nginx docker 化

### 1、新建 docker 文件夹

(1) 文件夹下新建 Dockerfile 文件, 内容如下

```docker
FROM nginx:latest
COPY dist /usr/share/nginx/html
#　修改nginx的配置项
COPY docker/default.conf /etc/nginx/conf.d
```

(2) nginx 配置端口映射，文件夹下新建 default.conf 文件, 内容如下:

```conf
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

```sh
docker build -t <image-name> -f docker/Dockerfile .
```

### 3、创建容器, 并将容器指向一个镜像版本

```sh
docker run -d -p <host-port>:<container-port> --name <container-name> <image-name>
```

## 二、Node.js 服务 docker 化

### 1、Dockerfile 文件

```docker
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8002
CMD [ "node", "servers.js" ] # 用 node 启动服务
# CMD [ "npm", "start" ] 用 npm cli 启动服务
```

### 2、编译 docker 镜像

```sh
docker build -t <image-name> -f docker/Dockerfile .
```

### 3、创建容器, 并将容器指向一个镜像版本

```sh
docker run -d -p <host-port>:<container-port> --name <container-name> <image-name>
```

参考文献：
[把一个 Node.js web 应用程序给 Docker 化](https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/)