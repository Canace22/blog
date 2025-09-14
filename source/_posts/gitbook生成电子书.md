---
title: gitbook 生成电子书
categories: 工程化与运维
tags: git
description: 使用 Gitbook CLI, Github Pages, Github Actions CI/CD, 和 Calibre 生成电子书
comments: true
date: 2020-05-17 13:54:19
---
1、全局安装 gitbook-cli: `npm i gitbook-cli -g`

2、创建 gitbook 项目并运行：

```bash
gitbook init softwareengineering
cd softwareengineering
gitbook serve
```

效果图：

![git book init](https://raw.githubusercontent.com/Canace22/Assets/main/images/gitbook-website.png)

3、 生成 ssh 秘钥: 

```shell
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
```

4、打开 github 项目 setting，把公钥添加到项目的 deploy keys 中，把私钥添加到项目的 secrets 中

5、添加 ci 文件，"./github/workflows/deploy.yml"，内容如下：

```yml
name: 'deploy website and ebooks'

on:
  push:
    branches:
      - master

jobs:
  job_deploy_website:
    name: 'deploy website'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: '10.x'
      - name: 'Installing gitbook cli'
        run: npm install -g gitbook-cli
      - name: 'Generating distributable files'
        run: |
          gitbook install
          gitbook build
      - uses: peaceiris/actions-gh-pages@v2.5.0
        env:
          ACTIONS_DEPLOY_KEY: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: ./_book
```

6、把本地项目 push 到 github，点击 ACTION 会发现 github 在自动编译部署我们的项目了

```shell
cd softwareengineering

# ignore certain directory
touch .gitignore
echo '_book' >> .gitignore

# init git repo
git init
git add .
git commit -m "init"
git remote add origin git@github.com:novalagung/softwareengineering.git

# push
git push origin master
```

7、生成电子书，在 ci 中添加一个阶段，最终 ci 如下

```yml
name: 'deploy website and ebooks'

on:
  push:
    branches:
      - master

jobs:
  job_deploy_website:
    name: 'deploy website'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: '10.x'
      - name: 'Installing gitbook cli'
        run: npm install -g gitbook-cli
      - name: 'Generating distributable files'
        run: |
          gitbook install
          gitbook build
      - uses: peaceiris/actions-gh-pages@v2.5.0
        env:
          ACTIONS_DEPLOY_KEY: ${{ secrets.ACTION_DEPLOY_KEY }}
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: ./_book
  job_deploy_ebooks:
    name: 'deploy ebooks'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: '10.x'
      - name: 'Installing gitbook cli'
        run: npm install -g gitbook-cli
      - name: 'Installing calibre'
        run: |
          sudo -v
          wget -nv -O- https://download.calibre-ebook.com/linux-installer.sh | sudo sh /dev/stdin
      - name: 'Preparing for ebooks generations'
        run: |
          gitbook install
          mkdir _book
      - name: 'Generating ebook in pdf'
        run: gitbook pdf ./ ./_book/${{ env.ebook_name }}.pdf
      - name: 'Generating ebook in epub'
        run: gitbook epub ./ ./_book/${{ env.ebook_name }}.epub
      - name: 'Generating ebook in mobi'
        run: gitbook mobi ./ ./_book/${{ env.ebook_name }}.mobi
      - uses: peaceiris/actions-gh-pages@v2.5.0
        env:
          ACTIONS_DEPLOY_KEY: ${{ secrets.ACTION_DEPLOY_KEY }}
          PUBLISH_BRANCH: ebooks
          PUBLISH_DIR: ./_book
```

8、再次上传文件，编译之后发现多了一个 ebooks 分支，生成了 mobi、pdf以及 epub 三种格式的电子书，点击就可以下载了。