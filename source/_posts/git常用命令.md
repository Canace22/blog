---
title: git常用命令
comments: true
date: 2020-04-24 19:08:12
categories: 项目管理
description: git 常用命令
tags: git
---

### 初始化 git 项目:

1、 Git global setup

```git
git config --global user.name <name>
git config --global user.email <email>
```

2、 Create a new repository

```git
git clone <repositry>
cd <folder>
touch README.md
git add README.md
git commit -m "add README"
```

3、 Push an existing folder

```git
cd existing_folder
git init
git remote add origin git@gitlab.dreamdev.cn:ebag/source-list.git
git add .
git commit -m "Initial commit"
```

4、 Push an existing Git repository

```git
cd existing_repo
git remote rename origin old-origin
git remote add origin git@gitlab.dreamdev.cn:ebag/source-list.git
```

### 添加配置信息:

`git config <配置信息名>`

### 删除配置信息:

`git config unset <配置信息名>`

### 查看配置信息:

`git config -l`

### 提交代码:

`git status`查看状态 => `git add <文件名>` => `git commit -m <描述>` => `git pull origin <远程主机名> :<远程分支名>` => `git push <分支>`

### 改变 git 远程仓库

```git
git remote set-url origin git@gitlab.dreamdev.cn:ebag/live-experiment.git
git remote -v
git branch --set-upstream-to=origin/develop develop
git branch --set-upstream-to=origin/master master
```

### 推送不了代码可能的原因：

远程仓库已更新，本地代码没有及时更新，git pull 更新一下代码试试，不行就强推（不建议）

### 删除本地分支：

`git branch -d <BranchName>`

### 删除远程分支：

`git push origin --delete <BranchName>`

### 查看 log 树状图：

`git log --oneline --graph --decorate --all`

### 版本回退：

`git reset --hard <head>` => `git push -f`

### 创建远程分支：

`git push origin develop:develop`

### 远程分支打版本标签：

`git tag -a <版本号> -m <描述信息>` => `git push origin <版本号>`

### 代码写错分支，暂存，转到其他分支:

`git stash -u -> git stash pop`

### 删除误传的远程文件或文件夹：

`git rm -r --cached file/folder name` => `git commit` => `git push`

### 新的分支推送到远程：

`git push --set-upstream origin <branch>`

### 查看所有成员的提交总数

`git shortlog -sn`

### 查看所有成员的未合并提交总数

`git shortlog -sn --no-merges`

### 删除已被远程分支删除的分支

`git remote prune origin`
