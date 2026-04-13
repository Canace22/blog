# 来源：karpathy / autoresearch

- **来源类型**：开源仓库（README 与仓库结构说明）
- **链接**：<https://github.com/karpathy/autoresearch>
- **访问日期**：2026-04-13

## 摘要

**autoresearch** 给 AI agent 一个可在单 GPU 上运行的精简 LLM 训练环境，让 agent 在固定 wall-clock 预算内自主做实验：改代码、短训、根据验证指标保留或丢弃改动并重复。训练代码被描述为 [nanochat](https://github.com/karpathy/nanochat) 的简化单卡实现；人类主要通过编辑 **`program.md`** 为 agent 提供指令与上下文，而不是像常规研究那样直接改遍所有 Python 文件。README 将默认 `program.md` 比作轻量「skill」，并保留向多 agent、更强「研究组织」配置演进的空间。

## 仓库中三类核心文件（按 README）

| 文件 | 角色 |
| --- | --- |
| `prepare.py` | 常量、一次性数据与 tokenizer 准备、运行时工具；**不期望被 agent 修改** |
| `train.py` | 模型、优化器、训练循环；**由 agent 编辑迭代** |
| `program.md` | 给单个 agent 的基线说明；**由人类编辑迭代** |

## 实验约定（按 README）

- 单次训练使用**固定约 5 分钟**墙钟预算（启动/编译等不计入），便于跨实验可比。
- 主要指标为验证集 **val_bpb**（bits per byte），越低越好，且与词表规模无关，便于架构改动间公平比较。

## 环境要求（摘录）

- 单块 NVIDIA GPU（README 示例为 H100）、Python 3.10+、[uv](https://docs.astral.sh/uv/) 等；其他平台可能需 fork 或参考完整 nanochat。

## 关联概念

- [假设驱动 AI 调试（概念）](../concepts/hypothesis-driven-ai-debugging.md)
- [Harness Engineering（概念）](../concepts/harness-engineering.md)

## 参考链接

- [仓库 README](https://github.com/karpathy/autoresearch/blob/master/README.md)
- Karpathy 相关帖文（README 内引用）：<https://x.com/karpathy/status/2029701092347630069>、<https://x.com/karpathy/status/2031135152349524125>
