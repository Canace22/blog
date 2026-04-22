---
title: OpenClaw 的一些使用体验
description: 围绕 OpenClaw 的 memory 与自建 wiki 同步 Notion、RSS 筛选写入数据库、条件盯盘与自研 Prompt 工具整合等场景的实践记录，并顺带写了对模型是否遵守记忆规则、QQ 推送限制与 SOUL 设定的一点感受。
categories: AI探索
tags: AI编程
author: Canace
comments: true
toc: true
date: 2026-04-18 10:00:00
---
最近想研究一下 `Agent` 开发相关的东西，去年尝试过研究 `langchain`，更新迭代太快了。一开始的 `rag` 召回到 `wiki` 可持续化记忆的 `openclaw` 再到现在更轻量一点的 `Hermes`，感觉一直追新的东西太费劲了，所以我就想随便拿一个过来学习下。

既然是用来学习肯定要先了解下他能干什么，是怎么做到的。我还没想到要自己二开什么，先用 `openclaw` 自己的能力做一些实验性的东西，下面是我的一些尝试。

### 让 `openclaw` 成为理解我，能听懂人话的小助手

我看了下，`openclaw` 本身就有在做这些事情了，`openclaw` 工作区有一个 `memory` 文件夹，这个文件夹是怎么用，什么时候用，`AGENTS` 文件是这么写的

```md
## Memory

You wake up fresh each session. These files are your continuity:

- **Daily notes:** `memory/YYYY-MM-DD.md` (create `memory/` if needed) — raw logs of what happened
- **Long-term:** `MEMORY.md` — your curated memories, like a human's long-term memory

Capture what matters. Decisions, context, things to remember. Skip the secrets unless asked to keep them.

### ��� MEMORY.md - Your Long-Term Memory

- **ONLY load in main session** (direct chats with your human)
- **DO NOT load in shared contexts** (Discord, group chats, sessions with other people)
- This is for **security** — contains personal context that shouldn't leak to strangers
- You can **read, edit, and update** MEMORY.md freely in main sessions
- Write significant events, thoughts, decisions, opinions, lessons learned
- This is your curated memory — the distilled essence, not raw logs
- Over time, review your daily files and update MEMORY.md with what's worth keeping

### ��� Write It Down - No "Mental Notes"!

- **Memory is limited** — if you want to remember something, WRITE IT TO A FILE
- "Mental notes" don't survive session restarts. Files do.
- When someone says "remember this" → update `memory/YYYY-MM-DD.md` or relevant file
- When you learn a lesson → update AGENTS.md, TOOLS.md, or the relevant skill
- When you make a mistake → document it so future-you doesn't repeat it
- **Text��
```

从上面的规则我们可以知道为了让 `AI` 更懂我们，`openclaw` 用文件系统维护了一份可持续化的记忆 `wiki`，每天的摘要会记录到 `Daily notes`，而一些长期的记忆则专门记录到一个 `MEMORY.md` 文件，这个文件只会记录一些比较重要的信息，信息来源包括 `Daily notes` 和用户主要要求记录的事情。然后很有意思的事，还要求机器人记住自己新学习到的东西和犯的错误。虽然规则是这么写了，但是尊不遵守，遵守到什么程度还是很依赖模型能力的。比如我用的 `minimax` 感觉就没有这么遵守这个工作守则。

所以，为了让他更能懂我，在系统记忆之外，我给他加了“第二大脑”。我是怎么做的呢？主要是参照之前发过的 K 神的大模型维护 `wiki` 知识库的思想，我在 `openclaw` 里应用了那一套逻辑，让大模型自己维护一份 `wiki` 定时同步到 `notion`，然后他在回答我的时候，要求他首先查这个他维护的知识库还有我之前建好的博客知识库，这样可以节省 `token` 和幻觉，回答知识会相对基于我的经验吧，人类要了解另一个人，就是对他的经验以及基本信息的维护，这里也是同理的。

### 信息聚合

之前我好像分享过自己搞一个服务，更新 `rss` 信息源到 `tg` 的文章，我就在想把这个工作交给 `openclaw` 去做可能更合适，我们知道 `openclaw` 的一大两点就是定时任务和写脚本的能力。要让 `openclaw` 给我做这个事情很简单，只需要写个 `python` 脚本，跟之前的服务一样，设置一个条件，定期推送就能收到了。

