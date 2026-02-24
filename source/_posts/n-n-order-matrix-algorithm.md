---
title: "n * n 阶矩阵算法 "
description: '暴力破解矩阵乘法效率低但实现简单结果直观'
comments: true
date: 2018-07-30 21:42:14
categories: 编程基础
tags: 计算机科学
---

n \* n 阶矩阵的解法有几种方式，分而治之、暴力破解等，我这里用的方法就是暴力破解的方法，时间和空间复杂度肯定是比较差的，不过能快速获得结果而已，用 js 的实现代码如下：

````js
function matrix(A, B) {
    var n = A.length;
    var C = [];
    for ( var i = 0; i < n; i++ ){
        C[i] = [];
        for( var j = 0; j < n; j++ ){
            C[i][j] = 0;
            for( var k = 0; k < n; k++ ){
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    console.log(C);
}
matrix([[1,2], [3, 4]], [[3, 2], [1, 4]]);
//[ [ 5, 10 ], [ 13, 22 ] ]
```
