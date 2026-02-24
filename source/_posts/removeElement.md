---
title: 原地删除数组中的指定元素
categories: 编程基础
tags: 计算机科学
comments: true
date: 2020-08-04 09:54:56
---
### Problem

```md
Given an array nums and a value val, remove all instances of that value in-place
 and return the new length.

Do not allocate extra space for another array, you must do this by modifying the
 input array in-place with O(1) extra memory.

The order of elements can be changed. It doesn't matter what you leave beyond the
 new length.

Example 1:
Given nums = [3,2,2,3], val = 3,
Your function should return length = 2, with the first two elements of nums being
 2.

It doesn't matter what you leave beyond the returned length.

Example 2:
Given nums = [0,1,2,2,3,0,4,2], val = 2,
Your function should return length = 5, with the first five elements of nums
 containing 0, 1, 3, 0, and 4.
Note that the order of those five elements can be arbitrary.

It doesn't matter what values are set beyond the returned length.
Clarification:

Confused why the returned value is an integer but your answer is an array?

Note that the input array is passed in by reference, which means modification
 to the input array will be known to the caller as well.

Internally you can think of this:

// nums is passed in by reference. (i.e., without making a copy)
int len = removeElement(nums, val);

// any modification to nums in your function would be known by the caller.
// using the length returned by your function, it prints the first len elements.
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

### Solution

1、设置双指针 i, j, 其中指针 j 每次向前移动一步

2、 遍历 nums，当 nums[j] !== val 时，说明不是指定的元素, 指针 i 向前挪动一步， 同时把 nums[j] 赋值给 nums[i]

3、结果返回 i 

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  if (!nums.length) return 0;

  const len = nums.length;
  let i = 0;

  for (let j = 0; j < len; j++) {
    if (nums[j] !== val) {
      nums[i] = nums[j];
      i++
    }
  }
  return i
};

const test = [[[3, 2, 2, 3], 3], [[0, 1, 2, 2, 3, 0, 4, 2], 2]];

test.forEach(ele => {
  const res = removeElement(ele[0], ele[1]);
 
  console.log('result:', res);
})
```