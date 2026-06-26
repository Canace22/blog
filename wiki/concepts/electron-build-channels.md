# Electron 打包与发布渠道

用 **electron-builder** 发 Electron 应用时，**更新渠道**（如 `APP_UPDATE_ENV` → `latest.yml` base URL）与 **安装 identity**（`appId`、`productName`）是两条正交的线；只改前者无法实现本机 QA + 正式双安装。

## Claims

1. **相同 `appId`**：Windows NSIS / macOS 将后装视为对先装的升级或替换，不会并排保留两个应用。
2. **`APP_UPDATE_ENV`（或同类变量）**：通常写入 `extraMetadata`、选择 `publish` URL、驱动运行时 API；**不**改变操作系统层面的应用标识。
3. **共存方案**：按渠道设置不同 `appId` + `productName`；可选 `artifactName` 区分产物文件名。
4. **`userData` 隔离**：`package.json` 的 `name` 往往决定默认数据目录；双安装时应在 `app.ready` 前 `app.setPath('userData', …)` 按渠道分目录。
5. **便携版**：可与安装版临时并存，但常不支持 `electron-updater`，且未隔离时仍可能共用数据目录。

## Evidence

- [来源：Electron QA 与正式安装包如何共存](../sources/electron-qa-prod-coexist-install.md)
- [查询：`version.json + 轮询` 对照 `electron-updater`](../queries/web-version-json-vs-electron-updater.md)（更新投递层）
- [消息推送：RSS、应用更新、网页版本更新与 diff 思维对照报告](../reports/message-delivery-comparison-report.md)

## 相关

- [更新系统分层](update-system-layers.md)（从轻量提醒到完整 updater 的五层模型）
- [Diff 三层对照](diff-three-layer-model.md)（应用更新 / 应用内文件更新 / git diff 三种 diff 层级）
- [查询：QA 与正式包能否本机共存](../queries/qa-prod-packages-coexist.md)

---

*概念页：Cursor Agent（Composer），2026-05-28。*
