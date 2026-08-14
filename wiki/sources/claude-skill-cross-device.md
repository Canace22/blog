# 来源：笔记本都合上了，Claude 为什么还能在手机上执行电脑上装的技能？

- **源文件**：[`source/_posts/claude-skill-cross-device.md`](../../source/_posts/claude-skill-cross-device.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-08-14 11:33:00

## 摘要

作者在电脑上沉淀了视频人脸打码 Skill，合上 Mac 后仍通过手机会话继续跑完任务。实测表明：Claude Pro 以上账号会把自定义 Skill 以 zip 形式挂到云端个人容器（如 `/mnt/skills/user/video-face-mosaic/`），每次在临时 Linux 容器里执行；手机只是入口，产物需自行下载，无法直接写入本机相册。

## 要点

- 触发场景：Claude 提示「合上电脑也可在其他设备继续任务」；作者原以为本机 ffmpeg、deface、OpenCV 依赖无法跨设备复用。
- 结果：手机会话完成打码，可下载并上传到其他平台；AI 从办公提效延伸到日常视频处理。
- Skill 随账号走：换手机、换电脑、换浏览器登录，看到的都是同一份已上传 Skill。
- 执行环境：云端一次性 Linux 容器，不是调用合上盖子的 Mac 本机进程。
- 边界：处理完返回产物，不能碰用户本地存储；iPhone 上无法直接存相册，只能下载后再手动处理。
- 延伸设想：把更多「只能在电脑上做的事」沉淀成 Skill，以后可能只需手机 + 一个 AI 客户端。

## 另见

- [Skill、会话与执行环境](../concepts/skill-session-runtime.md)
- [我让 Claude 给视频里的人脸打码，顺手做成了一个 Skill](../sources/video-face-mosaic-skill.md)
- [原来我一直用错了 Cowork](../sources/use-cowork.md)
- [Claude Code 常见工作流](../concepts/claude-code-workflows.md)
- [提升 AI Coding 稳定性的经验上下文模式](../concepts/agent-coding-stability.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)

*维护：Cursor Agent，2026-08-14。*
