---
title: 整数反转
description: '反转整数时要判断是否溢出，否则返回 0。'
comments: true
date: 2020-02-19 09:31:18
categories: 编程基础
tags: 计算机科学
---

### 题目

```
# 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

# 示例 1:
# 输入: 123
# 输出: 321

#  示例 2:
# 输入: -123
# 输出: -321

# 示例 3:
# 输入: 120
# 输出: 21
# 注意:

# 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231, 231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

# 来源：力扣（LeetCode）
# 链接：https: // leetcode-cn.com/problems/reverse-integer
```

### 思路

1、 确定最大边界值和最小边界值

2、 当数字不等于 0 时，执行以下操作：

(1) 获取当前位数字（整数）

(2) 获取去掉当前位数字后，余下的数字（整数）

(3) 按位与边界值比较，若当前位数字大于最大边界值去掉最高位或者当前位数字等于最大边界值去掉最高位而且接下来要添加的数字大于 7，则溢出，返回 0，这里 7 作为下一位的判断值，是因为最大边界值的最后一位是 7

(4) 按位与边界值比较，若当前位数字小于于最小边界值去掉最高位或者当前位数字等于最小边界值去掉最高位而且接下来要添加的数字小于 -8，则溢出，返回 0，这里 -8 作为下一位的判断值，是因为最小边界值的最后一位是 8

(5) 否则，数字反转

### 题解

js 题解

```js
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const edge = 2 ** 31;
  const INT_MAX = edge - 1;
  const INT_MIN = -edge;

  let rev = 0;
  while (x !== 0) {
    const pop = ~~(x % 10);

    x = ~~(x / 10);
    if (rev > INT_MAX / 10 || (rev === INT_MAX / 10 && pop > 7)) return 0;
    if (rev < INT_MIN / 10 || (rev === INT_MIN / 10 && pop < -8)) return 0;
    rev = rev * 10 + pop;
  }
  return rev;
};

console.log('123:', reverse(123));
console.log('-123:', reverse(-123));
```

python 题解

```python
class Solution:
    def reverse(self, x):
        INT_MAX = 2**31
        INT_MIN = -2**31
        cur = 0
        while x != 0:
            if (x < 0):
                pop = int(x % -10)
            else:
                pop = int(x % 10)
            if cur > INT_MAX / 10 or (cur == INT_MAX / 10 and pop > 7):
                return 0
            if cur < INT_MIN / 10 or (cur == INT_MIN / 10 and pop < -8):
                return 0
            cur = cur * 10 + pop
            x = int(x/10)
        return cur

    def _init_(self):
        print(res.reverse(-123))
        return self.reverse(-123)

res = Solution()
res._init_()
```
