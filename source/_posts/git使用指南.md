---
title: Git 安装配置及分支管理
comments: true
toc: true
date: 2020-06-22 09:03:11
categories: 项目管理
tags: git
description: Git 安装配置及分支管理指南
---

### 一、安装配置 Git

1、从官网下载安装包，手动完成安装。

2、打开 Git Bash 命令行工具，执行命令 ssh-keygen -t rsa -C Email-Addresss 生成一个密钥对。

3、 登录到 GitLab，点击右上角你的用户头像，点击 Edit Profile settings，点击 SSH Keys，点击 Add SSH Key，填写 Title 栏，复制用户目录下.ssh/id_rsa.pub 文件的内容到 Key，点击 Add Key。

4、 点击右上角的 New project，填写完成后点击 Create project 新建一个仓库，点击 Activity，点击 SSH 后复制 SSH 边上栏里的地址。

5、打开 Git Bash 命令行工具，切换到一个合适的目录，使用命令 git clone 刚才复制的 URL 克隆创建的仓库。

6、进入目录 cd 仓库名，执行命令 `git config user.email your-email` => `git config user.name your-name`，设置你的个人信息。

7、执行命令：

```bash
echo "#Description" > README.md #添加一个文件

git status #查看当前状态，发现有未跟踪文件

git add . #当前目录所有文件添加到暂存区

git diff # 比较当前工作区和暂存区有何不同

git commit -m "注释" #把暂存区内容提交到本地仓库

git push -u origin develop #把本地仓库的提交推送到远程仓库

git log #查看提交日志
```

### 二、Git 本地分支管理

1、分支的创建、合并、删除

``` bash
git branch # 显示所有分支

git branch b1 # 从当前分支创建一个叫 b1 的分支

git checkout b1 # 切换到 b1 分支

git checkout -b b1 # 相当于以上两条命令的组合

git checkout master # 切换到 master 主分支

git merge b1 # 把 b1 分支的代码合并到 master 上

git branch -d b1 # 删除 b1 分支，不能在被删除分支上执行
```

### 三、Git Tag 标签管理

标签的创建、删除

```bash
git tag t1 # 从当前分支创建一个名为 t1 的标签

git tag -d t1 #删除名为 t1 的标签
```

### 三、GitLib 权限管理

- Owner 项目所有者，拥有所有的操作权限

- Master 项目的管理者，除更改、删除项目元信息外其它操作均可

- Developer 项目的开发人员，做一些开发工作，对受保护内容无权限

- Reporter 项目的报告者，只有项目的读权限，可以创建代码片断

- Guest 项目的游客，只能提交问题和评论内容

具体参见 GitLab 权限，为项目添加成员时可指定成员的身份权限。

### 四、为什么要有分支

建立分支的原因是 git 因为是分布式的，所以其核心就是分支，分支的意义在于，可以将项目代码按照功能、模块拆分成不同的分支。比如这个产品要加一个支付功能和一个登陆功能，可以创建两个分支，交给不同的开发人员并行开发。登陆功能先开发完，测试无误后合并该分支到 master 分支，master 分支部署上线。支付功能虽然没有开发完成，但是在另一条分支上，所以产品上线和功能开发完全不受影响。这才是分布式开发的高效模式。还有这样，以自己名字建立一个分支比如 xiancai，这个分支是已经做好的功能，随时可以合并到 master 上线，开发的时候，建立一个带功能前缀的分支，比如 xiancai-ninghao 、xiancai-ninghao 等等，开发完之后在合并到 xiancai，每次上线，把 xiancai 合并到 master 。总之分支的做重要的意义就是提高效率！！！ 这样方便团队开发，并且不会导致混乱。

### 五、常见分支有如下几条：

1、Master 主分支

2、Develop 分支

3、Feature 功能分支

4、Release 预发布分支

5、Hotfix（或者 Fixbug） 分支

其中对于 Feature 功能分支有:

- 从哪个分支分离开来：develop

- 必须要合并到哪个分支上：develop

