---
title: 数字精确到小数点两位
categories: 编程基础
tags: JavaScript&TypeScript
comments: true
date: 2020-08-12 09:24:08
---
### 分析

对 js 有一定了解的人都知道，js 的数字精确度比较低，这就有必要自己去实现一套精确度高的算法了，精确到小数点后几位，是我们经常会用到的，比如价格的计算等，下面来讲讲这个算法的步骤

1、 要进行精度计算，首先要明确输入的是否为数字

2、 需要明确，精确到小数点后几位

3、 明确该数字是否为小数，不是的话，需要根据精度去做补 0 操作

4、 确定该数字后的小数位数是否够精确的小数长度，不够的话，也要做补 0 操作

5、 若该数字既是小数，小数长度又比精度位长，判断截取精度后的小数后一位是否大于五，是的画进一位

6、 满足精度位，小数精度位后一位进位操作确定之后，还需要确定小数部位是否需要进位，是的话，整数部位加 1，小数部位开头替换为 0，不是的话就直接返回

### 实现

```js
// 精确到小数点两位
function twoDEcimal(number, precision = 2) {
  const temp = number;
  number = Number(number);
  // 判断是否为数字，不是数字抛出异常
  if (Number.isNaN(number)) {
    console.log("无效的数字", temp);
    throw new Error("无效的数字", temp);
  }

  number = String(number);
  let numbers = number.split(".");
  // 如果不是小数，补充对应的 0
  if (numbers.length === 1) {
    return number + "." + "0".repeat(precision);
  } else {
    // 如果是小数，但位数比要保留的位数少，也要补 0
    if (numbers[1].length < precision) {
      return number + "." + "0".repeat(precision - numbers[1].length);
    } else {
      // 取整数部分
      let intNumber = parseInt(number.split(".")[0]);
      // 取小数部分
      let decimal = number.split(".")[1];
      // 取出要保留的小数
      let frontDecimal = parseInt(decimal.substr(0, precision));
      // 去除要保留小数的后一位
      let lastDecimal = parseInt(decimal.substr(precision, 1));
      // 如果最后一位大于5，就进位
      if (lastDecimal >= 5) {
        frontDecimal += 1;
      }
      // 判断小数部位是否需要进位
      if (frontDecimal === Math.pow(10, precision)) {
        frontDecimal = "0".repeat(precision);
        intNumber += 1;
      }
      // 处理保留的小数中有 0 出现的情况
      frontDecimal =
        "0".repeat(precision - String(frontDecimal).length) + frontDecimal;

      return `${intNumber}.${frontDecimal}`;
    }
  }
}

let a = twoDEcimal(1.255);
console.log(a);
a = twoDEcimal(0.005);
console.log(a);
```