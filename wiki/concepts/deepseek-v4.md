# DeepSeek-V4

## 简介

DeepSeek-V4 系列是 DeepSeek 的最新 MoE 大模型，支持 100 万 token 上下文，在长上下文场景下效率大幅提升。

## 核心要点

- **模型规模**：DeepSeek-V4-Pro（1.6T 参数，49B 激活）、DeepSeek-V4-Flash（284B 参数，13B 激活）
- **架构创新**：混合注意力（ CSA + HCA）、mHC、Muon 优化器
- **长上下文效率**：100 万 token 下仅需 V3.2 的 27% FLOPs、10% KV cache

## 相关来源

- [DeepSeek-V4 技术报告](../sources/deepseek-v4.md)