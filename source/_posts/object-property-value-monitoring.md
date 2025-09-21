---
title: 对象属性值监听
comments: true
date: 2019-06-30 14:17:17
categories: Web开发
tags: JavaScript&TypeScript
---

## Demo

```js
let data = {
  title: 'hello world!',
};

function definePropertyData(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    get: function() {
      console.log(111);
      return value;
    },
    set: function(newValue) {
      value = newValue;
    },
  });
}

definePropertyData(data, 'title', data.title);

console.log(data.title); // 111 hello world!
data.title = 38;
console.log(data.title); // 111 38
```
