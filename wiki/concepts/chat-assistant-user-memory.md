# Chat assistant user memory

## Definition

Product-level mechanisms where a chat assistant retains or reconstructs information about the user across separate conversations—distinct from a single long context window or a user-managed document corpus.

## Source-Backed Model (Gemini)

According to the author’s conversation with Gemini ([source](../sources/gemini-user-summary-cross-session.md)):

- A cloud-synced **User Summary** aggregates distilled notes from prior chats (“memory fragments”).
- New sessions receive that summary as part of context so the model can personalize without shipping full raw history across threads.

## Contrast With Other Patterns

- **[AI Knowledge Bases](../concepts/ai-knowledge-bases.md)**: Often user-uploaded documents the model retrieves at query time; oriented around *your files*, not automatic profiling.
- **[LLM Knowledge Bases](../concepts/llm-knowledge-bases.md)**: A maintained markdown wiki the user (and agent) curates explicitly; transparent and portable compared to opaque vendor summaries.

## Token and Quality Tradeoffs

From developer practice notes ([原来我一直用错了 Cowork](../sources/use-cowork.md)):

- Vendor **Memory** (Cowork, Codex) updates and reads incur token on every task—not just a one-time UX win.
- For one-off tasks, disabling Memory can reduce cost; author reports higher hallucination rates after enabling Memory in some tools.

## Practical Takeaway

Cross-session summaries can make assistants feel “aware” of stable preferences and projects. They are useful for UX but are not a substitute for explicit, auditable knowledge bases or wikis when you need provenance and control. Weigh Memory against token budget and error rate for the task at hand.

## Current Evidence In Repo

- [Gemini User Summary note](../sources/gemini-user-summary-cross-session.md)
- [OpenClaw 的一些使用体验](../sources/openclaw-usage-experience.md) — workspace 内 `memory/`、`MEMORY.md` 等文件化连续性，与厂商 User Summary 对照
- [原来我一直用错了 Cowork](../sources/use-cowork.md) — Cowork / Codex Memory 的 token 开销与幻觉体感

---

*修订：Cursor Agent，2026-06-23。*
