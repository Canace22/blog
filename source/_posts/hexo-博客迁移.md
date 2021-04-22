---
title: hexo 博客迁移
comments: true
date: 2018-07-29 16:13:33
categories: 技术小白网站搭建指南
---

hexo 博客迁移

<!--more-->

1.  更新 node 和 npm：`sudo npm install -g n` => `sudo n stable` => `sudo npm install npm -g`

2.  安装 hexo：`sudo npm install -g hexo`

3.  安装依赖包：`sudo npm i`

4.  复制以下文件到新建的 blog 文件夹里：package.json、source、scaffolds、themes、
    \_config.yml、.gitignore

5.  在 home 目录下新建一个 .ssh 文件：`ssh-keygen -t rsa -C <邮箱>`

6.  `sudo gedit .ssh/id_rsa.pub`，复制秘钥到 github 中

7.  `git init`，初始化空仓库

8.  配置 git：`git config -–global user.name <name>` => `git config --global user.email <email>`

9.  生成新的 public 文件：`hexo g`

10. 下载必要的插件：`sudo npm install hexo-deployer-git --save`

11. 上传博客到 git： `hexo d`
