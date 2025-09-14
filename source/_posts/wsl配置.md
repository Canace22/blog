---
title: Vscode 配置 wsl 并配置 node 环境
comments: true
date: 2018-12-18 08:57:19
categories: Web开发
tags: 开发环境
---

1. 下载 WSL Guideline，里面会有配置安装 wsl 相关说明

2. 切换终端到 wsl

3. 安装 node：

```bash
$ touch ~/.bashrc
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
// restart bash
$ nvm install node
```

4. 安装 vue-cli3：`npm install -g @vue/cli`

5. 可以开始使用啦
