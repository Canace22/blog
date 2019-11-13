---
title: ubuntu 配置前端环境
comments: true
date: 2018-07-08 18:56:11
categories: web
tags: 环境配置
---

ubuntu 配置前端环境

<!--more-->

1. 下载 sougou 输入法，直接下载安装包双击就行;

2. 下载配置 ` sublime text ：

   (1) `sudo add-apt-repository ppa:webupd8team/sublime-text-3`

   (2) `sudo apt-get update`

   (3) `sudo apt-get install sublime-text-installer`

   (4) `subl`

   (5) 安装 package control：

   ````
   import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
   ```

   (6)破解码
   ```
   —– BEGIN LICENSE —–
   Michael Barnes
   Single User License
   EA7E-821385
   8A353C41 872A0D5C DF9B2950 AFF6F667
   C458EA6D 8EA3C286 98D1D650 131A97AB
   AA919AEC EF20E143 B361B1E7 4C8B7F04
   B085E65E 2F5F5360 8489D422 FB8FC1AA
   93F6323C FD7F7544 3F39C318 D95E6480
   FCCC7561 8A4A1741 68FA4223 ADCEDE07
   200C25BE DBBC4855 C4CFB774 C5EC138C
   0FEC1CEF D9DCECEC D3A5DAD1 01316C36
   —— END LICENSE ——
   ```

   ````

3. 配置前端环境：

   (1) 安装 node: `curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -` => `sudo apt-get install -y nodejs`

   (2) 更新 node 和 npm: `sudo npm install -g n` => `sudo n stable` => `sudo npm install npm -g`

   (3) 安装淘宝 npm 镜像: ' sudo npm install cnpm -g `

   (4) 安装 webpack : `npm install webpack -g`

   (5) 安装 vue 脚手架: `sudo npm install vue-cli -g`

   (6) 安装 angular 脚手架：`sudo npm i -g @angular/cli`

4. 安装 git: `sudo apt-get intall git`

5. 查看软件位置：ex. `whereis node`、`whereis npm`

6. 安装 vscode 及其[插件](https://blog.csdn.net/win7583362/article/details/79315055)
