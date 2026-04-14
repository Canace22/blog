# 查询：`version.json + 轮询弹窗` 方案，对照 `electron-updater` 该怎么理解

## 问题

如果只对照 `electron-updater`，前面讨论的 `version.json + 轮询弹窗` 方案该怎么理解？

## 结论

两者解决的是**同一类问题**：  
都在回答“客户端如何知道有新版本，以及用户如何完成更新”。

但它们解决问题的**层级不同**：

- `version.json + 轮询弹窗`：偏**轻量更新提醒**
- `electron-updater`：偏**完整应用更新系统**

换句话说，前者更像“告诉你该刷新了”，后者更像“告诉你有新版、帮你算该下什么、把包下载好、校验完、最后安装掉”。

## 分层对照

### 1. 更新发现

`version.json` 方案：

- 前端定时请求一个轻量 JSON
- 只比较当前版本号和远端版本号
- 发现不一致后弹窗

`electron-updater`：

- 应用调用 `checkForUpdates()` 或 `checkForUpdatesAndNotify()`
- 去更新源查询版本元数据
- 文档说明会生成并查询 `latest.yml` 一类更新元数据文件

来源：

- [electron-builder Auto Update](https://www.electron.build/auto-update.html)
- [AppUpdater.checkForUpdates()](https://www.electron.build/electron-updater.class.appupdater)

### 2. 更新描述方式

`version.json` 方案：

- 通常只有一个版本号
- 最多再加发布时间、描述字段
- 它只回答“有没有更新”

`electron-updater`：

- 更新元数据不只包含版本号，还包含文件列表、校验信息、发布时间、分阶段发布比例等
- `UpdateInfo` 文档里有 `version`、`files`、`releaseDate`、`stagingPercentage` 等字段

来源：

- [UpdateInfo](https://www.electron.build/electron-updater.Interface.UpdateInfo.html)

所以这一层的本质差异是：

- `version.json` 更像**提醒信号**
- `latest.yml` 更像**更新清单（manifest）**

### 3. 差分下载能力

`version.json` 方案：

- 本身没有 diff / patch 能力
- 检测到新版本后，通常只能让用户整页刷新，重新拿一套最新资源

`electron-updater`：

- 文档中明确有差分下载相关能力
- `AppUpdater` 有 `disableDifferentialDownload`
- `UpdateFileInfo` / `BlockMapDataHolder` 有 `blockMapSize`、`sha512`、`size` 等字段

来源：

- [AppUpdater.disableDifferentialDownload](https://www.electron.build/electron-updater.class.appupdater)
- [UpdateFileInfo](https://www.electron.build/electron-updater.Interface.UpdateFileInfo.html)
- [BlockMapDataHolder](https://www.electron.build/builder-util-runtime.Interface.BlockMapDataHolder.html)

这意味着 `electron-updater` 已经进入了“**增量更新**”语境，而 `version.json` 方案还停留在“**发现更新并提示**”语境。

### 4. 下载、校验、安装

`version.json` 方案：

- 没有独立下载器
- 没有安装器
- 没有包级校验
- 用户点击后通常只是 `reload()`

`electron-updater`：

- 可以自动下载更新（`autoDownload` 默认 `true`）
- 下载完成后可在退出时自动安装（`autoInstallOnAppQuit` 默认 `true`）
- 也可以在 `update-downloaded` 后调用 `quitAndInstall()`

来源：

- [AppUpdater.autoDownload / autoInstallOnAppQuit / quitAndInstall()](https://www.electron.build/electron-updater.class.appupdater)

所以在执行层上，两者完全不是一个重量级。

### 5. 发布与灰度能力

`version.json` 方案：

- 一般是谁访问到最新版静态资源，谁就看到最新版
- 没有内建灰度、渠道、分批发布能力

`electron-updater`：

- 文档明确支持 staged rollouts
- `UpdateInfo` 里也有 `stagingPercentage`

来源：

- [Auto Update: Staged Rollouts](https://www.electron.build/auto-update.html)
- [UpdateInfo.stagingPercentage](https://www.electron.build/electron-updater.Interface.UpdateInfo.html)

## 对照后的理解

如果把两者放到同一张图里看：

- `version.json + 轮询弹窗`
  - 像是 `electron-updater` 的**最前面那一小段**
  - 主要只覆盖“发现更新”和“提醒用户”

- `electron-updater`
  - 覆盖“发现更新”
  - 覆盖“更新元数据清单”
  - 覆盖“差分下载”
  - 覆盖“下载校验”
  - 覆盖“安装切换”
  - 还覆盖“灰度发布”

所以可以把 `version.json` 方案看成是：

- 一个适合网页静态资源场景的**极简版 updater**

而 `electron-updater` 则是：

- 一个面向桌面应用分发的**完整 updater**

## 什么时候用哪种思路

更适合 `version.json` 思路：

- Web 项目
- 只需要提示“页面该刷新了”
- 不需要增量包、安装器、回滚

更接近 `electron-updater` 思路：

- Electron 桌面应用
- 需要真正下载新版本并替换旧版本
- 需要校验、安装、重启、灰度、差分下载

## 一句话概括

`version.json + 轮询弹窗` 解决的是“**页面更新提醒**”，  
`electron-updater` 解决的是“**应用版本分发与安装**”。

前者只摸到 updater 的入口，后者已经是一整套 updater 系统。

## 相关页面

- [来源：Web端版本更新弹窗实现](../sources/webpage-version-update-popup-implementation.md)
- [查询：刚刚讨论的差异对比，如果用在 app 文件 diff 场景里该怎么理解](app-file-diff-with-update-delivery.md)
- [查询：Web端版本更新弹窗这篇文章里的方案有什么问题，有更好的方案吗](review-web-version-update-popup-scheme.md)
