---
title: Node.js 版本管理工具概览
categories: Web开发
tags: [后端, Node.js]
description: nodeJs 版本管理笔记
author: Canace
toc: true
comments: true
date: 2025-01-02 17:27:33
---
几种常用的 Node.js 版本管理工具及其使用方法：

## 一、 `nvm`（Node Version Manager）
`nvm` 是最流行的 Node.js 版本管理工具，支持安装、切换和卸载多个 Node.js 版本。

1、安装 `nvm`
打开终端，运行以下命令安装 `nvm`：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

安装完成后，重新加载 Shell 配置：

```bash
source ~/.zshrc  # 如果你Zsh
# 或者
source ~/.bashrc # 如果你Bash
```

验证安装：

```bash
nvm --version
```

2、常用命令

- **默认安装使用 LTS 版本**
```bash
nvm install --lts # 指定安装最新的 LTS
nvm use node          # 直接用最新安装的
```

- **安装指定版本**：
  ```bash
  nvm install 18  # 安装 Node.js 18.x 最新版本
  nvm install 16.14.0  # 安装指定版本
  ```
- **切换版本**：
  ```bash
  nvm use 18  # 切换到 Node.js 18.x
  ```
- **设置默认版本**：
  ```bash
  nvm alias default 18  # 设置 Node.js 18.x 为默认版本
  ```
- **查看已安装版本**：
  ```bash
  nvm ls
  ```
- **卸载指定版本**：
  ```bash
  nvm uninstall 16.14.0
  ```

## 二、**`n`**
`n` 是另一个简单的 Node.js 版本管理工具，使用起来更加轻量。

1、安装 `n`
首先安装 `n`：

```bash
npm install -g n
```

2、常用命令
- **安装最新稳定版**：
  ```bash
  n lts
  ```
- **安装指定版本**：
  ```bash
  n 16.14.0
  ```
- **切换版本**：
  ```bash
  n  # 选择已安装的版本
  ```
- **查看已安装版本**：
  ```bash
  n
  ```
- **卸载指定版本**：
  ```bash
  n rm 16.14.0
  ```

## 三、 **`fnm`（Fast Node Manager）**
`fnm` 是一个基于 Rust 的快速 Node.js 版本管理工具，性能优于 `nvm`。

1、安装 `fnm`
Homebrew 安装：

```bash
brew install fnm
```

或者使用脚本安装：

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```

重新加载 Shell 配置：

```bash
source ~/.zshrc  # 如果你Zsh
# 或者
source ~/.bashrc # 如果你Bash
```

验证安装：

```bash
fnm --version
```

2、常用命令
- **安装指定版本**：
  ```bash
  fnm install 18
  ```
- **切换版本**：
  ```bash
  fnm use 18
  ```
- **设置默认版本**：
  ```bash
  fnm default 18
  ```
- **查看已安装版本**：
  ```bash
  fnm list
  ```

## 四、 **`asdf`**
`asdf` 是一个通用的版本管理工具，支持多种语言和工具，包括 Node.js。

1、安装 `asdf`
Homebrew 安装：

```bash
brew install asdf
```

将 `asdf` 添加到 Shell 配置：

```bash
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.zshrc  # Zsh
# 或者
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.bashrc # Bash
```

重新加载 Shell 配置：

```bash
source ~/.zshrc  # 或者 source ~/.bashrc
```

2、安装 Node.js 插件
```bash
asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

3、常用命令
- **安装指定版本**：
  ```bash
  asdf install nodejs 18.0.0
  ```
- **切换版本**：
  ```bash
  asdf global nodejs 18.0.0
  ```
- **查看已安装版本**：
  ```bash
  asdf list nodejs
  ```

## 五、 **Homebrew**
如果你不需要频繁切换版本，可以直接Homebrew 安装和管理 Node.js。

1、安装 Node.js
```bash
brew install node
```

2、切换版本
卸载当前版本并安装其他版本：

```bash
brew uninstall node
brew install node@18
```

## 六、总结
- 如果需要频繁切换版本，推荐`nvm` 或 `fnm`。
- 如果喜欢轻量工具，可以选择 `n`。
- 如果需要管理多种语言和工具，可以选择 `asdf`。