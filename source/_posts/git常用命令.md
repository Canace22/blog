---
title: git 文档
comments: true
date: 2020-06-18 11:05:12
categories: 项目管理
description: 根据平常经验整理的 git 文档
tags: git
toc: true
---

### 一、配置

#### 1、编辑配置文件

```shell
vim ~/.gitconfig
```

#### 2、配置操作

(1) 设置

```git
git config <配置信息名>
git config --global user.name <name>
git config --global user.email <email>
```

(2) 查看

`git config -l`

(3) 删除

`git config unset <配置信息名>`

### 二、分支操作

#### 1、创建分支

(1) 创建本地分支

```git
git checkout -b <branch>
```

(2) 创建远程分支

```git
`git push origin <branch>:<branch>`
```

#### 2、删除分支

(1) 删除本地分支

`git branch -d <BranchName>`

(2) 删除远程分支

`git push origin --delete <BranchName>`

(3) 删除已被远程分支删除的分支

`git remote prune origin`

#### 3、分支版本管理

(1) 版本回退

`git reset --hard <head>` => `git push -f`

(2) 远程分支打版本标签

`git tag -a <版本号> -m <描述信息>` => `git push origin <版本号>`

#### 4、分支推送

(1) 新的分支推送到远程并跟踪

`git push --set-upstream origin <branch>`

#### 5、分支暂存

`git stash -u -> git stash pop`

#### 6、跟踪远程分支

```git
git branch --set-upstream-to=origin/develop develop
git branch --set-upstream-to=origin/master master
```

#### 7、分支状态查看

(1) 查看 log 树状图：

`git log --oneline --graph --decorate --all`


(2) 查看所有成员的提交总数

`git shortlog -sn`

(3) 查看所有成员的未合并提交总数

`git shortlog -sn --no-merges`

### 三、远程仓库操作

(1) 改变 git 远程仓库

```git
git remote set-url origin git@gitlab.dreamdev.cn:ebag/live-experiment.git
git remote -v
```

(2) 删除远程仓库文件或文件夹

`git rm -r --cached file/folder name` => `git commit` => `git push`

(3) fork 远程的上游仓库

- 查看远程分支状态：`git remote -v`

- 确定一个将被同步给 fork 远程的上游仓库：`git remote add upstream <origin.git>`

- 再次查看状态确认是否配置成功：`git remote -v`

- 从上游仓库 fetch 分支和提交点，提交给本地 master： `git fetch upstream`

- 把 upstream/master 分支合并到本地 master 上：`git merge upstream/master`

### 四、初始化项目

#### 1、 Create a new repository

```git
git clone <repositry>
cd <folder>
touch README.md
git add README.md
git commit -m "add README"
```

#### 2、 Push an existing folder

```git
cd existing_folder
git init
git remote add origin <repositry>
git add .
git commit -m "Initial commit"
```

#### 3、 Push an existing Git repository

```git
cd existing_repo
git remote rename origin old-origin
git remote add origin <repositry>
```

### 五、提交代码模板

`git status` => `git add <文件名>` => `git commit -m <描述>` => `git pull origin <远程主机名> :<远程分支名>` => `git push <分支>`


### 六、一些 tips

#### 1、推送不了代码可能的原因：

远程仓库已更新，本地代码没有及时更新，git pull 更新一下代码试试，不行就强推（不建议）

#### 2、ping 不同 github.com 报 403

可能是设置了代理，`shift+command+G` => `/private/etc` => 复制 hosts 文件，把里面关于 github 的设置去掉，保存，替换回去 => 重启浏览器或命令界面，可以正常 ping 了


