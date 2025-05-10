---
title: JavaScript 基础 —— 类型转换
categories: web
tags: JavaScript
description: javascript 基础系列之类型转换，顾名思义，梳理一下类型转换相关的知识点
comments: true
toc: true
date: 2020-10-09 10:42:19
---
在红宝书第三版中,有说到 ECMAScript 中有 5 种简单数据类型(也称为基本数据类型):Undefined、Null、Boolean、Number 和 String。还有 1 种复杂数据类型——Object。

## 一、显式转换

JavaScript 的显式类型转换比较容易理解就是利用对应类型的类型转换函数去转换。

显式类型转换又可以分为基本数据类型之间的转换、基本数据类型转引用类型以及Object类型转基本数据类型等，下面来描述一下这几种类型转换的形式。

### 基本数据类型之间转换的方法

**1. 基本数据类型转换 Boolean** 

Boolean 转 Boolean

直接调用 Boolean 类型转换函数不传参数，返回的是 false，这里需要注意一下

```js
Boolean() // false
Boolean(true) // true
Boolean(false)  //false
```

String 转 Boolean

任何非空字符串转 Boolean，都返回 true, 空字符串转 Boolean 返回 false

```js
Boolean('undefined')  // true
Boolean('NaN')  // true
Boolean('null') //true
Boolean('') //false
Boolean(' ')  // true
```

Number 转 Boolean

任何非零数字值(包括无穷大)转 Boolean 都返回 true, 0 和 NaN 转 Boolean 返回 false

```js
Boolean(Infinity) // true
Boolean(-Infinity) //true
Boolean(-1) // true
Boolean(1/2)  // true
Boolean(0)  // false
Boolean(NaN)  //false
Boolean(-0) // false
```

Undefined 和 Null 转 Boolean

undefined 和 null 转 Boolean， 都返回 false

```js
Boolean(undefined)  // false
Boolean(null) // false
```

总结: 基本类型布尔值为 false 的情况有以下几种: 

- 调用 Boolean 类型转换函数不传参

- 空字符串

- 0 和 NaN

- null

- undefined

**2. 基本数据类型转 Number**

Number 类型转换函数可以转换各种类型值为数值类型，parseInt()和 parseFloat() 专门用于把字符串转换成数值

Boolean 转 Number

```js
Number(true)  // 1
Number(false) // 0
```

Number 转 Number

只是简单的传入和返回

```js
Number()  // 0
Number(Infinity)  //Infinity
Number(0) // 0
Number(NaN) // NaN
```

null 转 Number

```js
Number(null)  // 0
```

undefined 转 Number

```js
Number(undefined) // NaN
```

String 转 Number

字符串只包含数字，忽略前导 0，转换为十进制数值

```js
Number('001234')  // 1234
Number('-001234') // -1234
Number('0x12')  // 18
Number('Infinity')  // Infinity
Number('NaN') // NaN
```

字符串包含有效浮点格式，忽略前导 0，转换为浮点数值

```js
Number('1.2333')  // 1.2333
Number('.2333') // 0.2333
Number('2333.') // 2333
```

字符串为空，返回 0

```js
Number('')  // 0
```

除以上格式之外的字符，返回 NaN

```js
Number('123a')  // NaN
```

总结：基本数据类型转换为 Number 类型为 0 的情况有以下几种

- 调用 Number 类型转换函数参数为空

- 0

- 空字符串

- null

- false

基本数据类型转换为 Number 类型值为 NaN 的情况

- undefined

- 字符串中包含非数字

- NaN

**3. 基本数据类型转 String**

除 undefined 和 null 外的其他类型转 String的转换规则为：调用 toString 方法返回相应的值, null 和 undefined 没有 toString 方法，直接返回对应的字符串

```js
String(true)  // true
String(false) //false
String(0) // 0
String(null)  // null
String(undefined) // undefined
String(NaN) // NaN
String(Infinity)  // Infinity
String()  // ""
```

### Object 类型转基本数据类型

