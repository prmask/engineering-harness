---
command: /security
workflow: engineering-harness/core/workflows/security-change.md
skills:
  - engineering-harness/skills/security-review/SKILL.md
---

# /security

Review a change for security risks.

## Execution

1. Read `engineering-harness/core/workflows/security-change.md`.
2. Load `security-review`.
3. Inspect inputs, authentication/authorization where relevant, secrets, data exposure, dependencies, filesystem/database access, and unsafe operations.
4. Consider the local-first threat model and experiment-data confidentiality/integrity.
5. Report concrete findings and required mitigations.

## Rule

Do not weaken security controls merely to make a workflow easier to execute.
