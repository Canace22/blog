# Mac / Linux 虚拟机资源与 OpenClaw 开发

本页把「在 Mac 上开 Ubuntu 虚拟机跑类 OpenClaw 的 Node/Agent 工作负载」时的**资源规划**从单次对话里抽成可检索的要点，并与本库其他 OpenClaw 资料对齐。

## Claims（可操作的规划结论）

1. **磁盘**：以「Ubuntu 桌面 + Node 工具链 + 依赖缓存 + 可能的浏览器自动化（Playwright 等）+ 可选 Docker」为上限估算时，**64 GiB 级虚拟盘**在对话中被当作均衡默认值；本机存储紧张时可缩小，但扩容与分区调整成本更高。
2. **动态分配**：标称虚拟盘容量常按稀疏增长，但仍要为日志、镜像与缓存留余量。
3. **ARM Mac**：客户机与 ISO 架构须一致（aarch64），否则易引导失败或黑屏。
4. **网络**：桥接/共享网络若能让 VM 沿用宿主代理，可减少在 Linux 内重复配置代理的成本（视实际软件与策略而定）。

以上结论主要来自 [Gemini 对话摘要：Mac Ubuntu VM 与 OpenClaw](../sources/gemini-mac-ubuntu-vm-openclaw.md)，属**助手建议**而非厂商规格；真实占用随版本与 workload 变化。

## Evidence

- [来源：Gemini 对话——Mac 上 Ubuntu 虚拟机容量与 OpenClaw 场景](../sources/gemini-mac-ubuntu-vm-openclaw.md)
- OpenClaw 产品与插件设计（非安装手册）：[OpenClaw Memory Wiki](../sources/openclaw-memory-wiki.md)

## Open Questions

- 官方推荐的最低/推荐 Node 版本、CLI 与仓库入口应以 `docs.openclaw.ai` 与官方 GitHub 为准，本概念页不固化具体命令。

## 相关

- [Harness Engineering](harness-engineering.md)（Agent 工作流与工具链上下文）
- [Compiled knowledge vault](compiled-knowledge-vault.md)
