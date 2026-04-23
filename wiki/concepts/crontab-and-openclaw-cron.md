# 系统 crontab 与 OpenClaw 定时任务

OpenClaw（文中「龙虾」）工作流里，**系统级** `crontab` 与**工作空间内**定时是两条通道。不需要大模型、纯脚本就能完成的周期任务（拉数据、按条件发提醒等）适合放在**系统**侧：更省 token、行为更确定。需要**理解、概括、多轮**或必须走 agent 工具链时，再放在 **OpenClaw 工作空间**里配置（如文中所说 `cron` 目录取向）。

与「自建 wiki 同步、RSS、盯盘」等组合时：同一类业务可以只在系统层用 shell/python 跑完，也可以只在 agent 里跑，按成本与可维护性切分，而不是非此即彼。

## 相关来源

- [定时任务](../sources/scheduled-tasks.md) — `crontab` 命令、五段式与符号备忘（macOS）
- [OpenClaw 的一些使用体验](../sources/openclaw-usage-experience.md) — workspace 内 memory/wiki、RSS→Notion、条件盯盘等，与系统定时可并行
