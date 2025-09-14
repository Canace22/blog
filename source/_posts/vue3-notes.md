---
title: Vue3 实战笔记
categories: Web开发
tags: [前端, Vue, 框架与库]
description: Vue3 实战笔记
author: Canace
comments: true
toc: true
date: 2023-07-11 08:28:12
---

## 一、错误提示处理

1.`Virtual script not found, may missing <script lang="ts"> / "allowJs": true / jsconfig.json.volar`

- VS Code, 执行命令`Ctrl/Cmd+Shift+P`  输入`Volar>Reload Project`提示会消失

- 另一种方法是新建`jsconfig.json`文件，写入如下配置:
```
{
  "compilerOptions": {
    "allowJs": true
  }
}
```

## 二、遇到问题的Vue3语法

1. ref 函数返回值修改，只能通过加`.value`进行修改，附上响应式实现对比图
![响应式实现对比](https://raw.githubusercontent.com/Canace22/Assets/main/images/vue3-ref.png)

2. 父组件获取子组件实例，注意子组件一定要暴露对应的属性和方法，父组件才能拿到，不然可能一直都是空的实例，demo 如下

```js
// 子组件
const formRef = ref(null);
defineExpose({
  formRef
});
// 父组件
const childRef = ref(null);
console.log(childRef.value.formRef);
```

## 三、Vue 工具

1. [VueUse](https://vueuse.org/)：Vue 工具集

2. VSCode插件

- [Vue Language Features (Volar)](https://github.com/vuejs/language-tools): vuetur的升级版

- [Vue VSCode Snippets](https://github.com/sdras/vue-vscode-snippets):一些 vue 模板，从 vue2 就开始用到现在，一键初始化单组件页面很方便
