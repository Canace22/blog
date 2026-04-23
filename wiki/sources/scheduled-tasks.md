# 来源：定时任务

- **源文件**：[`source/_posts/scheduled-tasks.md`](../../source/_posts/scheduled-tasks.md)
- **分类**：工程化与运维
- **标签**：开发工具
- **日期**：2026-04-23 10:00:00

## 摘要

在「养龙虾（OpenClaw）」里配置定时：一部分任务只在系统层跑、未写进工作空间，由此区分两类调度——**系统定时任务**（`crontab`）与 **openclaw 工作空间**内（如 `cron` 相关目录）的定时。不需要大模型参与、纯脚本可完成的活（如信息拉取、盯盘触发）用系统 `crontab` 更省 token、执行更确定；只有需要**提取与总结**等需 LLM 能力时才放到 openclaw 侧。文末给出 macOS 上 `crontab` 的用法与表达式备忘。

## 文中要点

- **命令**：`crontab -l` 列出当前用户；`crontab -e` 编辑，交互与 `vim` 相同（`i` / `esc` / `:wq`）。
- **单行结构（直觉版）**：[五段式时间] [解释器/可选] [脚本绝对路径] `>>` 日志路径 `2>&1`；路径宜全部**绝对路径**。
- **时间五段**：[分钟 0–59] [小时 0–23] [日 1–31] [月 1–12] [星期 0–7，0 与 7 为周日]。
- **常见符号**：`*` 表「每」；`,` 多值列举；`-` 连续范围；`/` 步进（如 `*/10` 每 10 分钟）。

## 关联

- [系统 crontab 与 OpenClaw 定时任务](../concepts/crontab-and-openclaw-cron.md)
- [OpenClaw 的一些使用体验](openclaw-usage-experience.md)（同主题：workspace 内 RSS/盯盘与定时，可与系统层分工）
- [linux后台执行脚本](linux-background-script-execution.md)（长驻/会话维度的对照）
