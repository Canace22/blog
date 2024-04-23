---
title: webpack+gulp 打包 vue 组件库
categories: web
tags: 工程化
description: 参照 element-ui 实现按需引入的 vue 组件库
comments: true
date: 2020-05-15 08:44:46
---
### 一、需求

公司的项目中有很多个的首页用了同一个主题的 UI，每次一调整，多个项目都要去改，很麻烦。页面要适配桌面版，1280-1920 分辨率以及 100% - 150% 的放缩，每个项目都去适配会浪费很多人力在上面，效率很低。之前用 vue-cli3 自带的打包方式 封装了一版组件库，但是发现并不是很灵活，每次改起来还是有点麻烦，加上不能按需引入，每次打包 app.js 都比较大，这就需要升级了。就在想能不能写成 element-ui 这种模式，按需引入，组件的维护成本也比较低，说干就干，阅读了一下 element-ui 源码，研究了一下它的构建方式，感觉很符合我的需求，于是有了 exp-ui 库的进阶版，当然该 ui 库尚未开源，只上传到了公司私有 npm。

### 二、项目架构设计

项目目录如下：

```md
.
├── README.md
├── build
├── components.json
├── config.sh
├── ex.png
├── example
├── lib
├── node_modules
├── package.json
├── packages
├── postcss.config.js
├── src
├── static
└── yarn.lock
```

vue 组件以组件名称命名目录，存放于 packages 目录下，每个组件都有自己独立的环境，不会对其他组件进行干扰。组件以插件的形式导出，导出模式如下：

```js
import EXCard from './src/main.vue';

/* istanbul ignore next */
EXCard.install = function (Vue) {
  Vue.component(EXCard.name, EXCard);
};

export default EXCard;
```

components.json 是所有组件的配置文件，每添加或删除一个组件，只需要对 components.json 列表进行增删即可，无需做另外的工作。

src/index.js 是全部组件的编译文件入口，由 components.json 文件构建而成。

综上可以整理出如下组件构建图：

![组件构件图](https://raw.githubusercontent.com/Canace22/Assets/main/images/webpack-component.png)

组件构建出来其实是有问题的，按需引入的时候找不到样式，所以这里样式需要单独构建，构建方式如下：

![css 构件图](https://raw.githubusercontent.com/Canace22/Assets/main/images/css-gulp.png)

以上就是该项目的架构设计思路，接下来要解决的是一些构建的问题。

