---
title: Homebrew 常用命令
categories: 系统
tags: mac
description: Homebrew 常用命令集合
comments: true
date: 2020-01-02 11:00:01
---

### 一、是什么

Homebrew 是一个包管理器，用于安装 Apple 没有预装但我们需要的 UNIX 工具。

Homebrew 会将软件包安装到独立目录(/usr/local/Cellar)，并将其文件软链接至/usr/local。

Homebrew 不会将文件安装到它本身目录之外，所以可将 Homebrew 安装到任意位置。

### 二、常用命令

```brew
// 搜索包
brew search mysql

// 安装包
brew install mysql

// 查看包信息，比如目前的版本，依赖，安装后注意事项等
brew info mysql

// 卸载包
brew uninstall wget

// 显示已安装的包
brew list

// 查看brew的帮助
brew –help

// 更新， 这会更新 Homebrew 自己
brew update

// 检查是否有新版本，这会列出所有安装的包里，可以升级的项目
brew outdated
brew outdated mysql

// 升级所有可以升级的软件
brew upgrade
brew upgrade mysql

// 清理不需要的版本极其安装包缓存
brew cleanup
brew cleanup mysql
```
