# AI-assisted development

## Definition

Using LLM-based tools (IDE agents, MCP, project rules) to write, review, and refactor software, with the human responsible for architecture, verification, and integration.

## Source-Backed Themes

- **Project context**: Centralize stack, environment, style, and conventions so the model starts closer to “second attempt” quality rather than guessing blind ([AI 辅助开发探索](../sources/ai-assisted-development-exploration.md)).
- **Roles**: Treat the engineer as orchestrator of agents, mentor reviewing outputs, and problem solver rather than primary typist (same source).
- **Quality and safety**: Always verify; pay extra attention to state, performance, and security; use layered review (AI pre-pass, human on architecture and business, normal team bar) ([如何提升 AI 代码质量](../sources/improving-ai-code-quality.md)).
- **Iteration**: Expect a multi-pass loop; early outputs mainly teach the system what the task really is ([如何提升 AI 代码质量](../sources/improving-ai-code-quality.md)).
- **Tooling**: Browser automation via Playwright MCP from Cursor ([Cursor Playwright MCP](../sources/cursor-playwright-mcp.md)).
- **Language for prompts**: Consistent English verbs for instructions when prompting ([prompt vocabulary](../sources/prompt-vocabulary-for-coding.md)).
- **Further reading**: Prompting guides and “harness engineering” links as bookmarks ([prompt engineering reading list](../sources/prompt-engineering-reading-list.md), [harness links](../sources/harness-engineering-links.md)).

## Relationship To This Wiki

- An [LLM Knowledge Base](llm-knowledge-bases.md) is one way to give the agent durable, structured context beyond a single chat.
- [AI Knowledge Bases](ai-knowledge-bases.md) cover upload-and-query style grounding; development workflows often combine both patterns.

## Current Evidence In Repo

- [OpenClaw agent + memory-wiki](../sources/openclaw-agent-pi-mono.md)
- [AI 辅助开发探索](../sources/ai-assisted-development-exploration.md)
- [如何提升 AI 代码质量](../sources/improving-ai-code-quality.md)
- [Cursor Playwright MCP](../sources/cursor-playwright-mcp.md)
- [Prompt vocabulary](../sources/prompt-vocabulary-for-coding.md)
- [Prompt engineering reading list](../sources/prompt-engineering-reading-list.md)
- [Harness engineering links](../sources/harness-engineering-links.md)
- [Canace blog index](../sources/canace-blog-index.md) (catalog of longer posts, many on AI coding)

## Synthesis

The through-line is **governance**: AI accelerates drafting, but ownership of correctness, security, and maintainability stays with the human. Strong shared context (rules files, wikis, tickets) reduces rework; explicit review and iteration expectations reduce surprise when the first patch is wrong.
