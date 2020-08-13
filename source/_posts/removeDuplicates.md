---
title: 原地删除数组中的重复值
categories: 算法
tags: algorithmn
comments: true
date: 2020-08-04 9:10:08
---
### Problem

```md
Given a sorted array nums, remove the duplicates in-place such that each element
 appear only once and return the new length.

Do not allocate extra space for another array, you must do this by modifying the
 input array in-place with O(1) extra memory.

Example 1:
Given nums = [1,1,2],
Your function should return length = 2, with the first two elements of nums being
 1 and 2 respectively.
It doesn't matter what you leave beyond the returned length.

Example 2:
Given nums = [0,0,1,1,1,2,2,3,3,4],
Your function should return length = 5, with the first five elements of nums being
 modified to 0, 1, 2, 3, and 4 respectively.
It doesn't matter what values are set beyond the returned length.
Clarification:

Confused why the returned value is an integer but your answer is an array?

Note that the input array is passed in by reference, which means modification to 
the input array will be known to the caller as well.

Internally you can think of this:

// nums is passed in by reference. (i.e., without making a copy)
int len = removeDuplicates(nums);

// any modification to nums in your function would be known by the caller.
// using the length returned by your function, it prints the first len elements.
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

### Solution

1、设置双指针 i, j, 其中指针 j 每次向前移动一步

2、 遍历 nums，当 nums[i] !== nums[j] 时，说明不是重复元素, 指针 i 向前挪动一步， 同时把 nums[j] 赋值给 nums[i]

3、结果返回 i + 1

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const len = nums.length;
  if (!len) return 0;
  
  let i = 0;

  for (let j = i; j < len; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
};

const test = [
  [1, 1, 2],
  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
];

test.forEach(ele => {
  const result = removeDuplicates(ele);
  console.log('result:', result);
})
```

题目的要求是拿到不重复元素的长度，其实上述方法以及把不重复元素都放在了 (0, n) 位，要取不重复元素集合只需要切割 (0, res) 就可以了。通过不断的用不重复的下一个元素替换掉当前的重复元素，达到去重的目的，细细品味，还是很有意思的。