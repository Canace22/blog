---
title: n * n 阶矩阵算法
description: 暴力破解矩阵乘法效率低但实现简单结果直观
comments: true
date: 2018-07-30 21:42:14
categories: 编程基础
tags: 计算机科学
toc: true
---

## 一、 n \* n 阶矩阵

假设，有两个 2 * 2 阶矩阵 A、B，A = [[1,2],[3,4]]，B = [[3,2],[1,4]]，他们相乘的结果是 C，也就是 C = A * B，我们回顾一下数学解法，大概是这样的：

```
C = A * B = [[C00,C01],[C10,C11]]
C00 = A0 * B0 = 1 * 3 + 2 * 1 = 5
C01 = A0 * B1 = 1 * 2 + 2 * 4 = 10
C10 = A1 * B0 = 3 * 3 + 4 * 1 = 13
C11 = A1 * B1 = 3 * 2 + 4 * 4 = 22
C = A * B = [[5,10],[13,22]]
```

## 二、 算法实现

### 1. 暴力破解法

n \* n 阶矩阵的解法有几种方式，分而治之、暴力破解等，我这里用的方法就是暴力破解的方法，时间和空间复杂度肯定是比较差的，不过能快速获得结果，用 js 的实现代码如下：

```js
function matrix(A, B) {
  const n = A.length;
  let C = [];
  for (let i = 0; i < n; i++) {
    C[i] = [];
    for (let j = 0; j < n; j++) {
      C[i][j] = 0;
      for (let k = 0; k < n; k++) {
        C[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  console.log('result:', C);
}
matrix(
  [
    [1, 2],
    [3, 4]
  ],
  [
    [3, 2],
    [1, 4]
  ]
);
//[ [ 5, 10 ], [ 13, 22 ] ]
```

- 最外层 i：锁定 A 的当前行。
- 中间层 j：锁定 B 的当前列，定下我们要计算的结果格子 C[i][j]。
- 最内层 k：横着扫 A 的第 i 行（A[i][k]），同时竖着扫 B 的第 j 列（B[k][j]），把对应项相乘，不断加到 C[i][j] 上。

### 2. 优化

上面的算法，对于较大的矩阵（例如 N > 1000），计算量会呈立方级暴增，直接导致主线程卡死。

如果有高性能计算或处理大型矩阵的需求，可以考虑以下优化路径：

**算法层面优化 Strassen 算法：**

- 利用分治法将时间复杂度降低至约为 \mathcal{O}(n^{2.807})。
- Coppersmith–Winograd 类算法：理论上能降得更低，但常数项很大，一般用于学术界。

**工程与工程性能优化（Cache / CPU 友好）**

- 转置矩阵（Loop Tiling/Reordering）：在 CPU / JS 引擎中，连续读取内存远快于跳跃读取。由于 B[k][j] 是按列读取的（内存不连续），可以先对 B 进行转置，使内层循环对内存的访问保持连续，极大地提升缓存命中率（Cache Hit Rate）。
- TypedArray (如 Float64Array)：代替 JS 的普通嵌套数组，内存更加紧凑且能获得引擎的优化。
- WebAssembly / SIMD / WebGL (GPU 计算)：对于大规模矩阵运算，利用 WebGL / WebGPU 或 WASM 开展并行计算才是生产环境下的最佳实践（如 TensorFlow.js）。

#### 矩阵转置 + 类型化数组（TypedArray）

- 优化原理：转置 B 矩阵（Loop Reordering）：原本访问 B[k][j] 是按列读取，跨度大、不连续；先将 B 转置为 B^T，访问 B^T[j][k] 就变成了按行连续读取，缓存命中率（Cache Hit）大幅提升。
- Float64Array 连续内存：一维打平的数组在内存中是完全连续的，避免了 JS 嵌套数组（数组的数组）带来的指针追溯开销。

```js
function multiplyMatrixOptimized(A, B) {
  const n = A.length;
  if (!n || A[0].length !== n || B.length !== n || B[0].length !== n) {
    throw new Error('请传入相同维度的 N * N 阶方阵');
  }

  // 1. 使用一维连续内存 TypedArray
  const bTransposed = new Float64Array(n * n);
  const C = new Float64Array(n * n);

  // 2. 将 B 矩阵转置存储，使得后续按行访问连续内存
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      bTransposed[j * n + i] = B[i][j];
    }
  }

  // 3. 乘法计算：利用转置后的连续内存进行累加
  for (let i = 0; i < n; i++) {
    const aOffset = i * n;
    for (let j = 0; j < n; j++) {
      const bOffset = j * n;
      let sum = 0;
      for (let k = 0; k < n; k++) {
        // A[i][k] 和 B_transposed[j][k] 都是连续内存访问！
        sum += A[aOffset + k] * bTransposed[bOffset + k];
      }
      C[aOffset + j] = sum;
    }
  }

  return C; // 返回一维 Float64Array，如需二维数组可再包装转换
}
```

#### WebGPU / WebGL（GPU 并行加速）

矩阵乘法中每个格子的计算都是互相独立的。利用 WebGPU/WebGL 可以将 N \times N 次计算同时分发给 GPU 的成百上千个核心并行运算，运算时间会从 CPU 的 \mathcal{O}(n^3) 体验降低到极短的瞬间。

在实际生产中，一般不会手动编写复杂的 Shader，而是借力成熟的高性能 GPU 框架（如 TensorFlow.js）：

```js
import * as tf from '@tensorflow/tfjs';
// 自动启用 WebGPU / WebGL 后端

function multiplyMatrixGPU(A, B) {
  // 1. 将数据转为 GPU Tensor 内部张量
  const tensorA = tf.tensor2d(A);
  const tensorB = tf.tensor2d(B);

  // 2. 调用底层由 WebGL/WebGPU/SIMD 加速的矩阵乘法
  const tensorC = tf.matMul(tensorA, tensorB);

  // 3. 将结果读回 CPU/JS 内存
  const result = tensorC.arraySync();

  // 4. 释放 GPU 显存
  tensorA.dispose();
  tensorB.dispose();
  tensorC.dispose();

  return result;
}
```
