---
title: Proxy 实现观察者模式
categories: web
tags: js
description:  使用 es6 Proxy 实现观察者模式
comments: true
date: 2020-05-28 10:11:14
---
在实际项目中，经常会有数据间的通信操作，有的时候，多个模块之间，数据具有依赖关系，比如 A 模块与 B 模块有一条数据链，两边的修改都会影响到彼此，在没有双向通信的前端框架中，这种就比较麻烦。这里，观察者模式可以发挥一些作用，让 A、B 模块都监听一个数据，可以做到一方的数据改变，通知到另一方，简化版的实现如下：

```js
class Observer {
  constructor() {
    this.callbacks = new Set();
  }
  observe(fn) {
    this.callbacks.add(fn);
  }
  sub(obj) {
    return new Proxy(obj, {
      set: (target, key, value, receiver) => {
        const result = Reflect.set(target, key, value, receiver);
        this.callbacks.forEach((observe) => observe());
        return result;
      },
    });
  }
}

const observer = new Observer();
const observer = new Observer();
const fruit = observer.sub(data);
const fruit1 = observer.sub(data);
const change = () => {
  console.log(`this is ${fruit.color} ${fruit.shape} watermelon`);
};
observer.observe(change);

fruit.color = 'yellow'; // this is yellow circle watermelon
fruit1.color = 'red'; // this is red circle watermelon
```

上例中可以看到，数据改变，就会触发 change 时间，在这个事件里面，我们可以触发视图的改变，实现响应式数据，也可以做其他的事情。