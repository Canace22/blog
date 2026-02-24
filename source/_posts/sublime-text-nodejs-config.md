---
title: sublime text3 配置 node.js 环境
description: '配置 nodejs 插件时注意编码格式和路径设置，否则可能出现乱码或运行失败。'
date: 2018-06-08 09:32:52
categories: 工程化与运维
tags: 开发工具
---

前提：windows 系统，你已经安装了 Sublime Text3，电脑已经有 node 环境。

<!--more-->

#### 步骤：

- 下载 sublime 的 nodejs 插件，需是集成 Nodejs 插件到 sublime 中，下载地址：[https://github.com/tanepiper/SublimeText-Nodejs](https://github.com/tanepiper/SublimeText-Nodejs)
- 解压 zip 文件， 并重命名文件夹“Nodejs”
- 打开 sublime，操作"preference" --> "Browse packages", 打开一个目录，这个目录是众多语言 IDE 插件的存放地。
  *  复制”Nodejs“文件夹到这个目录。 
  *   打开 Nodejs 文件夹，找到文件“Nodejs.sublime-build”， 拖拽到 sublime，显示：       
  <code>
  {
  "cmd": ["node", "$file"],
  "file*regex": "^[ ]\_File \"(...*?)\", line ([0-9]\*)",
  "selector": "source.js",
  "shell":true,
  "encoding": "cp1252",
  "windows":
  {
  "cmd": ["taskkill /F /IM node.exe & node", "$file"]
  },
  "linux":
  {
  "cmd": ["killall node; node", "$file"]
  }
  }
  </code>
- 需要更改上面标注的地方， 要更改 encoding 为 GB2312 或者 utf8，如果不更改此属性可能导致 build nodejs 代码时终端显示乱码。
- 要用 sublime 打开文件“Nodejs.sublime-settings” 或者 设置“preference” --》 “package settings” --》 “Nodejs”  --》“setting-default” 打开文件并 更改成：
  <code>
  {
  // save before running commands
  "save_first": true,
  // if present, use this command instead of plain "node"
  // e.g. "/usr/bin/node" or "C:\bin\node.exe"
  "node_command": /usr/bin/nodejs,
  // Same for NPM command
  "npm_command": /usr/bin/npm,
  // as 'NODE_PATH' environment variable for node runtime
  "node_path": false,
  "expert_mode": false,
  "ouput_to_new_tab": false
  }
  </code>
  到此，已经配置好了。
