---
title: Vue 你这是怎么了
categories: Web开发
tags: [前端,框架与库]
comments: true
toc: true
date: 2021-08-02 11:11:43
---
## 一、对象初始化

早上例行体验一下在做的项目，看看有什么问题。发现编辑界面上周还好好的，这周打开就报错了，还关不掉弹窗那种，不进发问，Vue 你这是怎么啦？上周还运行的好好的。报错如下:

```js
Error in nextTick: "TypeError: Cannot convert object to primitive value"
```

字面意思很容易懂，就是在界面更新阶段，某一个值给了对象。这种问题一般都会出现在传值的过程中，可能是某个组件要求的是一个原始值，传了对象。检查一下代码，有一个动态切换的组件，传的值有一个默认值是 `Object.create(null)`，应该是这个有问题了，把原始值改成 `null`，果然没问题了。

这里给了我一个提示，默认值最好用 null 而不是用 `Object.create(null)`。

## 二、vue-router 重复跳转

项目用 router-view 切组件，点击登出切换到登录界面报这个 error

``` js
Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location
```

虽然 error，但是不影响代码功能，看到全网竟然很一致的说加上以下代码 catch 一下 error 就可以，但是发现加了还是报错。

```js
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
```

于是我就想这个只是 catch 到 push 方法的，我还用了 replace，那就再 catch 一下 replace 的吧，最后封装函数如下

```js
// catch 路由重复跳转 error
function aviodRepeatRouter() {
    const originalPush = VueRouter.prototype.push;
    const originalReplace = VueRouter.prototype.replace;
    VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err);
    };
    VueRouter.prototype.replace = function replace(location) {
        return originalReplace.call(this, location).catch(err => err);
    };
}
aviodRepeatRouter();
```

## 三、native 修饰符滥用

native 修饰符用于监听根元素上的原生事件，这里很容易造成滥用，滥用可能会导致触发几次同一个方法，比如一个下拉框，在 option 上使用了  click.native 修饰符可能会触发两次，一次是根元素的 click, 一次是本身的 click。