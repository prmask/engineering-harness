# Engineering Harness Hooks

Hooks are automatic guardrails.

## Guardrails

- TypeScript edits → formatting and linting.
- Pre-commit → secrets, database, UI checks, typecheck, and tests.
- Database changes → migration verification.
- Destructive commands → explicit approval.
- Significant UI changes → UX/UI workflow warning.

## Relationship

- `CONSTITUTION.md` = what rules must be obeyed.
- `engineering-harness/agents/` = who performs specialized work.
- `engineering-harness/skills/` = how reusable work is performed.
- `engineering-harness/core/workflows/` = in what order work is performed.
- `engineering-harness/hooks/` = automatic guardrails.
- `docs/` = authoritative project knowledge.

UX/UI is included as a guardrail because interface and visualization changes can affect both usability and interpretation of data.
