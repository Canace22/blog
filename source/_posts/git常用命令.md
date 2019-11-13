---
title: git常用命令
comments: true
date: 2018-07-08 19:08:12
categories: 项目管理
tags: git
---

git 常用命令

<!--more-->

1. 添加配置信息: `git config <配置信息名>`

2. 删除配置信息: `git config unset <配置信息名>`

3. 查看配置信息: `git config -l`

4. 提交代码: `git status`查看状态 => `git add <文件名>` => `git commit -m <描述>` => `git pull origin <远程主机名> :<远程分支名>` => `git push <分支>`

5. 初始化 git 项目

   ```git
   cd existing_folder
   git init
   git remote add origin git@gitlab.dreamdev.cn:ebag/flash-experiment.git
   git add .
   git commit -m "Initial commit"
   ```

6. 改变 git 远程仓库

   ```git
   git remote set-url origin git@gitlab.dreamdev.cn:ebag/live-experiment.git
   git remote -v
   git branch --set-upstream-to=origin/develop develop
   git branch --set-upstream-to=origin/master master
   ```

7. 推送不了代码可能的原因：远程仓库已更新，本地代码没有及时更新，git pull 更新一下代码试试，不行就强推（不建议）

8. 删除本地分支：`git branch -d <BranchName>`

9. 删除远程分支：`git push origin --delete <BranchName>`

10. 查看 log 树状图：`git log --oneline --graph --decorate --all`

11. 版本回退：`git reset --hard <head>` => `git push -f`

12. 创建远程分支：`git push origin develop:develop`

13. 远程分支打版本标签：`git tag -a <版本号> -m <描述信息>` => `git push origin <版本号>`

14. 代码写错分支，暂存，转到其他分支: `git stash -u -> git stash pop`

15. 删除误传的远程文件或文件夹：`git rm -r --cached file/folder name` => `git commit` => `git push`

16. 新的分支推送到远程： `git push --set-upstream origin <branch>`
