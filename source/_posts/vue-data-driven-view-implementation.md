---
title: Vue 数据驱动视图更新实现
categories: Web开发
tags: [前端,框架与库]
comments: true
date: 2021-04-29 14:31:39
---

写了几年的 Vue 了，对其中的内部实现还是一知半解，日常开发中，基本问题 debug + 官方文档基本可以解决了，很少有触及源码的需求。最近发现看看源码也有好处，用的时候可能会多了一些自己的理解，知道了为什么，使用起来也更加得心应手。下面来讲讲 Vue 数据驱动视图是怎么做到的。

在讲 Vue 如何做到数据驱动视图之前，我们先来看看用纯 js 我们是如何改变页面数据的

```html
<input id="input" />
<p id="text"></p>
```

```js
const input = document.querySelector('#input');
const text = document.querySelector('#text');

input.onchange = () => {
  text.innerText = event.target.value;
};
```

从上面的 demo 可以看到在不用任何框架的情况下，我们要改变页面数据首先会先拿到 DOM，然后从 DOM 中拿到对应的数据，再去修改其他地方的数据，jQuery 的实现基本也是这种思路，页面数据的更新都是通过操作 DOM 去实现的，这意味着每次数据的更新都会操作至少一次 DOM，我们知道平凡的 DOM 操作可能会导致页面性能差而且代码不好维护等问题。而 Vue 的数据驱动视图实现可以很好的规避这些问题。

我们把上面的 demo 改一改

```js
const input = document.querySelector('#input');
const text = document.querySelector('#text');

const data = {
  text: '',
};
let val = '';
Object.defineProperty(data, 'text', {
  enumerable: true,
  configurable: true,
  get: (val) => {
    return val;
  },
  set: (newVal) => {
    val = newVal;
    changeText(val);
  },
});
function changeText(val) {
  text.innerText = val;
}
input.onchange = () => {
  data.text = event.target.value;
};
```

修改后的 demo 实现思路跟第一版有了一点不一样，第一版是直接在事件处理程序中修改视图数据的，更新后的这一版 demo 我们用了 Object 的 defineProperty 去监听数据的变化，在事件处理程序中修改数据的值，当数据值更新后，我们再去触发视图的更新，这也就是我们所说的数据驱动视图思想的一个简易实现了。

第二版 demo 我们把 data 作为数据中心，监听其中的数据变化去更新视图，但是只能监听到一个数据的变化，假如我们要监听多个数据的变化怎么办呢？再修改一下 demo

```js
const input = document.querySelector('#input');
const text = document.querySelector('#text');

const data = {
  text: '',
  style: 'color:red',
};
let val = '';
function walk(obj) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
}
function defineReactive(obj, key, val) {
  if (arguments.length === 2) {
    val = obj[key];
  }
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      if (key === 'text') {
        changeText(val);
      }
      if (key === 'style') {
        console.log('change style');
      }
    },
  });
}
walk(data);
data.style = 'I change!';
function changeText(val) {
  text.innerText = val;
}
input.onchange = () => {
  data.text = event.target.value;
};
```
这一版 demo 我们实现了监听 data 中所有数据的目标，但是不包括引用类型中包含的数据。这里有个问题，就是消费 text 数据的可能不止一个地方，可能有多个地方会消费 text，需要一一去进行视图的更新，怎么办呢？Vue 的做法是在 get 数据的时候做依赖收集，哪些地方用了 text 数据就把他放到一个数组里，在 set 中对所有依赖发布数据更新消息。

比较忙，得空接着写，未完待续……