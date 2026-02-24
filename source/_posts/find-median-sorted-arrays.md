---
title: 找出两个有序数组的中值
categories: 编程基础
tags: 计算机科学
comments: true
date: 2020-08-03 10:01:18
---
### Problem

```md
There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity 
should be O(log (m+n)).

You may assume nums1 and nums2 cannot be both empty.

Example 1:
nums1 = [1, 3]
nums2 = [2]
The median is 2.0

Example 2:
nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
```

### Solution

暴力破解法，使用归并排序，把两个数组按照从小到大的排序方式合并到一个数组里，在新的数组里找中值

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  // brute force
  // 归并排序
  const merged = [];
  let i = 0;
  let j = 0;
  const [lenA, lenB] = [nums1.length, nums2.length];
  while (i < lenA && j < lenB) {
    if (nums1[i] < nums2[j]) {
      merged.push(nums1[i]);
      i++;
    } else {
      merged.push(nums2[j]);
      j++;
    }
  }
  while (i < lenA) {
    merged.push(nums1[i]);
    i++;
  }
  while (j < lenB) {
    merged.push(nums2[j]);
    j++;
  }

  const { length } = merged;
  return length % 2 === 1
    ? merged[Math.floor(length / 2)]
    : (merged[length / 2] + merged[length / 2 - 1]) / 2;
};

const test = [[[1,3],[2]],[[1,2],[3,4]]]

test.forEach(ele => {
  const res = findMedianSortedArrays(ele[0], ele[1]);
  console.log(res);
})
```