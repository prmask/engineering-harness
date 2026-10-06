---
command: /verify
workflow: workflow selected by the change
skills:
  - engineering-harness/skills/tdd/SKILL.md
  - engineering-harness/skills/e2e-testing/SKILL.md
---

# /verify

Verify that a requested change is actually complete.

## Execution

1. Identify the owning workflow and its Definition of Done.
2. Read relevant ADRs and authoritative specifications.
3. Run required automated tests.
4. Run relevant integration/E2E checks.
5. For UI changes, perform visual and interaction verification across required states and responsive layouts.
6. For experiment-facing changes, verify data integrity, historical scoring, missing-data handling, and evidence presentation.
7. Report only evidence that was actually obtained.

## Rule

`/verify` is not a status command. It performs verification.
