---
title: 爬楼梯
categories: 编程基础
tags: 计算机科学
comments: true
date: 2020-02-14 10:07:54
---

### 题目

```md
假设你正在爬楼梯。需要 n  阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

示例 1：

输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。

1.  1 阶 + 1 阶
2.  2 阶

示例 2：

输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。

1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/climbing-stairs
```

### 题解

(1) 暴力破解法，动态规划，把问题缩小为 1 阶和 2 阶问题，这种写法的问题是效率太低，提交之后没通过，因为超时了。

```js
var climbStairs = function (n) {
  return climb_stairs(0, n);
};

var climb_stairs = function (i, n) {
  if (i > n) {
    return 0;
  }
  if (i === n) {
    return 1;
  }
  return climb_stairs(i + 1, n) + climb_stairs(i + 2, n);
};
```

(2) 记忆化递归，优化了上述算法，每次递归之后吧值存起来，减少冗余

```js
var climbStairs = function (n) {
  const memo = [];
  return climb_stairs(0, n, memo);
};

var climb_stairs = function (i, n, memo) {
  if (i > n) {
    return 0;
  }
  if (i === n) {
    return 1;
  }
  if (memo[i] > 0) {
    return memo[i];
  }

  memo[i] = climb_stairs(i + 1, n, memo) + climb_stairs(i + 2, n, memo);

  return memo[i];
};
```
