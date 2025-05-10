---
title: Flutter学习笔记————Dart基础
categories: web
tags: flutter
toc: true
description: Dart 基础
comments: true
date: 2020-05-25 08:41:55
---

### 一、基本数据类型

#### 1、数字类型

Dart 数字类型包括：num、double（双精度） 和 int（整型），其中 num 类型是 double 和 int 类型的父类，既可以赋值 int 也可以赋值 double。

```dart
num num1 = -1.0; //数字类型的父类
num num2 = 2; //数字类型的父类
int int1 = 3; //整型
double d1 = 1.68; //双精度
print("num: $num1 num: $num2 int: $int1 double: $d1");
```

从上面示例可以看出 dart 打印使用的是 print 方法，字符串中使用变量，直接：$+变量即可

数字类型常用的方法示例：

```dart
print(num1.abs()); //求绝对值
print(num1.toInt()); // 转换成 int 类型
print(num1.toDouble()); // 转换成 double 类型
```

#### 2、字符串类型

字符串类型用 String 声明，字符串拼接可以双引号也可以用 +，多个字符串变量声明，可以使用逗号分隔

```dart
String str = '字符串', str1 = "字符串双引号"; // 字符串的定义
String str2 = "str: $str str: $str1"; // 字符串拼接可以双引号也可以用 +
String str3 = "hello world";
print(str2);
```

字符串常用方法：

```dart
print(str3.substring(1, 3)); // 字符串截取
print(str3.indexOf("el")); // 获取指定字符串的索引
print(str3.startsWith("h")); // 正则匹配开头字符串
print(str3.replaceAll("el", "ol")); // 替换正则字符串，返回修改后的字符串
print(str3.contains("h", 5)); // 从指定位置开始匹配字符串
print(str3.split(' ')); // 根据指定规则，分割字符串成数组
```

#### 3、布尔类型

Dart 是强 bool 类型检查，只有 bool 类型的值是 true，才被认为是 true，使用 bool 声明变量

```dart
bool success = true, fail = false;
print(success);
print(fail);
print(success || fail); // true
print(success && fail); // false
```

#### 4、list 集合

使用 List 声明变量, list 初始化的几种方式如下：

```dart
List list = [1, 2, 3, 'hi']; //初始化时添加元素
print(list);

List<int> list2 = [];
// list2 = list; 错误做法，类型转换出错

List list3 = [];
list3.add('apple');
list3.addAll(list);
print(list3); //通过 add 方法添加元素

List list4 = List.generate(3, (index) => index * 2); //生成函数
print(list4);
```

list 可以使用 for、for……in 和 forEach 进行遍历：

```dart
for (int i = 0; i < list.length; i++) {
  print('for 遍历: ${list[i]}');
}
for (var o in list) {
  print('for in 遍历: $o');
}
list.forEach((val) {
  print('forEach 遍历: $val');
});
```

list 常用方法:

```dart
print(list.indexOf(2, 3)); //查找元素在 list 中的索引, indexOf(element,start)

List<String> parts = ['head', 'shoulders', 'knees', 'toes'];
parts.remove('head'); // true, 移除 list 首个元素
print(parts.join(', '));
```

#### 5、map

map 是将 key 和 value 相关联的对象，key 和 value 都可以是任何类型的对象，并且 key 是唯一的，若 key 重复，后面的 key 会替换前面的，map 的初始化方式如下：

```dart
Map names = {'name': 'Canace', 'age': 12};
print(names);
Map canace = {};
canace['sex'] = 'female';
print(canace);
```

map 的迭代可以使用 for……in、forEach 和 map 方法进行迭代

```dart
names.forEach((k, v) {
  print("$k: $v");
});
Map names2 = names.map((k, v) {
  // 迭代生成一个新的 map
  return MapEntry(v, k);
});
print(names2);
for (var key in names.keys) {
  print('$key: ${names[key]}');
}
```

常用方法：keys，values，remove, containsKey

### 二、dynamic, var, object 三者的区别

dynamic 是所有 Dart 对象的基础类型，在大多数情况下不直接使用。dynamic 只在编译的时候进行类型推断，编译之前不进行数据类型检测，因此，调用不存在的方法不报错。此外，使用该字面量声明的变量，可以动态改变数据类型。

```dart
dynamic x = 'hi';
print(x.runtimeType);
print(x);
x = 123;
print(x.runtimeType);
print(x);
```

使用 var 初始化的数据被定义后修改数据，数据类型不再改变

```dart
var a = 'variable';
print(a.runtimeType);
print(a);
// a = 23214; 报错
print(a.runtimeType);
print(a);
```

Object 是 Dart 对象的基类,继承基本方法，会在编译前进行静态类型检测，因此，编译之前调用不存在的方法会报错，此外，用该字面量声明的变量可以动态改变数据类型

```dart
Object ol = 'object';
print(ol.runtimeType);
print(ol);
ol = 123;
print(ol.runtimeType);
print(ol);
```