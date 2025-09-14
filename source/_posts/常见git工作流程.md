---
title: 常见 git 工作流程
categories: 工程化与运维
tags: git
comments: true
toc: true
date: 2020-08-10 10:22:38
---
### 一、简单的 Git 工作流程

![简单的 Git 工作流程图](https://raw.githubusercontent.com/Canace22/Assets/main/images/Basic-git-workflow.png)

最简单的 Git 工作流程是只有一个 master 分支。开发者直接把代码 commit 到 master 分支并且用该分支进行发版等操作，即不分测试版和正式版，由始至终使用一份代码，因此，这份代码的记录都是在同一分支的。

这种工作流程一般不被推荐使用，除非是开发者单独负责项目并且希望快速创建项目

因为只有一个分支，分支管理就无从谈起了，这让开发者可以轻松上手 Git，但是，使用这种工作流程，我们需要注意一些问题：

(1) 在进行代码协作的时候可能会产生一些复杂的冲突

(2) 软件 hotfix 交付到正式版的时候风险可能会更高

(3) 代码的可维护性很差

### 二、Git 功能分支工作流程

在需要进行多人项目协作的时候，Git 功能分支工作流程就很有必要登场了。

设想一个开发者在开发一个新功能的同时，另一个开发者在开发另一个功能，此时，若两个开发者用同一个分支进行协作，这会产生大量的冲突。

为了解决上述问题，这两个开发者可以各自从 master 分支切出一个独立分支，当其中一个人手头的功能写完之后，可以自行合并到 master 分支进行发布，而无需等待另一个功能完成再一起发布。

![Git 功能分支工作流程图](https://raw.githubusercontent.com/Canace22/Assets/main/images/Feature-Branch-git-workflow.png)

这种工作流程的优点是可以愉快的进行代码写作而无需担心会产生一堆的代码冲突

### 三、带有开发者分支的功能分支工作流程

这种工作流程是主流的工作流程之一，它有点像是在功能分支外，多增加了一个与 master 分支平级的开发者分支。

在这种工作流程下，master 分支总是代表着正式版的预发布状态，开发团队如果想发布版本，就会从该分支进行发布。

develop 分支往往表示下一版产品最新一次交付变更的状态，开发者从 develop 分支切出相应的功能分支，若该功能完成，则合并到 develop 分支进行测试，若无冲突，合并到 master 分支。

![有开发者分支的功能分支工作流程图](https://raw.githubusercontent.com/Canace22/Assets/main/images/feature-branch-with-develop-git-workflow.png)

这种工作流程的有点是，允许团队可以持续交付新的功能到 develop 分支进行测试，合并到 master 分支进行发版。此外，这也会为我们的团队降低烦人的代码维护成本。

### 四、Gitflow 工作流程

gitflow 工作流程与前一个工作流程非常相似，不同的是多了两个分支：release 分支和 hot-fix 分支

**hot-fix 分支**

hot-fix 分支是唯一一个从 master 分支切出并且合并回 master 的分支，该分支用于修复线上版本的一些 bug。使用这个分支的好处是，可以快速的处理线上的一些问题并发布出去，而无需经过其他流程或者是等到下次迭代再发布。

一旦 hot-fix 合并到了 master 分支并且更新出去了，应该合并到 develop 分支和当前 release 分支。这么做是为了确保从 develop 分支切出新功能分支，能拿到最新的代码。

**release 分支**

当所有功能都完成开发，并且合并到 develop 分支没有产生冲突时，从 develop 分支 fork release 分支。

该分支仅包含与发布相关的代码，比如与该版本相关的文档，bug 修复代码以及其他的一些跟此次发布相关的内容。

一旦该分支合并到 master 并且发布出去了，应该合并回 develop 分支，以确保从 develop 分支切出的新功能分支拿到的是最新代码。

![Gitflow 工作流程图](https://raw.githubusercontent.com/Canace22/Assets/main/images/GitFlow-git-workflow.png)

该工作流程由 Vincent Driessen 首次发布并广受欢迎，目前，已被广泛适用于具有预定发布周期的组织。

**git-flow**

我们可以在项目中安装 git-flow，git-flow 会为我们创建好相应分支，因为 git-flow 只是 Git 的一个外壳，所以并不会对我们的代码产生任何影响。

git-flow 安装方法

mac: `brew install git-flow`

windows: [下载](https://git-scm.com/download/win) 并安装 git-flow 客户端 => 执行 `git flow init ` 在项目中使用 git -flow

### 五、Git Fork 工作流程

Fork 工作流程在开源软件团队中很流行。

该模式下工作流程通常是这样的：

1、开发者从开源项目的官方仓库 forks 一份代码的副本到自己的仓库

2、开发者从自己的仓库 clone 代码到本地

3、在本地项目中，把开原仓库的地址附加到远程路径上

4、开发者在本地仓库中切出一个新的功能分支，修改代码，提交变更到自己的仓库

5、从自己的仓库创建一个 pull  request，请求开源项目的官方仓库合并代码

6、开源项目的官方仓库确认变更并且接受该变更，合并代码

翻译自：

[5 Git workflows you can use to deliver better code and improve your development process](https://zepel.io/blog/5-git-workflows-to-improve-development/)