---
title: github  + travis 自动构建 vue 项目到 gitpage
comments: true
date: 2019-08-04 12:27:25
categories: 工程化与运维
tags: git
---

github + travis 自动构建 vue 项目到 gitpage

<!--more-->

### 一、设置 vue.config.js，my-project 对应的是 github 上的项目名称

```js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/my-project/" : "/"
};
```

### 二、创建脚本文件 deploy.sh

```bash
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -

# 运行： .\deploy.sh args
```

### 三、配置 travis，这方面的文章很多，自行搜索即可

### 四、创建 .traivs.yml 文件

```
language: node_js
node_js:
 - "node"

cache: npm

script: npm run build

deploy:
 provider: pages
 skip_cleanup: true
 github_token: $GH_TOKEN
 local_dir: dist
 on:
   branch: master
```

### 五、上传项目代码到 GitHub
