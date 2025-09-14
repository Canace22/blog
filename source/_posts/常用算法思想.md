---
title: 常见算法思想
categories: 编程基础
tags: 计算机科学
comments: true
toc: true
date: 2020-09-09 11:36:29
---
### 一、穷举

通过穷举所有的组合，得出结论，🌰:

```js
/**
 * 今有鸡兔同笼，上有三十五头，下有九十四足，问鸡兔各几何？
 * 解法：通过题目可以知道，鸡和兔的总数量为0-35只，
 * 我们可以假设鸡为0，兔子为35，用鸡的个数*2+兔子的个数*4就可以得到总的脚
 的数量，如果等于94，那么便是答案，
 * 如果不等，则鸡的数量+1，兔子数量-1，依次类推，穷举所有情况直到得到答案
 */
var enumeratingAlgorithm = (head, foot) => {
  let j;
  for (let i = 0; i <= head; i++) {
    //i代表鸡的数量
    //j代表兔子的数量
    j = head - i;
    if (i * 2 + j * 4 === foot) {
      console.log("鸡的个数为[ %d ]只,兔子的个数为[ %d ]只。", i, j);
      return;
    }
  }
};
enumeratingAlgorithm(35, 94); 
// 鸡的个数为[ 23 ]只,兔子的个数为[ 12 ]只。
```

### 二、递推

通过前面的子集推出最终的结论, 🌰:

```js
/**
 * 如果一对两个月大的兔子以后每一个月都可以生一对小兔子，而一对新生的兔子出生两个月后才可以生
 小兔子。
 * 那么假定一年没有产生兔子死亡事件，问一年后共有多少对兔子？
 * 解法：
 * 头两个月，兔子都是只有一对，第三个月是2对，第四个月是3对，第五个月是5对。。。
 * 由此可以看出。从第三个月开始，每个月的兔子对数，等于前两个月之和。
 * 所以第n个月的兔子对数为 fₙ = fₙ₋₂ + fₙ₋₁
 *
 * @param month 月份
 */
var recursiveDeduceAlgorithm = (month) => {
  let f1, f2;
  if (month === 1 || month === 2) {
    return 1;
  }
  f1 = recursiveDeduceAlgorithm(month - 1); //递归调用
  f2 = recursiveDeduceAlgorithm(month - 2); //递归调用
  return f1 + f2; //根据fₙ₋₁和fₙ₋₂，推导出fₙ
};
const month = 12;
const num = recursiveDeduceAlgorithm(month);
console.log("经过 [%d] 个月，共有 [%d] 对兔子。", month, num);  
// 经过 [12] 个月，共有 [144] 对兔子。
```

### 三、递归

函数自己调用自己，直到满足基准条件方停止, 🌰:

```js
/**
 * 递归算法思想
 * 求阶乘(factorial)问题
 * n的阶乘为：n! = n * (n-1) * (n-2) * ······ * 2 * 1
 * 解法，每一项都等于前一项-1，结果也等于之前的结果*前一项-1
 * 我们这里用int，要注意int的取值范围，不要超过int的上限。
 * @param n 求n的阶乘
 * @return n的阶乘
 */
var recursiveAlgorithm = (n) => {
  if (n <= 1) {
    return 1;
  }
  return n * recursiveAlgorithm(n - 1); //递归调用
};
const n = 8;
const result = recursiveAlgorithm(n);
console.log("%d 的阶乘为： %d", n, result); // 8 的阶乘为： 40320
```

### 四、分治

把大问题分解为多个子问题，根据各子问题的解得出大问题的解, 🌰:

```js
/**
 * 归并排序(分治算法思想)
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
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

const test = [
  [[1, 3], [2]],
  [
    [1, 2],
    [3, 4],
  ],
];

test.forEach((ele) => {
  const res = findMedianSortedArrays(ele[0], ele[1]);
  console.log(res);
});
```

### 五、概率

概率算法依照概率统计的思路来求解问题, 求出的是近似解，常见概率算法有: 

(1) 数值概率算法

(2) 蒙特卡罗(Monte Carlo)算法

(3) 拉斯维加斯(Las Vegas)算法

(4) 舍伍德(Sherwood)算法

🌰

```js
/**
 * 概率算法思想
 * 蒙特卡罗算法
 * 蒙特卡罗算法计算圆周率
 * 一个半径为1的圆，（如图6-23）阴影部分面积，也就是四分之一的圆的面积
 * 计算公式，s₁=s/4=(π*r²)/4=π/4
 * 而图中的正方形面积为S₂=r²=1；
 * 按照图中建议一个坐标系，均匀的向正方形内撒点，那么落入阴影部分的点数比上全部的点数应该就是
 s₁/S₂=π/4
 * 根据概率统计的规律，只要撒点足够多，那么将得到近似的结果。这就是蒙特卡罗算法
 *
 * @param n 撒点数
 */
var monteCarloPI = (n) => {
  let PI; //圆周率π
  let valid = 0; //有效点数，也就是落入阴影部分的点数

  for (let i = 0; i < n; i++) {
    let x = Math.random(); //产生0~1之间的一个随机数
    let y = Math.random();
    if (x * x + y * y <= 1) {
      //点在有效区域内，根据图，有效点距离原点的距离小于等于1，也就是x²+y²<=1
      valid++;
    }
  }
 
  PI = (4.0 * valid) / n;

  console.log("撒点数：%d,有效点数%d,圆周率π ≈ %f\n", n, valid, PI);
};

for (let i = 500000; i < 800000; i += 50000) {
  monteCarloPI(i);
}
// 撒点数：500000,有效点数392676,圆周率π ≈ 3.141408

// 撒点数：550000,有效点数432507,圆周率π ≈ 3.1455054545454546

// 撒点数：600000,有效点数471223,圆周率π ≈ 3.1414866666666668

// 撒点数：650000,有效点数510384,圆周率π ≈ 3.1408246153846155

// 撒点数：700000,有效点数549614,圆周率π ≈ 3.1406514285714286

// 撒点数：750000,有效点数588973,圆周率π ≈ 3.141189333333333
```

参考文章:

[常用算法指南(一)基本算法思想](https://zhuanlan.zhihu.com/p/36903717)