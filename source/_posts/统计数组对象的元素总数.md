---
title: 统计数组对象的元素总数
categories: 编程基础
tags: 计算机科学
description: 统计数组对象的元素总数
author: Canace
comments: true
date: 2024-03-05 14:35:51
---
```js
function getTreeCount(treeArr) {
  let count = 0;
  for (let i = 0; i < treeArr.length; i++) {
    count++;
    if (treeArr[i].children) {
      count += getTreeCount(treeArr[i].children);
    }
  }
  return count;
}
// 输入
let tree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3
          }
        ]
      }
    ]
  },
  {
    id: 4,
    children: [
      {
        id: 5
      }
    ]
  }
];

// 输出
5

console.log(getTreeCount(tree));
```