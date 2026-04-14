# 来源：Gemini 对话——Mac 上 Ubuntu 虚拟机容量与 OpenClaw 场景

- **类型**：Gemini 对话整理（非博客 `source/_posts`）；操作步骤与仓库链接以本页摘要为准，**安装与克隆地址务必再对照 [OpenClaw 官方文档](https://docs.openclaw.ai/) 与官方仓库**（对话后半段出现的示例 `git clone` 目标与常见官方组织名不一致，可能过时或不可靠）。
- **外部链接（会话入口）**：<https://gemini.google.com/app/6828256894792422>
- **分类**：工程化与运维（开发环境 / 虚拟机）
- **标签**：开发工具
- **日期**：2026-04-10

## 摘要

用户在 Mac 上创建 Ubuntu 虚拟机（对话上下文含 UTM 类界面、GiB 容量、ARM64），先问磁盘给多少合适，再明确用途为跑 **OpenClaw**（AI Agent / chatbot 框架，非《Captain Claw》游戏引擎）。Gemini 随场景从通用 Linux 虚拟机建议收敛到 **64 GiB 磁盘、约 4 CPU、4–8 GB RAM、Shared Network**，并补充 Apple Silicon 需 **ARM64 ISO**、黑屏时检查 ISO 挂载与显示设备、安装时选抹除虚拟盘、装完卸 ISO 等。

## 按场景的磁盘建议（对话内）

| 场景 | 建议（GiB） |
| --- | --- |
| 基础体验 / 学命令 | 25–32 |
| 日常 Web / 轻后端 | 64–80（对话称「推荐」） |
| 重度编译 / 大数据 / 大模型 | 128+ |
| Mac 本机盘很紧（如总容量 256GB） | 可压到约 40，并注意清理 apt 与 Docker |
| 对话中「OpenClaw chatbot 框架」最终口径 | **64** |

**动态磁盘**：对话强调多数虚拟机默认稀疏/动态分配，标称 64 GiB 不会立刻占满宿主机，但仍建议略多留，扩容分区对新手麻烦。

## 虚拟硬件与网络（对话内）

- **CPU**：建议 4 核（并发消息、多 Skill、Node 编译）。
- **内存**：至少 4 GB；若本机 16 GB 且要边开发边跑 Agent/浏览器自动化，建议 8 GB。
- **网络**：Shared Network，便于虚拟机沿用 Mac 侧代理访问云端 API。
- **显示**：可尝试 virtio 类 GPU 支持项以改善桌面流畅度；若安装阶段黑屏可改非加速显示试排错。

## 安装与排错要点（对话内）

- **架构**：Apple Silicon 选 ARM64 时，ISO 须为 **ARM64**（如 live-server arm64），勿混用默认 x86 镜像。
- **黑屏**：先确认已挂载 Ubuntu ISO 并从光盘引导；再核对架构与显示设备。
- **磁盘步骤**：在虚拟机内「抹除磁盘并安装」只作用于虚拟磁盘，不伤 macOS。
- **装完后**：从虚拟光驱卸载 ISO，避免再次进入安装程序。

## 环境初始化（对话中的示例命令，需自行校验）

对话中出现两类路径：包管理器全局安装（`npm install -g openclaw`）与 `nvm` 安装 Node 22、以及 `git clone` 某 GitHub 仓库后 `npm install`。**具体包名、CLI 子命令与仓库 URL 以官方为准**；本知识库另见 [OpenClaw Memory Wiki](openclaw-memory-wiki.md)（插件与知识层设计，非安装手册）。

## 另见

- [Mac / Linux 虚拟机资源与 OpenClaw 开发](../queries/mac-linux-vm-openclaw-dev.md)
- [OpenClaw Memory Wiki](openclaw-memory-wiki.md)
- [Pi Coding Agent / OpenClaw 集成线索](pi-coding-agent.md)
