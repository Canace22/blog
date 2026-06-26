# 更新系统分层

## 定义

**更新系统分层**是指在软件更新场景中，从轻量提醒到完整更新系统的五个层级：

1. **更新发现**：检测是否有新版本
2. **更新描述**：获取版本元数据和文件清单
3. **差分下载**：只下载变化部分
4. **下载校验**：验证下载完整性
5. **安装切换**：完成更新并切换到新版本

## 典型方案对照

### `version.json + 轮询弹窗`

- **层级覆盖**：仅覆盖"更新发现"和"提醒用户"
- **适用场景**：Web 项目、只需要提示"页面该刷新了"
- **特点**：极简版 updater

### `electron-updater`

- **层级覆盖**：完整覆盖所有五个层级，还支持灰度发布
- **适用场景**：Electron 桌面应用
- **特点**：完整 updater 系统

## 分层详解

### 1. 更新发现

| 方案 | 实现方式 |
| --- | --- |
| `version.json` | 前端定时请求轻量 JSON，比较版本号 |
| `electron-updater` | 调用 `checkForUpdates()`，查询 `latest.yml` |

### 2. 更新描述

| 方案 | 内容 |
| --- | --- |
| `version.json` | 版本号、发布时间、描述 |
| `electron-updater` | 版本号、文件列表、校验信息、发布时间、分阶段发布比例 |

### 3. 差分下载

| 方案 | 能力 |
| --- | --- |
| `version.json` | 无，只能整页刷新 |
| `electron-updater` | 支持 blockMap 差分下载 |

### 4. 下载校验

| 方案 | 能力 |
| --- | --- |
| `version.json` | 无独立校验 |
| `electron-updater` | SHA512 校验、自动下载 |

### 5. 安装切换

| 方案 | 能力 |
| --- | --- |
| `version.json` | `reload()` |
| `electron-updater` | `quitAndInstall()`、退出时自动安装 |

## 灰度发布

- `version.json`：无内建灰度能力
- `electron-updater`：支持 `stagingPercentage` 分阶段发布

## 一句话概括

`version.json + 轮询弹窗` 解决的是"页面更新提醒"，`electron-updater` 解决的是"应用版本分发与安装"。前者只摸到 updater 的入口，后者已经是一整套 updater 系统。

## 来源

- [查询：`version.json` 对照 `electron-updater`](../queries/web-version-json-vs-electron-updater.md)
- [消息推送对照报告](../reports/message-delivery-comparison-report.md)
- [Electron 打包与发布渠道](electron-build-channels.md)

## 相关概念

- [Diff 三层对照](diff-three-layer-model.md)
- [Electron 打包与发布渠道](electron-build-channels.md)
