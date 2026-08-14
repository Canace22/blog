# 来源：我让 Claude 给视频里的人脸打码，顺手做成了一个 Skill

- **源文件**：[`source/_posts/video-face-mosaic-skill.md`](../../source/_posts/video-face-mosaic-skill.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-08-02 16:46:26

## 摘要

文章记录用 Claude 完成视频人脸打码，并把检测、轨迹补齐、指定人物保留和 HDR 处理整理成可复用 Skill 的过程。案例强调，稳定工作流还要覆盖输入检查与结果验收。

## 要点

- 单帧人脸检测会因侧脸、遮挡和快速移动而漏检，需要通过轨迹补齐减少马赛克闪烁。
- 用户可在参考帧中指定保留人物，脚本再向前、向后跟踪并排除该人物。
- 手机 HDR 素材若按普通 SDR 流程重编码，可能丢失色彩信息并导致画面发灰。
- 处理前应检查色彩元数据，输出时保留匹配的位深、编码和色彩参数。
- 一次性脚本只有补上输入检查、轨迹处理和结果验收后，才适合沉淀为 Skill。

## 另见

- [笔记本都合上了，Claude 为什么还能在手机上执行电脑上装的技能？](../sources/claude-skill-cross-device.md)
- [Skill、会话与执行环境](../concepts/skill-session-runtime.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [提升 AI Coding 稳定性的经验上下文模式](../concepts/agent-coding-stability.md)
- [AI 工程化写作主轴](../reports/ai-engineering-theme-synthesis.md)

*维护：Cursor Agent，2026-08-14。*
