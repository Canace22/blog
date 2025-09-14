---
title: 原地删除数组中的重复值
categories: 编程基础
comments: true
date: 2022-01-11 9:10:08
---
## 来源

[26. Remove Duplicates from Sorted Array](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

## 题解

题目要求原地删除数组中的重复项，返回修改后数组的长度，其实也就是在当前数组中操作，得出不重复项长度的意思。这里我使用双指针的方法解题，声明快指针 i 和慢指针 j，都初始化为 1。用快指针遍历数组,若两个连续项不相等，说明不重复，把 nums[i] 放到 nums[j], j 向前挪动一个位置。慢指针 j 即为不重复项的长度。

```ts
function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;
  let i: number = 1,
    j: number = 1;
  for (; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[j] = nums[i];
      j++;
    }
  }
  return j;
}
```