- 分支的命名规范：除了 master，develop，release-，或者 hotfix- 以外的名字都可以比如可以用 feature-\*的方式命名。

其中对于 Release 预发布分支有：

- 从哪个分支分离开来： develop

- 必须要合并到哪个分支上：develop 与 master

- 分支的命名规范： release-\*

其中对于 Hotfix（或者 Fixbug） 分支有；

- 从哪个分支分离开来：master

- 必须要合并到哪个分支上：develop 与 master

- 分支的命名规范：hotfix-_ 或者 fixbug-_

### 六、分支说明

#### 1、Master 主分支

首先，代码库应该有一个、且仅有一个主分支。所有提供给用户使用的正式版本，都在这个主分支上发布。Git 主分支的名字，默认叫做 Master。它是自动建立的，版本库初始化以后，默认就是在主分支在进行开发。

#### 2、Develop 分支

主分支只用来发布重大版本，日常开发应该在另一条分支上完成。我们把开发用的分支，叫做 Develop。

(1) 创建分支

```bash
git branch develop    #只创建分支
git checkout develop  #创建并切换到 develop 分支
```

(2) 合并分支

```bash
git checkout master         #切换到主分支
git merge --no-ff develop   #把 develop 合并到 master 分支，no-ff 选项的作用是保留原分支记录
git branch -d develop       #删除 develop 分支
```

这里稍微解释一下，上一条命令的 --no-ff 参数是什么意思。默认情况下，Git执行"快进式合并"（fast-farward merge），会直接将 Master 分支指向 Develop 分支。

#### 3、次分支

除了 master 与 develop 这两个主分支，在开发时还可以创建一些次分支，目的是让团队不同的成员之间可以平行开发，更容易跟踪功能，准备为生产的发行版，快速修复生产上的问题等等。这些分支生命周期有限，可以在用完以后删掉他们。

#### 4、Feature 功能分支

Feature（功能） 分支，有时候也叫 Topic 分支。在这种分支上去开发新的功能。当开发功能的时候，这个功能属于哪个目标发行还不知道。功能如果一直在开发，对应的这个功能分支就可以一直存在，不过到最后还是要合并到 develop 分支上，或者如果不想要开发的这个功能了，可以直接扔掉它。

功能名字的命名已经在上文中有提到。

创建一个功能分支：

```bash
git checkout -b feature-x develop
```

开发完成后，将功能分支合并到develop分支：

```bash
git checkout develop
git merge --no-ff feature-x
```

删除feature分支：

```bash
git branch -d feature-x # Release 预发布分支
```

#### 5、Release 功能分支

它是指发布正式版本之前（即合并到Master分支之前），我们可能需要有一个预发布的版本进行测试。预发布分支是从Develop分支上面分出来的，预发布结束以后，必须合并进 Develop 和 Master 分支。它的命名，可以采用release-*的形式。

创建一个预发布分支：

```bash
git checkout -b release-1.2 develop
```

确认没有问题后，合并到master分支：

```bash
git checkout master
git merge --no-ff release-1.2
```

对合并生成的新节点，做一个标签

```bash
git tag -a 1.2
```

再合并到develop分支：

```bash
git checkout develop
git merge --no-ff release-1.2
```

最后，删除预发布分支：

```bash
git branch -d release-1.2
```

#### 6、Fixbug 修补bug分支

最后一种是修补bug分支。软件正式发布以后，难免会出现bug。这时就需要创建一个分支，进行 bug 修补。 修补 bug 分支是从 Master 分支上面分出来的。修补结束以后，再合并进 Master 和 Develop 分支。它的命名，可以采用 fixbug-* 的形式。

创建一个修补bug分支：

```bash
git checkout -b fixbug-0.1 master
```

修补结束后，合并到master分支：

```bash
git checkout master
git merge --no-ff fixbug-0.1
git tag -a 0.1.1
```

再合并到develop分支：

```bash
git checkout develop
git merge --no-ff fixbug-0.1
```

最后，删除"修补bug分支"：

```bash
git branch -d fixbug-0.1
```
