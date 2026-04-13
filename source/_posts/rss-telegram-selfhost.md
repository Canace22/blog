---
title: RSS 推送到 TG 的可行性探索
description: 从 Kindle 推送停摆到想在 Telegram 看 RSS：试了一圈机器人后自建 flowerss-bot，顺带记下 Token 与 Docker 里走代理的几件事。
categories: 软技能与思考
tags: 随笔
author: Canace
comments: true
date: 2026-04-12 10:00:00
---
前阵子 openclaw 挺火的，玩过的都知道连 tg 是最稳的，我也自己尝试本地部署了 openclaw 连 tg，为此还专门登了 tg。但是，除了搜电影，跟外国人用英语聊天，没想到能用 tg 来干嘛。今天闲来无事，突发奇想，我是不是可以用来接收 RSS 订阅消息，方便在不同的设备查看。我之前一直是用的 kindle 接收的，有个稳定的推送订阅服务，kindle 退出中国后就一直只能网页查看了，感觉对我来说有这个东西还挺好的。

我在 tg 上搜了一些机器人，可以正常用，但是有些问题，要么是批量导入不好用，要么是有广告还有源的限制，感觉挺鸡肋的，最后决定自己搞一个机器人。

要实现我的这个订阅源推荐，大致的流程是这样的：bot father创建一个新的 bot，拿到 token -> flowerss-bot配置机器人 -> 机器人加到 channel，每天自动把订阅源的更新推送给我，看起来简单是吧，但是这里遇到了点问题。

### 机器人配置

创建的机器人只能绑一个调用方，比如我之前为了龙虾创建的那个机器人，想要这里再用就会一直报错，解决方法是重置一下 token。

### 环境

既然是用推给 tg 机器人，脚本环境也是要能调用 tg 的，我踩这个坑是因为我在本地用 docker 部署的脚本，一直显示无法调通 api，给 docker 配置了代理才解决，这让我意识到我的服务器部署环境也得是用反代或者直接在对应环境机器部署才行。

另一个环境问题是，我本来想直接本地部署算了，懒得折腾，但是这有一个问题，我的 mac 睡眠或者断网了，我就不能随时看到推送了，虽然这样没关系，我可能也是工作期间的早上或者周末打开电脑才会去看，或者偶尔早上手机看一下，电脑打开接收一下，好像也影响不大。

结果是这样的，这些消息都是自动推送的，我得空就看看

![image](https://Canace22.github.io/picx-images-hosting/20260412/image.2yyxyzg014.webp)

最后再分享一下我的 docker 配置吧

```yml
# docker-compose.yml
services:
  flowerss:
    image: indes/flowerss-bot:latest
    container_name: flowerss-bot
    restart: always
    environment:
      # 1. 尝试直接通过环境变量传 Token（作为备份）
      - TOKEN=your_token
      # 2. 强制全局代理，确保 getMe 请求能出去
      - HTTPS_PROXY=http://host.docker.internal:7890
      - HTTP_PROXY=http://host.docker.internal:7890
    volumes:
      - ./data:/root/.flowerss/data
      - ./config.yml:/root/.flowerss/config.yml
    # 3. 必须加这个，否则容器不知道 host.docker.internal 是谁
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

```yml
# config.yml
bot_token: your_token
sqlite_path: "data/data.db"
proxy: "http://host.docker.internal:7890" # 确保这一行是生效的
```

参考文献：
[flowerss-bot](https://github.com/indes/flowerss-bot)
