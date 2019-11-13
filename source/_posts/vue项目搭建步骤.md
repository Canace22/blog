---
title: vue 项目搭建步骤
comments: true
date: 2018-10-22 19:35:38
categories: web
tags: vue
---

### 一、 初始化项目

1. 安装 vue-cli3: `sudo npm install -g @vue/cli-service-global`
2. 卸载旧版本的 vue-cli: `sudo npm uninstall -g vue-cli`
3. 更新到 vue-cli3： `sudo npm install -g @vue/cli`
4. 创建项目，选项：preset（default）、package manage(npm)、安装相关插件（建议不要用淘宝的 npm，因为在使用的时候有点坑，之前项目中就被这个坑过）: `vue create flash-experiment`
5. 切换到项目目录: `cd flash-experiment`
6. 启动项目： `npm run serve`
7. 查看 vue-cli 相关命令: `vue create --help`
8. 打开图形化项目管理器，查看相关配置：`vue ui`
9. 添加插件
   ```js
   vue add @vue/eslint
   vue add router //特殊添加插件的情况
   vue add vuex   //特殊添加插件的情况
   ```
10. 加入 sass 支持，把一下语句加到 package.json 中：
    ```js
    "node-sass": "^4.9.0",
    "sass-loader": "^7.0.1",
    ```
11. 添加组件，在视图中注册组件，并配置相关路由
12. 编写组件
13. 引入 [elementUI](http://element-cn.eleme.io/#/zh-CN/component/pagination)
14. 引入 [axios](https://github.com/axios/axios)

### 二、 git 配置

1. 之前没有 git

   ```git
   cd existing_folder
   git init
   git remote add origin git@gitlab.dreamdev.cn:ebag/flash-experiment.git
   git add .
   git commit -m "Initial commit"
   ```

2. 已有 git

   ```git
   git remote set-url origin git@gitlab.dreamdev.cn:ebag/live-experiment.git
   git remote -v
   git branch --set-upstream-to=origin/develop develop
   git branch --set-upstream-to=origin/master master
   ```
