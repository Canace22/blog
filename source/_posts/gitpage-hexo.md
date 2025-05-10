---
title: gitpage 搭建 hexo 博客
date: 2018-05-20 16:58:02
categories: 项目管理
tags: git
comments: true
---

大半天，一边折腾，一边查找各种文档，写出的这篇文档，不知道有没有把程序表示得足够简明，有不足之处望指明。

1、前提：已安装好 nodeJS 和 git。

2、桌面右击进入 gitbash，输入 `npm install -g hexo` 安装 hexo，关闭 gitbash。

3、在电脑中建立一个名为【hexo】的文件夹，新建的文件夹右击打开 gitbash，输入 hexo init 命令，命令执行完后，根据提示接着执行 npm install 命令。

4、运行 hexo server 命令，出现 running 字样说明 Hexo Server 已经启动了，在浏览器中打开http://localhost:4000/，可以看到生成的博客，按ctrl+C可以停止server；。

5、新打开一个 git bash 命令行窗口，cd 到/D/hexo 下，执行 hexo new “My New Post” 命令,可以生成一篇新的文章 “My New Post”，打开http://localhost:4000/ 可以预览到新生成的文章。

6、执行 hexo generate 命令可以将 markdown 文章生成静态网页，该命令执行完后，会在 D:\Hexo\public\ 目录下生成一系列 html，css 等文件。

7、hexo new “My NewPost”会在 D:\Hexo\source\ \_posts 目录下生成一个 markdown 文件：My-New-Post.md，可以使用一个支持 markdown 语法的编辑器（比如 Sublime Text 2）来编辑该文件。

8、部署博客到 github

(1) 部署到 Github 前需要配置\_config.yml 文件，首先找到下面的内容

```
deploy:
type:
```

(2) 然后将它们修改为

```
deploy:
type: git（新版本的hexo必须用git，不然会出错）
repository:git@github.com:zhchnchn/zhchnchn.git（新版本用SSH不然会出错）
branch: gh-pages
```

(3) 执行 npm install hexo-deployer-git –save 命令（hexo3.0 以上的版本必须在执行此命令后才能部署到 git 上）

A. 执行 hexo clean，清除缓存

B. 执行 hexo generate 更新生成静态网页

C. 执行hexo deploy 命令部署博客到github上；

D. 部署完成后，在浏览器中打开http://zhchnchn.github.io/（https://zhchnchn.github.io/） ，正常显示网页，表明部署成功。

### 注意两大坑:

1、deploy 不了，3.0 版本以上要执行这个命令： npm install hexo-deployer-git
   –save，切记！不然可能一直 error

2、然后部署到 git 上记得修改 url，不然可能发布之后有些 js 和 css 文件路径找不到！
