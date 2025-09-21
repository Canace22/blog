---
title: 四个JS小技巧
comments: true
date: 2019-07-16 23:12:58
categories: Web开发
tags: JavaScript&TypeScript
---

## 一、尽早结束

```javascript
function transformData(rawData) {
  // check if no data
  if (!rawData) {
    return [];
  }

  // check for specific case
  if (rawData.length == 1) {
    return [];
  }

  // actual function code goes here
  return rawData.map(item => item);
}
```

这种写法的好处：

- 考虑到了无效值和边界的情况，并且很好的规避了它们
- 代码简洁
- 后期维护起来比较方便
- 一旦接受了这种代码风格，你会更加重视发挥函数的作用并且对代码至上而下的执行过程会更加明了

## 二、使用对象而不是 switch

```javascript
// Switch
let createType = null;
switch (contentType) {
  case 'post':
    createType = () => console.log('creating a post...');
    break;
  case 'video':
    createType = () => console.log('creating a video...');
    break;
  default:
    createType = () => console.log('unrecognized content type');
}

createType();

// Object literal
const contentTypes = {
  post: () => console.log('creating a post...'),
  video: () => console.log('creatinga  video...'),
  default: () => console.log('unrecognized content type'),
};

const createType = contentTypes[contentType] || contentTypes['default'];
createType();
```

这种写法的好处：

- 不必担心没写 case 或者 break
- 简洁易懂
- 对象比 switch 代码块容易写
- 代码量更少

## 三、语义化变量，而不是使用 x, y, z 这些变量

```javascript
// bad
const foo = y && z;

// good
const isPostEnabled = isPost && postDateValid;
```

## 四、 尽量使用三元表达式代替简单的 if········else······

```javascript
let result = null;
if (conditionA) {
  if (conditionB) {
    result = 'A & B';
  } else {
    result = 'A';
  }
} else {
  result = 'Not A';
}

const result = !conditionA ? 'Not A' : conditionB ? 'A & B' : 'A';
```
