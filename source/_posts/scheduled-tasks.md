---
title: 定时任务
description: 系统 crontab 与 openclaw 工作空间任务的分工，以及 Mac 上查看编辑与五段式表达式写法备忘。
categories: 工程化与运维
tags: 开发工具
author: Canace
comments: true
toc: true
date: 2026-04-23 10:00:00
---

最近在养龙虾，设置了不少定时任务，今天发现有些定时任务没有被写到龙虾的工作空间，但是脚本是有的。就问龙虾其他的定时任务在哪里设置的，发现定时任务分为两种：`系统定时任务`和`openclaw 定时任务`。

Linux 和 Mac 系统是可以设置定时任务，定期去跑脚本的，利用这个能力，有些不需要大模型参与的工作可以直接写成脚本，用系统定时任务去跑，只有需要用到大模型能力的定时任务才在工作空间 cron 目录下配置，这样一方面可以节省 token 的消耗，另一方面执行效率和确定性也会更高。我之前不是写了个龙虾的使用姿势之一是做信息聚合和盯盘吗？现在看来这部分能力不需要 openclaw 的参与，用系统定时任务很容易实现，除非我需要提取和总结信息，openclaw 才能派上用场。

下面来讲讲 Mac 定时任务的一些使用

### 一、命令

1. 查看所有定时任务：`crontab -l`

2. 编辑：`crontab -e`,编辑方法跟 vim 一样（i编辑， esc 退出当前模式，:wq保存并关闭）

### 二、格式

#### 1. 怎么写一条定时任务

输入上面的查看定时任务命令，可以得到一个列表，比如这样

```bash
0 10 */3 * * /Users/canace/.openclaw/scripts/sync-wiki-to-notion.sh >> /Users/canace/.openclaw/logs/sync-wiki-cron.log 2>&1
0 * * * * /usr/bin/python3 /Users/canace/.openclaw/scripts/stock-alert.py >> /Users/canace/.openclaw/logs/stock-alert-cron.log 2>&1
0 15 * * 1-5 /usr/bin/python3 /Users/canace/.openclaw/scripts/stock-closing-alert.py >> /Users/canace/.openclaw/logs/stock-closing-cron.log 2>&1
30 9 * * * /usr/bin/python3 /Users/canace/.openclaw/scripts/rss-digest.py >> /Users/canace/.openclaw/logs/rss-digest-cron.log 2>&1
0 11 * * 0 /usr/bin/python3 /Users/canace/.openclaw/scripts/wiki-ingest.py >> /Users/canace/.openclaw/logs/wiki-ingest-cron.log 2>&1
```

一长串东西，具体代表什么呢？简单来讲，结构是这样的：

```md
[定时设置] [用的脚本语言路径，默认是bash，可选，比如第一行] [脚本路径] >>（追加） [日志路径] 2>&1(如果脚本运行报错了，把错误信息也一起写进日志文件里)
```

看了我总结的这个结构是不是觉得很好理解了？上面的大串大串的字符串就是一些路径，下来再来看看定时设置那些符号和数字式怎么组合的。然后要注意路径都要写绝对路径，不然可能找不到

#### 2. 定时设置的格式

定时设置部分总共分为五段，结构我也总结一下吧

```md
[分钟] [小时] [日期] [月份] [星期]
```

值就跟我们平常的表达一样，分钟就是 0-59，小时是 24 小时制，日期 1-31，月份 1-12，星期有点特殊，0-7，其中0/7都代表周日。

那么一堆的符号代表什么呢？为了让时间设置更灵活，crontab 引入了四个核心符号：

- `* (星号)`：代表“每”：在第一位写 `*`，就是每分钟跑一次。

- `, (逗号)`：代表“和”：`1,3,5 * * * *` 表示每小时的第 1、3、5 分钟分别执行一次。

- `- (连字符)`：代表“范围”：`1-5 * * * *` 表示从第 1 分钟到第 5 分钟，每分钟执行一次。

- `/ (斜杠)`：代表“间隔频率”

- `*/10 * * * *` 表示每隔 10 分钟执行一次。
