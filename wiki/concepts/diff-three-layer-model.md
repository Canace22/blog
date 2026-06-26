# Diff 三层对照

## 定义

**Diff 三层对照**是指在"差异更新"这个大主题下，三种不同层级的 diff 机制：

1. **应用更新**（如 `electron-updater`）：软件分发级 diff
2. **应用内文件更新**：内容同步级 diff
3. **`git diff`**：文本差异表达级 diff

三者都涉及"旧状态到新状态的差异"，但关注对象和工程实现完全不同。

## 核心区别

| 层级 | 关注对象 | 差异粒度 | 执行方式 |
| --- | --- | --- | --- |
| 应用更新 | 程序自身 | 安装包 / 文件块 / 差分包 | 下载、校验、安装、重启 |
| 应用内文件更新 | 程序使用的数据或资源 | 文件级 / hash 级 / chunk 级 | 拉 manifest、比对、下载、替换、热加载 |
| `git diff` | 文本内容 | 行级 / hunk 级 | 展示、审查、合并、打 patch |

## 应用内文件更新的典型模式

1. 客户端获取 **manifest**（文件路径、hash、大小、版本、下载地址）
2. 遍历本地文件，对比 hash
3. 只下载缺失或变化的文件
4. 下载后校验
5. 原子替换或热加载

更进阶的优化：
- 文件内部 chunk 级别 diff
- 二进制 patch
- CDN 分片

## 与 `git diff` 的关系

**可以借鉴**：
- 差异最小化思维
- patch 思维
- 版本基线概念
- 三方状态比较

**不适合直接照搬**：
- `git diff` 面向文本行级差异
- 应用内文件更新更关心可执行性、稳定性、校验、回滚

## 一句话概括

`electron-updater` 是升级 app，应用内文件更新是同步资源，`git diff` 是描述文本差异。三者都有 diff，但不是同一种 diff。

## 来源

- [查询：应用内文件更新与 `git diff` 的区别](../queries/in-app-file-update-vs-app-updater-vs-git-diff.md)
- [消息推送对照报告](../reports/message-delivery-comparison-report.md)
- [产品更新、RSS 与文件 diff 思维模型](../sources/product-updates-rss-file-diff-mental-model.md)

## 相关概念

- [更新系统分层](update-system-layers.md)
- [Electron 打包与发布渠道](electron-build-channels.md)
- [RSS / Telegram 自建推送](rss-telegram-selfhost.md)
