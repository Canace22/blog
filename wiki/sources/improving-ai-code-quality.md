# Source: 如何提升 AI 代码质量

## Source File

- `AI 探索/如何提升 AI 代码质量.md`

## Summary

Practical checklist for better outcomes with AI-generated code: stronger docs and instructions, mandatory human verification, a staged iteration mental model (first/second/third attempt), context management via tooling, marking human-edited regions, and treating the model as a non-learning junior.

## Key Points

- **Docs and specs**: Project files (e.g. `Claude.md`) with architecture, patterns, pitfalls; “document everything” as leverage.
- **Verification**: Extra care for state, performance, and security; three-step review (AI pre-review, developer on architecture/business, normal team review).
- **Iteration**: Expect rough first output, improving understanding by the second pass, usable baseline by the third; continuous correction.
- **Context**: Split problems; connect AI to tickets, docs, DB sandboxes, repo/PR history.
- **Hygiene**: Mark human edits so the model does not misattribute code.
- **Mindset**: Detach ego from “my code”; focus on the problem solved.

## Related Concepts

- [AI-assisted development](../concepts/ai-assisted-development.md)
- [AI Knowledge Bases](../concepts/ai-knowledge-bases.md)

## Notes

Aligns with external “95% garbage first attempt” narrative cited elsewhere in the author’s reading list.