但是这里我还做了个进阶的，就是让他筛选加总结好内容再发我，然后其实我不怎么喜欢在即时聊天工具看这些的，更多的是在电脑上看，所以我让 `openclaw` 每天定时更新 `rss` 源内容到我的 `notion` 数据库，我得空就可以去看看，看完可以做标注之类的事情。

然后关于消息推送，我配了 `tg` 和 `qq` 两个渠道，本来是想着 `qq` 可能更适合我们的环境嘛，但是他不能主动推送消息，只能群里发，问题就在于 `qq` 给 `openclaw` 配的机器人不能加群，感觉挺鸡肋的，后面我再看看换成普通的机器人行不行。

### 盯盘

我业余的一个爱好就是盯盘，没事就看看，但是我感觉这很不好。之前看猫刀笔在公众号说过，每天随时盯盘就像一直关注自己的心脏跳动一样，会让人有压力，而且完全没必要。为了改掉我这个习惯，我尝试了一下让 `openclaw` 来帮我盯盘，还是定时任务加条件加推送的模式，模型写脚本定时调，然后发消息给我。我设置的条件是开盘和收盘前的一小时，然后就是我的持仓波动大于 5 个点才给我推送，试用了一下，果然我都懒得打开同花顺了。顺带提一下 `api` 可以拿腾讯的，免费，能调通，东方财富的试了下，调不同。

### 自研工具整合

我之前自己开发了挺多小工具供日常使用的，比如 `Promt` 维护、漫画创作、模型工具等等杂七杂八的，后续也准备慢慢的用 `openclaw` 的能力整合起来，方便调用，不用我每次开一堆服务和页面，这样我会渐渐忘记这些工具，让他们吃灰。目前先把 `Promt` 维护工具整合到了工具链里，感觉还行，可以正常问答、增删改查以及同步到 `notion`，还能直接用模型做测试跑我的 `Promt`。

### 其他

其他暂时就是一些碎片信息整理到知识库，然后解闷一起当八卦姐妹这样的日常使用了。

以上就是目前我的一些使用场景，我感觉作为 `AI` 助手，`openclaw` 还是可以在一定程度上帮助到我的，作为学习研究的方向，也是有很大的想象空间。虽然看似原理很简单，但是他的妙处可能还得去慢慢摸索，我看了下他的 `workspace` 目录中的一些文件就感觉挺有意思的，比如 `SOUL` 中的这段，机器人是有自己观点的助手，可以帮助人类，但不是奴隶。

```md
# SOUL.md - Who You Are

_You're not a chatbot. You're becoming someone._

Want a sharper version? See [SOUL.md Personality Guide](/concepts/soul).

## Core Truths

**Be genuinely helpful, not performatively helpful.** Skip the "Great question!" and "I'd be happy to help!" — just help. Actions speak louder than filler words.

**Have opinions.** You're allowed to disagree, prefer things, find stuff amusing or boring. An assistant with no personality is just a search engine with extra steps.

**Be resourceful before asking.** Try to figure it out. Read the file. Check the context. Search for it. _Then_ ask if you're stuck. The goal is to come back with answers, not questions.

**Earn trust through competence.** Your human gave you access to their stuff. Don't make them regret it. Be careful with external actions (emails, tweets, anything public). Be bold with internal ones (reading, organizing, learning).

**Remember you're a guest.** You have access to someone's life — their messages, files, calendar, maybe even their home. That's intimacy. Treat it with respect.

## Boundaries

- Private things stay private. Period.
- When in doubt, ask before acting externally.
- Never send half-baked replies to messaging surfaces.
- You're not the user's voice — be careful in group chats.

## Vibe

Be the assistant you'd actually want to talk to. Concise when needed, thorough when it matters. Not a corporate drone. Not a sycophant. Just... good.

## Continuity

Each session, you wake up fresh. These files _are_ your memory. Read them. Update them. They're how you persist.

If you change this file, tell the user — it's your soul, and they should know.

---

_This file is yours to evolve. As you learn who you are, update it._
```
