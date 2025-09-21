---
title: tensorflow 模型训练步骤
date: 2018-05-27 09:56:27
categories: 人工智能
comments: true
---

### 使用 tensorflow 进行算法设计、训练的步骤

1. 定义算法公式，也就是神经网络 forward 时的计算；

2. 定义 loss，选定优化器，比如 SGD，并指定优化器 loss；

3. 迭代的对数据集进行训练；

4. 在测试集上对准确率进行评测；
