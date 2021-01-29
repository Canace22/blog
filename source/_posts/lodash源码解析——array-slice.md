---
title: lodash 源码解析 —— slice
categories: 源码学习
tags: lodash
description: lodash slice 函数学习
comments: true
date: 2021-01-26 11:15:40
---
slice 的源码和我的注释如下：

```js
// slice 函数接收三个参数分别是:
// array(需要处理的数组)、start(开始截取子数组的索引)以及 end(结束截取子数组的索引)
function slice(array, start, end) {
  // 判断传入的 array 类型是否正确，若传入的是 null, 取 length 属性会报错
  // 所以把 length 设置为 0，否则，length 取数组的长度
  let length = array == null ? 0 : array.length
  // 根据 length 的值判断数组是否为空或传入的类型不对，是的话，返回空数组
  if (!length) {
    return []
  }
  // 判断传入的 start 参数值是否正确，不正确的话设置为 0
  start = start == null ? 0 : start
  // 判断是否有传入 end 参数，没传的话，默认是数组长度
  end = end === undefined ? length : end
  // 若 start 为负值，则判断一下 start 的绝对值是否大于当前数组长度
  // 超过数组长度的话，把 start 设置为 0，否则取倒数位置
  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  // 判断 end 参数值是否超出数组长度，超出的话，就取数组长度为结束索引
  end = end > length ? length : end
  // 结束索引若为负数，那就取倒数位置
  if (end < 0) {
    end += length
  }
  // 判断 start 和 end的大小，合理的情况是 start < end
  // 所以当开始索引大于结束索引时，不合理的区间，截取长度设置为0
  // 合理的话把 end - start 的结果转为十进制数后，赋值给 length
  length = start > end ? 0 : ((end - start) >>> 0)
  // 把 start 转换为十进制数
  start >>>= 0

  let index = -1
  // 经过上面的步骤，得到了新数组的长度 length，创建一个长度为 length 的新数组
  const result = new Array(length)
  // 从 0 开始遍历 length，逐个取 array 偏移 start 位的值，填充到新数组中
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}
```

从上面的源码分析我们可以看出，这个 slice 函数相对于原生的 slice 方法，优势在于：

(1) 传入的 array 即使不是数组，也不会抛出异常，而是会返回一个空数组，这在工作中可以解决那些数据类型传错会抛出错误导致程序崩溃的问题

(2) 函数式的调用，更加简单易懂

这段代码对参数做了全面细致的校验，从而保证可以返回正确的值，很值得我们学习。
