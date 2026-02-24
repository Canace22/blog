---
title: 说说 Vuex
description: 'vuex 适合多组件共享状态的场景，避免组件间传值混乱，提升代码可维护性。'
categories: Web开发
tags: [前端, 框架与库]
comments: true
toc: true
date: 2020-08-10 09:01:18
---
### 一、为什么要说 Vuex

上周在做项目的时候，有一个模块用到了一个章节组件，一个 content 组件，其中章节组件调用了一个 tree 组价用来递归章节列表。选中章节组件中的项，需要更新到 content 的已选章节部分，取消章节选项，已选章节也需要删除对应的项，此外，删除已选章节中的某一项，也需要更新左侧章节列表，比如这样：

![示例](https://raw.githubusercontent.com/Canace22/Assets/main/images/vuex-ex.gif)

我一开始的做法是使用组件间传数据，但是实践之后会发现一些问题，比如选中框是 checkbox 双向数据绑定，这里有三个组件，传来传去的容易绕，状态更新稍有一些逻辑问题可能会找半天。想了一会，去问了前端大佬，感觉豁然开朗，写久了小程序，我竟然把 vuex 给忘了，这种场景不就很适合用 vuex 嘛。 不过归根究底，还是我对 vuex 的使用场景没有研究过，导致用的时候想不起他来，下面就是我研究之后的一些结论啦。

### 二、Vuex 应用场景

中大型单页应用，需要多个组件共享状态的时候，用 Vuex 可以达到事半功倍的效果。这里多个组件需要共享状态，可以有以下两种情况：

(1) 多个视图依赖于同一状态

(2) 来自不同视图的行为需要变更同一状态

比如上面我说的那个例子，章节选中状态和已选章节都是依赖于同一份数据的，并且章节变更需要修改的状态和删除已选章节需要修改的状态也是同一个，这个时候使用 vuex 就再合适不过了。

中大型应用用 vuex，那么小型应用也有类似的需求要用什么呢？ Vue 教程中状态管理模块给出了一个简单状态管理的 demo，也就是 Vuex 文档中提到的 store 模式，该模式参照 Flux 实现了 action 触发 state 变更，state 触发视图更新的逻辑，以达到多个组件共同维护一份数据的目的。

```js
// store 模式
var store = {
  debug: true,
  state: {
    message: 'Hello!'
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}

// 多个组件共享一份数据，通过 action 更新 state 中的数据状态
var vmA = new Vue({
  data: {
    privateState: {},
    sharedState: store.state
  }
})

var vmB = new Vue({
  data: {
    privateState: {},
    sharedState: store.state
  }
})
```

### 三、Flux

上面提到了 Flux，那么 Flux 是什么呢？Flux 是一种软件架构思想，facebook 在该思想的基础上实现了 Flux 框架，但是我们这里要讲的是 Vuex 所借鉴的 Flux 思想。Flux 把数据的流动分为四个阶段，View(视图层)、Action(视图层发出的消息)、Dispatcher(用来接收Actions、执行回调函数) 以及 Store(用来存放应用的状态，一旦发生变动，就提醒Views要更新页面)，他们之间的流动方式是这样的：

![Flux 数据流](https://raw.githubusercontent.com/Canace22/Assets/main/images/flux.png)

从上图可以看出，Flux 思想下的数据流动是单向的

参考文献：

[Vuex 是什么？](https://vuex.vuejs.org/zh/)

[类 Flux 状态管理的官方实现](https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)

[Flux 架构入门教程](http://www.ruanyifeng.com/blog/2016/01/flux.html)