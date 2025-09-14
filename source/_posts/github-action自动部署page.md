---
title: 使用 github action 编译 Vue 发布到 github page
categories: Web开发
tags: git
description: 之前发布的静态页面都是用 travis ci 集成发布的，github action 也发布一段时间了，今天试试看使用 github action 编译 Vue 发布到 github page
comments: true
date: 2021-03-22 16:26:56
---

我自己平常写的 demo 喜欢放到一起，丢到 github 顺便发布一个静态页面，之前都是用的 travis ci，今天试试看使用 github action 编译 Vue 发布到 github page，action 很简单，只需要在项目根目录下创建一个`.github/workflow/xx.yml`即可。下面来看看我的 ci 文件

```yml
name: build site  # action 的名称

on:               # 触发 workflow 的事件，我这里的意思是只在 master 分支 push 的时候触发
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest  # 环境镜像

    steps:
      - uses: actions/checkout@master # 步骤的运行说明
      - uses: actions/setup-node@master # 设置 NodeJS 环境
      - name: build
        run: |
          yarn
          yarn build
      - name: deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

上面配置文件中我标出了部分注释，没有标的 run 字段下面是编写脚本的，with 用于设置一些值。job 的 deploy 阶段主要是用的第三方库把编译好的静态代码丢到 gh-pages 分支。push 代码到 master，点开 action 可以看到任务已经在执行了，执行完之后可以看到我们的改动已经更新到 page 上了。
