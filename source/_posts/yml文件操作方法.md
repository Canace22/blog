---
title: yml 文件操作方法
comments: true
date: 2018-06-08 09:52:46
categories: Web开发
tags: python
---

1. 文件读取方法示例：

```
    import yaml
    fr = open('yml_file_address', 'r',encoding='utf-8')
    data = yaml.load(fr)
    print(data)
    fr.close()
```

关于 yml 文件的操作，有一个专门的库 yaml ，yaml 直接给出了一个把 yml 文件读取到字典里的方法 load，所以要读取 yml 文件非常简单，只需要引入 yaml 库，用 python 的 open 方法打开文件，用 load 方法读取文件，就可以轻而易举的读取 yml 文件到字典里了。当然其中还是有点坑的，那就是解码的问题，因为默认读取的文件不是字符编码格式，所以要把它转换为字符编码，再传给 load。

2. 文件写入方法示例：

```
    import yaml
    fr = open('yml_file_address', 'w',encoding='utf-8')
    temp = {"fruits":"banana"}
    data = yaml.dump(temp,fr, default_flow_style=False)
    print(data)
    fr.close()
```

yaml 库提供了一个 dump 方法，只需要打开文件，给出要写入的参数（字典形式等），调用 dump 方法就可以很快捷的写入信息到 yml 文件啦

3. 这两个方法在项目中的运用：

```
修改配置文件昵称
def changeUserName(user):
    fr = open('yml_file_address', 'r',encoding='utf-8')
    data = yaml.load(fr)
    fr.close()
    data['robot_name_cn'] = user
    fr = open('yml_file_address', 'w', encoding='utf-8')
    yaml.dump(data, fr, allow_unicode=True, default_flow_style=False)
    fr.close()
    return data['robot_name_cn']
修改配置文件密码
def changePassword(password):
    fr = open('yml_file_address', 'r',encoding='utf-8')
    data = yaml.load(fr)
    fr.close()
    data['password'] = password
    if 'password' in data.keys():
        fr = open('yml_file_address', 'w', encoding='utf-8')
        yaml.dump(data, fr, allow_unicode=True, default_flow_style=False)
        fr.close()
        return data['password']
    else:
        fr = open('yml_file_address', 'a', encoding='utf-8')
        yaml.dump(data, fr, allow_unicode=True, default_flow_style=False)
        fr.close()
        return data['password']
```

这是两个修改配置信息的函数 changeUserName（） 和 changePassword（），故名思议，就是修改密码和昵称，两个函数的思路都是一样的，先读取配置文件，把相应的信息替换进配置文件里，然后通过写入方法，把这两个信息写入文件中。

其中的难点可能就是解码和生成 yaml 文件的样式问题了。一开始各种报解码错误，在打开文件的时候加一个 encoding，在写入函数中加一个 allow_unicode=True 搞定了。

解决替换信息在文件中的样式问题， 是在写入函数中加入 default_flow_style=False 搞定的。
