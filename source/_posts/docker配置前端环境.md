---
title: 使用 docker 配置前端环境
categories: web
tags: devOps
comments: true
date: 2022-02-16 09:19:25
---
## 一、大体思路

1、设置 shell 别名运行 docker 命令

- alias — 设置 shell 别名
- node — 在终端输入的名称
- docker —  docker 命令
- run — 执行容器镜像
- -rm — 关闭时自动删除容器
- it —创建交互式容器
- -v "$PWD":/app — 把当前目录挂在到容器的 app 目录下
- -w /app — 设置容器的工作目录为/app
- node:16-alpine — 所使用的容器镜像

![shell-alias](https://raw.githubusercontent.com/Canace22/Assets/main/images/anatomy-of-a-docker-alias.png)

2、运行 `source ~/.zshrc`

## 二、具体配置

1、设置 node 环境，下面的例子是设置 node@16的，可以自己根据版本号命名另外设置，设置完之后记得执行一下 `source ~/.zshrc`。

```sh
# ./zshrc
# 设置 node 环境
alias node='docker run --rm -it -v "$PWD":/app -w /app node:16-alpine'
# 设置 npm
alias npm='docker run --rm -it -v "$PWD":/app -w /app node:16-alpine npm'
```

参考文档：

[https://nystudio107.com/blog/dock-life-using-docker-for-all-the-things](https://nystudio107.com/blog/dock-life-using-docker-for-all-the-things)
[node 镜像版本信息](https://hub.docker.com/_/node)