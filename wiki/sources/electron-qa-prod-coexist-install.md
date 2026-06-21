# 来源：Electron QA 与正式安装包如何共存

- **源文件**：`source/_posts/electron-qa-prod-coexist-install.md`（原文已从仓库删除，摘要保留于此）
- **分类**：工程化与运维
- **标签**：构建与部署、跨平台
- **日期**：2026-05-28 10:00:00

## 摘要

作者在 Narrative IDE 打包实践中发现：仅通过 `APP_UPDATE_ENV` 区分 QA / 正式的**更新源**时，本机安装仍会**覆盖**而非共存。根因是 **electron-builder 的 `appId` / `productName` 相同**，安装器视为同一应用。共存需按渠道配置不同 identity，并建议隔离 `userData`；便携版仅作临时方案。

## 要点

1. **`APP_UPDATE_ENV` ≠ 安装 identity**：前者管 `latest.yml`、运行时 API 等；后者由 `appId` + `productName` 决定。
2. **推荐**：QA 示例 `com.narrative.ide.qa` + `Narrative IDE (QA)`；正式保持 `com.narrative.ide` + `Narrative IDE`。
3. **`userData`**：默认常共用 `narrative-ide` 目录；`app.ready` 前 `setPath` 按渠道后缀隔离。
4. **与四月 electron-updater 讨论**：更新投递 vs 本机双安装，正交问题。

## 另见

- [Electron 打包与发布渠道](../concepts/electron-build-channels.md)
- [查询：QA 与正式包能否本机共存](../queries/qa-prod-packages-coexist.md)
- [查询：`version.json + 轮询` 对照 `electron-updater`](../queries/web-version-json-vs-electron-updater.md)
- [消息推送：RSS、应用更新、网页版本更新与 diff 思维对照报告](../reports/message-delivery-comparison-report.md)

---

*摘要与要点：Cursor Agent（Composer），2026-05-28。*
