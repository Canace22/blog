# 来源：模型是怎么一步步走向生产环境的

- **源文件**：[`source/_posts/llm-to-harness.md`](../../source/_posts/llm-to-harness.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-09-08 14:55:19

## 摘要

读书笔记，参考文章为[《从一次 LLM 调用到完整 Harness，Agent 到底经历了什么？》](https://mp.weixin.qq.com/s/kZZac-VBgnQIZeookE9Y8g)。文章借「张三在工位上的一天」，按时间顺序讲单次模型调用怎样一层层补齐：上下文装配 → ReAct 循环 → 工具调用规范 → 记忆系统 → Agent Harness。结论是模型底层的计算没变，是外面垒起来的工程系统让它能稳定跑在生产环境里。

## 要点

- **单次调用**：模型只是文本映射函数，没有上下文，也没有工具。
- **上下文装配**：宿主系统把常驻地、时间、系统提示和用户输入拼在一起。模型看到的世界全由外部逻辑决定。案例：历史裁剪删掉了记录出生年份的那几轮，模型就答不出角色年龄，回答质量被装配层卡住。
- **ReAct**：推理和外部动作交替进行（读报错对应的代码行 → 发现问题 → 改文件），模型能根据观察结果修正下一步。
- **工具调用规范化**：Tool Schema 声明工具，Tool Router 拦截、校验并执行，Tool Result 带唯一标识回灌上下文。从这一步起，模型输出的是驱动系统的结构化指令。
- **记忆分层**：短期工作记忆跟着当前轮次走，长期记忆放外部按需检索。长期记忆分三类：程序记忆（规则文件、Skill）、语义记忆（术语、规范，存在向量库或索引里）、情景记忆（近期失败原因、被否决的改法）。难点不在怎么存，而在什么时候写、什么时候捞、怎么合并。
- **Harness**：模型决定下一步做什么，Harness 管这一步在什么上下文、权限、生命周期和持久化规则下运行。不同场景的取舍：
  - Pi Agent：极简，适合本地小脚本。
  - OpenCode：事件驱动，能中断、恢复、审计，适合团队工程。
  - Codex Harness：安全沙箱，关键变更要人确认，适合大面积改动。
  - Hermes Agent：外置、持续演进的认知状态，适合长期共事。

## 另见

- [Harness Engineering](../concepts/harness-engineering.md)
- [Chat assistant user memory](../concepts/chat-assistant-user-memory.md)
- [Prompt Caching](../concepts/prompt-caching.md)
- [Pi Coding Agent / pi-mono](pi-coding-agent.md)
- [Codex Agent Harness 套壳实现自己的 AI 产品](how-can-i-use-codex-harness.md)

---

*维护：Claude（Cowork），2026-09-28。*
