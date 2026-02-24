---
title: KNN算法
description: 'k近邻算法通过计算距离确定类别，选择最近的k个样本进行分类或预测，注意k值选择和距离公式影响结果。'
comments: true
date: 2019-03-30 13:31:24
categories: 编程基础
tags: 计算机科学
---

## KNN 算法是做什么的

KNN 算法， 即 K 最邻近算法，通过对比与临近事物的相似度，可以对具有特征的事物进行分类，也可以根据这些分类，预测下一步的结果。

## KNN 算法步骤

KNN 算法主要分为三步：

### 一、准备

找出邻近值，这个邻近值 k 可以是任意数，1， 1000 甚至 10000 都可以。

### 二、分类

用毕达哥拉斯公式算出该对象与邻近值的相似度（该对象与邻近值得距离），并将该对象归到相似度最高的那一个近邻类里。

### 三、回归

重新找到该对象的近邻，算出这些近邻各特征的平均值，形成新的特征组合，即新的对象，这个对象就是预估的结果，也就是通常所说的预测值。

## 其他

### KNN 算法的实现

```python
# 已知所有特征集合，第一个特征为颜色，第二个特征为所属类别
L = {'orange' : [1, 0], 'apple': [2, 0], 'flower': [1, 1], 'fish': [5, 5]}

# 未知物体
test = [1.1, 0]
# 所有的相似度集合
results = []
# 已知所有水果的集合
items = []

for item in L:
    x = L[item][0] - test[0]
    y = L[item][1] - test[1]
    instance = x ** 2 + y ** 2
    results.append(instance ** 0.5)
    items.append(item)

# 最大相似度
minValue = min(results)
# 物体名称
result = items[results.index(minValue)]

print(minValue, result)
```
