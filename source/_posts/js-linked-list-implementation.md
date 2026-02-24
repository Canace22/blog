---
title: js链表实现
categories: 编程基础
tags: 计算机科学
description: js 的链表实现详解
comments: true
toc: true
date: 2019-11-29 09:42:41
---

### 一、节点的实现

我都知道链表就是用有向线段把多个节点按顺序串起来，要实现链表首先要实现节点，而每一个节点，有一个自己的 value 值，还有一个 next 值用于指向下一个节点。比如可以这么实现一个节点：

```js
function Node(value) {
  this.value = value; //当前节点的值
  this.next = null; //下一个节点链接
}
```

以上代码用构造函数的方式声明一个 Node 类，Node 类有两个属性 value 和 next，value 指向自身的值，next 声明为 null。

### 二、链表操作

链表的基本操作包括：增、删、改、查，因此一个列表对象应该具备这些基本功能.

#### 1、元素查找

需要插入一个新值到链表之前，我们需要找到这个值的位置，所以先来看看链表查找的 demo：

```js
class ListClass {
  constructor() {
    this.head = new Node("head"); //头节点
  }
  //查找给定节点
  find(item) {
    let currNode = this.head;
    while (currNode.value != item) {
      currNode = currNode.next;
    }
    return currNode;
  }
}
```

该链表类有一个 head 属性，即，链表的头部，指向 node 对象，也就是 `this.head = {value: 'head', next: null}` ，在 find 函数中，声明 currNode 变量，指向头部，遍历链表，对比每个节点的值跟需要查找值，若相等，则找到了，返回当前节点。

#### 2、插入、替换元素

以上讲了插入元素之前，我们需要先查找元素，找到之后，把新的节点插入到找到的元素后面，也就是找到元素的 next 指向新的元素，再把新元素的 next 指向当前节点的 next

```js
class ListClass {
  constructor() {
    this.head = new Node("head"); //头节点
  }
  //查找给定节点
  find(item) {
    let currNode = this.head;
    while (currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }
  //插入节点
  insert(newElement, item) {
    let newNode = new Node(newElement);
    let currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
  }
}
```

替换元素值，比以上简单点，找到对应的元节点，把该节点的 value 赋予新值，就到达到了修改的目的。

#### 3、删除元素

要删除一个元素，需要查找被删除元素的前一个节点，然后把前一个元素的 next 指向被删除元素的下一个节点，实现如下：

```js
class ListClass {
  constructor() {
    this.head = new Node("head"); //头节点
  }
  //查找带删除节点的前一个节点
  findPrev(item) {
    let currNode = this.head;
    while (!(currNode.next == null) && currNode.next.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  // 删除节点
  remove(item) {
    let prevNode = this.findPrev(item);
    if (!(prevNode.next == null)) {
      prevNode.next = prevNode.next.next;
    }
  }
}
```

### 4、显示元素

操作完元素，我们想看看效果，这个时候需要显示链表，通过打印每一个元素我们可以看到链表的完整结构

```js
class ListClass {
  constructor() {
    this.head = new Node("head"); //头节点
  }
  //显示链表元素
  display() {
    let currNode = this.head;
    while (!(currNode.next == null)) {
      console.log(currNode.next);
      currNode = currNode.next;
    }
  }
}
```

以上就是我对 js 链表的完整实现，写这篇文章是因为今天跟同事聊天意识到自己对链表不是很熟，查阅资料，自己实现了一下，加深理解，再写篇文章以备以后忘了可以查阅。
