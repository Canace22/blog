---
title: centos 服务器登录配置
categories: 工程化与运维
tags: 构建与部署
comments: true
date: 2020-11-18 10:03:10
---
### 一、修改服务器 sshd 服务的配置文件

`vim /etc/ssh/sshd_config` 打开配置文件，修改以下配置项:

```
RSAAuthentication yes     # RSA认证
PubkeyAuthentication yes  # 公钥认证
AuthorizedKeysFile .ssh/authorized_keys  # 公钥认证文件路径
```

`service sshd restart` 重启 sshd 服务

### 二、本地生成秘钥

`cd ~/.ssh` => `ssh-keygen -t rsa`

### 三、把公钥加到服务器的.ssh/authorized_keys 文件中

(1) 复制公钥文件到服务器 `scp local-file <your serve>:taget-dir`

(2) 把公钥内容复制到 ~/.ssh/authorized_keys: `cat taget-dir/id_rsa.pub >> ~/.ssh/authorized_keys`

(3) 删除刚刚上传的公钥文件: `rm taget-dir/id_rsa.pub`,这里上传再复制而不是直接用 vim 粘贴，主要是权限问题

(4) 加权限

```sh
chmod 700 ~/.ssh
chmod 400 ~/.ssh/authorized_keys
```

### 四、本地定义服务器名称

`vim ~/.ssh/config` 打开配置文件, 添加以下内容

```
Host <hostName>
    HostName <公网ip>
    User root
```

保存之后,ssh hostName 就可以登录了

### 五、保持连接

`vim ~/.ssh/config` 打开配置文件, 添加以下内容

```
Host *
  ServerAliveInterval 60
```

参考文献:

[高效简单的服务器登录配置](https://shanyue.tech/op/init.html#%E5%85%8D%E5%AF%86%E7%99%BB%E5%BD%95%EF%BC%9Apublic-key-%E4%B8%8E-ssh-copy-id)

[如何优雅的登录远程服务器（SSH免密登录）](https://blog.csdn.net/github_35817521/article/details/53458217)

[Can't open ssh/authorized_keys of user](https://stackoverflow.com/questions/14819084/cant-open-ssh-authorized-keys-of-user)

