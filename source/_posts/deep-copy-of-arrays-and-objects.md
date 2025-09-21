---
title: 数组、对象的深拷贝
comments: true
date: 2019-06-30 14:19:26
categories: Web开发
tags: JavaScript&TypeScript
---

## 数组的深拷贝

```js
function copyObjectArray(x) {
  return [...JSON.parse(JSON.stringify(x))];
}

// example 1
const test = [
  {
    name: 'Amy',
    age: 18,
  },
];
let test1 = copyObjectArray(test);
test1[0].name = 'Jack';
console.log(test, test1);
// test: [ { name: 'Amy', age: 18 } ] test1: [ { name: 'Jack', age: 18 } ]
```

## 对象的深拷贝

```js
function copyObject(x) {
  return {
    ...JSON.parse(JSON.stringify(x)),
  };
}

// example 2
const test2 = {
  name: ['jack', 'sarah', 'ray'],
};
test3 = copyObject(test2);
test3.name[0] = '小红';
console.log(test2, test3);
// test2: { name: [ 'jack', 'sarah', 'ray' ] } test3：{ name: [ '小红', 'sarah', 'ray' ] }
```
