# 查询：正式包安装会覆盖 QA 包，能否两种包共存？

## 问题

Electron 项目用 `APP_UPDATE_ENV` 区分 QA / 正式更新地址，本机先装 QA 再装正式时，正式包会**覆盖** QA，能否共存？

## 答案

**可以**，但必须在 **electron-builder** 层为两渠道使用**不同的 `appId` 与 `productName`**。仅区分 `APP_UPDATE_ENV` 不够。

## 原因（一句话）

安装器用 `appId`（macOS 为 Bundle ID）判断是否为同一应用；当前若两渠道共用同一 identity，后装即升级/覆盖。

## 建议步骤

1. QA：`com.*.qa` + 带 `(QA)` 的 `productName`；正式：生产用 `appId` / 名称。
2. 在 `app.ready` 前按渠道设置不同 `userData` 路径，避免配置混用。
3. CI 与上传目录按渠道分开；签名/公证注意 QA Bundle ID。
4. 临时可用 Windows 便携版 + 安装版，但不适合作为长期 QA/正式并行方案。

## 延伸阅读

- [来源：Electron QA 与正式安装包如何共存](../sources/electron-qa-prod-coexist-install.md)
- [Electron 打包与发布渠道](../concepts/electron-build-channels.md)
- [查询：`version.json + 轮询` 对照 `electron-updater`](web-version-json-vs-electron-updater.md)

---

*查询页：Cursor Agent（Composer），2026-05-28。*