**1. 对象转 Boolean**

任何对象转 Boolean，返回值都是 true

**2. 对象转 Number 规则**

- 调用对象的 valueOf()方法，若结果是基本数据类型，依照基本数据类型转 Number 规则转换。

- 如果 valueOf() 方法返回的值不是基本数据类型或者转换的结果是 NaN，则调用对象的 toString()方法，依照基本数据类型转 Number 规则转换

```js
// ({a:0}).valueOf() => {a:0} => ({a:0}).toString() => "[object Object]" 
// => Number("[object Object]") => NaN 
Number({a:0}) // NaN
```

**3. 对象转 String 规则**

- 调用对象的 toString() 方法, 若结果是基本数据类型, 依照基本数据类型转 String 规则转换

- 如果 toString() 方法返回的值不是基本数据类型, 则调用对象的 valueOf()方法，依照基本数据类型转 String 规则转换

## 二、隐式转换

隐式类型转换顾名思义，就是不直接调用转换函数，而发生的类型转换，主要分为以下几种: 一元操作符类型转换、二元操作符类型转换, 相等操作符类型转换以及其他操作符类型转换，下面我举例子来说明一下这几种类型转换的形式

### 1. 一元操作符类型转换

一元操作符会把操作数据类型转换为 Number 类型(规则同上)，再进行加减或者自增自减

```js
a = '1'
++ a  // ++Number(a) => 2

b = '1'
b-- // Number(b)--
b //  0

+'1'  // Number('1') => 1
-'1' // -Number('1') => -1

+[] // [].valueOf() => [] => [].toString() => "" => Number("") => 0

// ['1','2','3'].valueOf() => ["1", "2", "3"] 
// => ['1','2','3'].toString() => "1,2,3"
// Number("1,2,3") => NaN
+['1','2','3'] 

// ({}).valueOf() => {} => ({}).toString() => "[object Object]" 
// => Number("[object Object]") => NaN
+{} 

+true // Number(true) => 1
```

### 2. 二元操作符类型转换

二元操作符类型转换我们用的最多的就属 "+" 了, 先来看看 "+" 是如何进行类型转换的

```js
1 + 'a' // '1a'
NaN + 'a' // "NaN"
[] + 'a' // 'a'

true + 1 // 2
NaN + 1 // NaN
undefined + 1 // NaN
null + 1  // 1

['1','2','3'] + []  // "1,2,3"
['1','2','3'] + 1 //  "1,2,31"
```

从上面的例子我们不难看出二元操作符 "+" 进行类型转换的规则:

(1) x + y 中存在一个操作数为 String 类型, 则把另一个操作数转换为 String 类型，再把两个字符串拼接在一起

(2) x + y 中存在一个操作数为 Boolean、Undefined、NaN 或者 null 值, 另一个操作数为 Number，则将非 Number 的操作数转换为 Number 类型，在进行运算, NaN + 任何值都为 NaN

(3) 若有一个操作数是对象，则把该操作数转为 String 类型, 回到规则(1)

再来看看另一个常用的二元操作符 '-'，这个操作符的类型转换规则就简单多了, 若x - y 中含有一个不是 Number 类型的操作数，则把该操作数转换为 Number 类型，除此之外 '*', '/'等操作符转换规则也基本一样

### 3. 相等操作符类型转换

(1) 如果有一个操作数是布尔值，则在比较相等性之前先将该操作数转换为 Number 类型

```js
false == 0  // Number(false) => 0 => true
true == 1 //Number(true) => 1 => true
```

(2)  null 和 undefined 不转换，并且 null == undefined

(3) x == y, 中含有一个操作数为 NaN 则为 false

(4) 若 x == y 中有一个不是数值, 则将该操作数转换为 Number 类型

(5) x == y 中, x, y 都为对象, 则比较二者是否指向同一个地址

除此之外还有其他的操作符会进行类型转换，这里就不一一列举了，有了这些基础应该可以触类旁通了。
