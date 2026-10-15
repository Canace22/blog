---
title: 如何关掉 Cursor 提交里自动加上的签名
description: Agent 提交会在信息末尾追加 Co-authored-by 或 Made-with。项目规则拦不住，要在 Cursor 设置和 CLI 配置里分别关掉。
categories: AI工程化
tags: AI编程
author: Canace
comments: true
toc: true
date: 2026-10-15 10:50:00
---
用 Cursor 有一个很烦人的地方，那就是每次干完活自动 commit 都会带上他自己的签名，比如这样。

```text
Co-authored-by: Cursor <cursoragent@cursor.com>
```

公司的项目，加一堆的 agent 签名，总感觉很奇怪。

因为这个我还专门写了项目规则不让提交带 AI 签名，但是这样有个问题，每次都要花费 token 去处理，也是一笔花费，有没有相关设置可以直接关掉呢？

今天研究了一下，是有的。不过改配置要分不同的产品去改，他们不互通。

首先这个签名怎么来的呢？

搜了一下，发现这是 Cursor 在提交信息写完之后，由工具再追加进去的。所以仓库里的 `AGENTS.md`、用户规则里写「不要带 AI 签名」，这种针对模型的规则，都约束不到这个行为。

官方把这个行为叫 Attribution，默认开启。编辑器、命令行、云端 Agent 各有一份开关，关了一处，另一处还会继续加。

## Cursor 编辑器里提交

打开 **Cursor Settings**。这是 Cursor 自己的设置页，不是 VS Code 的 Settings（`Cmd+,`）。菜单路径是 Cursor → Settings → Cursor Settings，也可以在命令面板里搜 Cursor Settings。

找到 **Git & PRs → Attribution**。Cursor 3.11 之前，这一项在 **Agents → Attribution**。

关掉两处：

- **Commit Attribution**：Agent 创建的 commit 不再追加 trailer。
- **PR Attribution**：用 `gh pr create` 建拉取请求时，描述里不再出现 Made with Cursor。

只关提交、不关 PR 的话，commit 干净了，PR 正文仍会带署名。

## 命令行 `cursor-agent`

CLI 不读编辑器里那个开关。配置在 `~/.cursor/cli-config.json`（Windows 是 `%USERPROFILE%\.cursor\cli-config.json`）。文件里没有 `attribution` 字段时，两项都按默认开启处理。我本机这份配置就是这样，所以即使用编辑器关过，终端里的 agent 提交仍会带签名。

在 JSON 里补上：

```json
"attribution": {
  "attributeCommitsToAgent": false,
  "attributePRsToAgent": false
}
```

这两项是全局的。CLI 里能按项目区分的主要是权限，署名开关不分仓库。

## 关了还会出现的时候

| 从哪提交                | 去哪关                                                                     |
| ----------------------- | -------------------------------------------------------------------------- |
| Cursor 编辑器里的 Agent | Cursor Settings → Git & PRs → Attribution                                  |
| 终端里的 `cursor-agent` | `~/.cursor/cli-config.json` 的 `attribution`                               |
| Cloud Agent             | 本地没有对应开关，合并时从 merge message 里删掉那一行                      |
| 企业账号                | 管理员可在 Admin Dashboard → Settings 里对全员强制开或关，个人设置会被盖掉 |

Cloud Agent 在 Cursor 的服务器上提交，本机的设置和 git hook 都不会跑到那边。截至 2026 年 10 月，公开说明里没有给云端单独关掉署名的选项。需要干净历史时，在合并说明里去掉那一行再合。

## 已经写进历史之后

设置只影响之后的提交。已经落在 `git log` 里的那一行，要改提交对象本身。

还没推送、并且就是最新一条时，可以用 `git commit-tree` 重写这条提交：保留原来的 tree、parent、作者和时间，只换掉提交说明，再用 `git reset --soft` 把 HEAD 指到新对象。不要顺手改作者日期，也不要靠 `--amend` 碰已经推送过的提交。

本地还想再兜一层的话，可以在 `commit-msg` hook 里删掉这两行。Cursor 是在 hook 运行前把 trailer 写进提交说明文件的，所以 hook 看得到、也删得掉：

```sh
#!/bin/sh
file="$1"
tmp="${file}.tmp"
grep -v -e '^Co-authored-by: Cursor ' -e '^Made-with: Cursor' "$file" > "$tmp" && mv "$tmp" "$file"
```

这个 hook 只管本机仓库。Cloud Agent 的提交不会经过它。
