---
title: bash 数据处理
categories: 工程化与运维
tags: 系统设计
description: bash 数据处理运用
comments: true
date: 2020-01-04 10:22:54
---

### 一、用 grep 进行数据筛选

1、数据

```csv
item, modelnumber, price, tax
Sneakers, MN009, 49.99, 1.11
Sneakers, MTG09, 139.99, 4.11
Shirt, MN089, 8.99, 1.44
Pants, N09, 39.99, 1.11
Sneakers, KN09, 49.99, 1.11
Shoes, BN009, 449.22, 4.31
Sneakers, dN099, 9.99, 1.22
Bananas, GG009, 4.99, 1.11
```

2、操作

```bash
# 关键字
grep Sneakers sales.csv
# 结果
Sneakers, MN009, 49.99, 1.11
Sneakers, MTG09, 139.99, 4.11
Sneakers, KN09, 49.99, 1.11
Sneakers, dN099, 9.99, 1.22
# 正则匹配
grep -o "\(BN\|MN\)\([0-9]\)\{3\}" sales.csv
# 结果
age,value
33,5943
32,543
34,93
39,5943
36,9943
38,8943
```

### 二、数据替换

1、数据

(1) data.csv

```csv
age,value
"33","5943"
"32","543"
"34","93"
"39","5943"
"36","9943"
"38","8943"
```

(2) temps.txt

```txt
temp,unit
26.1,C
78.1,F
23.1,C
25.7,C
76.3,F
77.3,F
24.2,C
79.3,F
27.9,C
75.1,F
25.9,C
79.0,F
```

2、操作

(1) 用 sed 替换文件的双引号

```bash
cat data.csv | sed 's/"//g'
# 结果
age,value
33,5943
32,543
34,93
39,5943
36,9943
38,8943
```

(2) 用 awk 有条件的替换数据

```bash
cat temps.txt | awk -F',' '{if($2=="F")print (($1-32)*5/9)",C";else print $1","$2}'
# 结果
26.1,C
25.6111,C
23.1,C
25.7,C
24.6111,C
25.1667,C
24.2,C
26.2778,C
27.9,C
23.9444,C
25.9,C
26.1111,C
```

### 三、数据排序

1、 数据

```txt
0
1
1234
11
ZZZZ
1010
0123
hello world
abc123
Hello World
9
zzzz
```

2、操作

(1) 首字符 Unicode 大小排序

```bash
cat foo.txt | sort
# 结果
0
0123
1
1010
11
1234
9
Hello World
ZZZZ
abc123
hello world
zzzz
```

(2) 数字排序

```bash
cat foo.txt | sort -n
# 结果
0
Hello World
ZZZZ
abc123
hello world
zzzz
1
9
11
0123
1010
1234
```

(3) 倒序

```bash
cat foo.txt | sort -r
# 结果
zzzz
hello world
abc123
ZZZZ
Hello World
9
1234
11
1010
1
0123
0
```

(4) 组合使用——数字倒序

```bash
cat foo.txt | sort -n -r
# 结果
1234
1010
0123
11
9
1
zzzz
hello world
abc123
ZZZZ
Hello World
0
```

### 四、两份文件交并集运算

1、数据

(1) signups.txt

```txt
68_so_late@hotmail.com
fred@example.com
info@info.info
something@somewhere.com
ted@example.net
```

(2) purchases.txt

```txt
example@gmail.com
fred@example.com
mark@facebook.com
something@somewhere.com
```

2、操作（需要先排序，不然运算结果可能不对）

(1) 找出登录账户并且购买了商品的用户（求交集)

```bash
comm -12 <(sort signups.txt) <(sort purchases.txt)
# 结果
fred@example.com
something@somewhere.com
```

(2) 找出登录了，但未购买的用户（非）

```bash
comm -23 <(sort signups.txt) <(sort purchases.txt)
# 结果
68_so_late@hotmail.com
info@info.info
ted@example.net
```

(3) 找出购买了，但未登录的用户（非）

```bash
comm -13 <(sort signups.txt) <(sort purchases.txt)
# 结果
example@gmail.com
mark@facebook.com
```

### 五、检测数据唯一性，统计重复数

1、数据

```csv
Shoes,19.00
Shoes,28.00
Pants,77.00
Socks,12.00
Shirt,22.00
Socks,12.00
Socks,12.00
Boots,82.00
```

2、操作

(1) 获取所有键值

```bash
cat sales1.csv | awk -F',' '{print $1}' | sort | uniq
# 结果
Boots
Pants
Shirt
Shoes
Socks
```

(2) 统计重复键值

```bash
cat sales1.csv | awk -F',' '{print $1}' | sort | uniq -c
# 结果
1 Boots
1 Pants
1 Shirt
2 Shoes
3 Socks
```

### 六、查看文件的一部分

(1) 查看文件前面一小部分

```bash
cat sales.csv | head -n 3
# 结果
item, modelnumber, price, tax
Sneakers, MN009, 49.99, 1.11
Sneakers, MTG09, 139.99, 4.11
```

(2) 查看文件后面一小部分

```bash
cat sales.csv | tail -n 3
# 结果
Shoes, BN009, 449.22, 4.31
Sneakers, dN099, 9.99, 1.22
Bananas, GG009, 4.99, 1.11
```

### 七、文件行数、字数统计

(1) 文件行数统计

```bash
wc -l temps.txt
```

(2) 字数统计

```bash
echo -n "Here is some text that you'll get a character count for" | wc -c
# 结果
55
```
