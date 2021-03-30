---
title: Vue 对象响应式实现
categories: web
tags: vue
comments: true
toc: true
description: 数据变化侦测的实现
date: 2020-03-03 09:59:23
---

## 一、数据变化侦测的实现

在 Object 对象中有个 defineProperty 方法可以直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象，该方法接收三个参数，分别是：需要修改属性值的 obj，要定义或修改的属性名称 prop，将被定义或修改的属性描述符 descriptor。其中描述符中有 get 和 set 两个方法，当对应的属性被读取时，会触发对象的 get 方法，当对应属性的值被重置时，会触发对象的 set 方法。Vue 就是利用这一特性实现数据的变化侦测的，下面看一下一个简单的模拟 Vue 数据侦测的 Demo：

```js
let data = {
  title: 'hello world!'
};

function definePropertyData(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    get: function() {
      console.log(111);
      return value;
    },
    set: function(newValue) {
      value = newValue;
    }
  });
}

definePropertyData(data, 'title', data.title);

console.log(data.title); // 111 hello world!
data.title = 38;
console.log(data.title); // 111 38
```

在上面的 Demo 中，data 对象模拟 Vue 中的 data 数据集，definePropertyData 函数模拟 Vue 中的数据侦测函数，当读取 data.title 时，会进入 get 函数，打印 111，当设置 data.title 为新的值 38 时，会触发 set 函数。

当然 Vue 的实现会更复杂,通过递归，深层遍历对象，使所有对象的属性都成为可观测对象，defineReactive 函数就是以上 demo 的深入封装，用于使对象属性变得可观测。除了对象，还有数组的观测，采用的是扩展原型链，通过以上方法观测原型对象的方式实现：

```ts
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor(value: any) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj: Object) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}
```

## 二、数据驱动视图的实现

数据驱动视图，怎么去更新对应的视图，这里引入了依赖管理器 Dep，用于操作视图数组，在 getter 中收集依赖，把对应的依赖存入数组中，在 setter 中通知依赖更新，当依赖数组更新时，会触发 Watcher 类，对视图进行更新。

```ts
/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```

## 三、数据侦测的 bug

当我们向 object 数据里添加一对新的 key/value 或删除一对已有的 key/value 时，它是无法观测到的，导致当我们对 object 数据添加或删除值时，无法通知依赖，无法驱动视图进行响应式更新，这里的解决方法是手动 set 新的 key/value 或者 delete。对于数组元素的增删，可使用 push、unshift、splice，触发数据变化，修改数组元素同样可使用 set 和 delete 方法。
