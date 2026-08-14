# 来源：AI 生成到 90% 突然断了：你的解决方案是？

- **源文件**：[`source/_posts/ai-stream-recovery.md`](../../source/_posts/ai-stream-recovery.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-08-03 16:33:58

## 摘要

从客户端断线、上游模型请求失败和生成服务崩溃三类故障出发，区分事件重放、语义续写与推理状态恢复，并给出流式文本、JSON、HTML、Markdown、Unicode、代码和 Agent 工具调用的安全恢复原则。

## 要点

- AI 流式恢复分为连接恢复、内容恢复和推理恢复，界面上的「继续」不一定恢复了模型原来的计算现场。
- 客户端连接中断时，后台任务可继续运行并保存输出；客户端携带 `last_seq` 重连后补发缺失事件。
- `generation_id + revision + seq` 可以标识任务、区分重新生成版本并完成排序、查漏和去重。
- 原模型请求失败后，只能基于已有文本发起新的语义续写，结果可能重复、漏写或改变风格。
- JSON、HTML 和 Markdown 半成品可以预览，但不能在完成校验前当作最终数据提交或执行。
- Agent 工具调用必须等待参数完整并通过 Schema 校验；有副作用的操作还需幂等键和状态记录。
- 事件日志解决内容不丢失，KV Cache 减少前文重算，两者不能互相替代。

## 另见

- [AI 流式生成恢复](../concepts/ai-stream-recovery.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [大语言模型工作原理概览](../concepts/large-language-model-fundamentals.md)

*维护：Cursor Agent，2026-08-12。*
