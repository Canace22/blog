---
title: javaScript 面向对象编程
comments: true
date: 2018-10-22 19:52:57
categories: Web开发
tags: JavaScript&TypeScript
toc: true
---

### 一、构造函数创建、继承和扩展类

为了区分普通函数与构造函数，构造函数首字母大写，构造函数创建类，并进行类的继承和派生，相比于接下来要说的 class 创建、继承和派生类而言，略显得复杂。

#### 1、构造函数创建类

通过一个构造函数创建一个原始类 => 给原始类定义基本属性和原型方法，通过 new 构造函数，初始化一个新的类；

```js
function Student(props) {
  this.name = props.name || "匿名";
  this.grade = props.grade || 1;
}
Student.prototype.hello = function() {
  console.log(`Hello ${this.name}!`);
};

function createStudent(props) {
  return new Student(props || {});
}
let xiaoming = createStudent({
  name: "小明"
});
console.log(xiaoming.grade);
xiaoming.hello()
```

#### 2、构造函数继承类

属性的继承，利用函数的 call 方法，调用上一个构造函数创建的类，参数传入相应的属性以及 this 值，原型方法的继承，通过创建一个空的对象原型作为中介，把父类的原型方法传递给子类，实现子类继承父类的目的；

```js
// 原型继承
function inherits(Child, Parent) {
  let F = function() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.constructor = Child;
}

function Student(props) {
  this.name = props.name || "Unnamed";
}

Student.prototype.hello = function() {
  console.log(`Hello ${this.name}!`);
};

function PrimaryStudent(props) {
  // 继承 student name
  Student.call(this, props);
  this.grade = props.grade || 1;
}
// 原型方法继承
inherits(PrimaryStudent, Student);
```


#### 3、构造函数扩展

在原型上添加新的方法，即可

```js
PrimaryStudent.prototype.getGrade = function() {
  return this.grade;
};
```

### 二、class 关键字创建、继承和派生类

class 关键字是 es6 提出来的，极大的便利了 javaScript 类的操作，实例代码如下：

```js
// 创建类
class Teacher {
  constructor(name) {
    this.name = name;
  }
  hello() {
    console.log(`Hello ${this.name}!`);
  }
}
let xiaojun = new Teacher("小君");
xiaojun.hello();
// 类派生
class PrimaryTeacher extends Teacher {
  constructor(name, grade) {
    // 调用父类的构造函数
    super(name);
    this.grade = grade;
  }
  myGrade() {
    console.log(`I am at grade ${this.grade}!`);
  }
}
let xiaohong = new PrimaryTeacher("小红", 3);
xiaohong.myGrade();
```
