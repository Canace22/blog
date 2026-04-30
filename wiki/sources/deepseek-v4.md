# 来源：DeepSeek-V4 技术报告

- **源文件**：[DeepSeek_V4.pdf](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/blob/main/DeepSeek_V4.pdf)
- **分类**：AI / 模型架构
- **标签**：DeepSeek / MoE / 长上下文 / 注意力机制
- **日期**：2026-04-25

## 摘要

DeepSeek-V4 系列包括两个 MoE 模型：DeepSeek-V4-Pro（1.6T 参数，49B 激活）和 DeepSeek-V4-Flash（284B 参数，13B 激活），支持 100 万 token 上下文。

## 核心架构升级

1. **混合注意力**：CSA（压缩稀疏注意力）+ HCA（重度压缩注意力），提升长上下文效率
2. **mHC（流形约束超连接）**：增强传统残差连接
3. **Muon 优化器**：收敛更快，训练更稳定

## 训练

- 预训练：超过 32T 高质量 token
- 后训练：完整 pipeline 解锁并增强能力

## 效率提升

- 100 万 token 上下文下：仅需 DeepSeek-V3.2 的 **27% FLOPs**，**10% KV cache**
- DeepSeek-V4-Pro-Max 在各项基准测试中刷新 SOTA

## 链接

- https://huggingface.co/collections/deepseek-ai/deepseek-v4