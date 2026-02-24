---
title: hexo 支持数学公式
categories: 网站建设
tags: 开发工具
comments: true
date: 2020-09-01 10:54:48
---
### 一、版本

hexo: 3.0.0

theme: maupassant

### 二、快速开始

#### 1、安装插件

(1) 升级 hexo 到 3.0+，因为 hexo-math 插件只支持高版本

(2) 安装 hexo-math 插件

#### 2、配置

根目录的 _config.yml 配置文件加一行 `mathjax: true`, 在需要用到插件公式的文档头部加上 `mathjax: true `, 试着编辑一条公式，比如: `log_2n` ，发现没反应，还编译报错了，解决这两个问题方法如下

(1) 公式生效前提: 在公式的前后加上$$符号

(2) 编译出错: 进入node_modules\kramed\lib\rules\inline.js，修改文档的 escape 和 em 字段，修改前后如下

```json
// 修改前：
escape: /^\\([\\`*{}\[\]()#$+\-.!_>])/,
// 修改后：
escape: /^\\([`*\[\]()#$+\-.!_>])/,

// 修改前：
em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
// 修改后：
em: /^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
```

此外由于升级之后配置有所变化(升级了相应主题)，还报了一个 minivaline 的错，在配置文件中加上相应配置就好，比如这样

```yml
minivaline:
  enable: false
```

