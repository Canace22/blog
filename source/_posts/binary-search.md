---
title: 二分查找
categories: 编程基础
tags: 计算机科学
description: '二分查找能高效定位目标值 但需注意边界条件和中点计算方式避免死循环'
comments: true
date: 2021-04-09 14:22:50
---

讲二分查找之前，先来看看下面这道题

```md
给定一个  n  个元素有序的（升序）整型数组  nums 和一个目标值  target  ，写一个函数搜索  nums  中的 target，如果目标值存在返回下标，否则返回 -1。

示例 1:
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4

示例  2:
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1

提示：
你可以假设 nums  中的所有元素是不重复的。
n  将在  [1, 10000]之间。
nums  的每个元素都将在  [-9999, 9999]之间。
```

看到这道题，我们的第一反应是不是遍历一遍，当前值与目标值相同，就返回索引？所以最简单粗暴的做法可以这样：

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  var len = nums.length;

  for (var i = 0; i < len; i++) {
    if (nums[i] === target) {
      return i;
    }
  }
  return -1;
};
```

上述解题方法是我们常用的方法，也叫作线性搜索，假若我们要查找的数在最末尾一个，这种方法可能会把所有元素都遍历一遍。

那有没有稍微简单一点的方法呢？二分查找就是比这个简单，而且效率更高的方法。

二分查找的思路如下：

1. 标记出最左边和最右边的数字

2. 取中值，若目标值比中值还大，那么就把最左边的值替换为上一次中值的下一个，否则，把右边的值替换为中值的前一个值，以此类推，直到二者之间没有中值，返回索引。
    
这种方法去实现，可以减少遍历次数和比较次数，这里是我实现的简单的二分查找解法：

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  var len = nums.length;
  var L = 0;
  var R = len - 1;

  while (L <= R) {
    var M = Math.floor((L + R) / 2);
    if (nums[M] === target) return M;
    if (nums[M] < target) {
      L = M + 1;
    } else {
      R = M - 1;
    }
  }
  return -1;
};
```

题目来源：力扣(LeetCode)
