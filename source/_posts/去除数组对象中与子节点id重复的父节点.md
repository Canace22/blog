---
title: 去除数组对象中与子节点id重复的父节点
categories: 算法
tags: JavaScript
description: 去除数组对象中与子节点id重复的父节点
author: Canace
comments: true
date: 2024-03-04 13:56:22
---

```js
function filterTree(tree) {
  let levelMap = new Map();
  const result = [];
  const setLevel = (tree, level = 1) => {
    for (let index = 0; index < tree.length; index++) {
      const element = tree[index];
      element.level = level;
      if (!levelMap.has(element.id)) {
        levelMap.set(element.id, level);
      } else if (levelMap.get(element.id) < level) {
        levelMap.set(element.id, level);
      }
      if (element.children?.length) {
        setLevel(element.children, element.level + 1);
      }
    }
  };
  setLevel(tree);
  return tree.filter((v) =>
    levelMap.get(v.id) ? levelMap.get(v.id) === 1 : true
  );
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
  },
  {
    id: 3
  },
  {
    id: 5
  }
];

// 输出
[
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

console.log(filterTree(tree));
```
