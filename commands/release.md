---
command: /release
workflow: engineering-harness/core/workflows/release.md
skills:
  - engineering-harness/skills/release/SKILL.md
  - engineering-harness/skills/security-review/SKILL.md
---

# /release

Prepare and verify a release using the documented release workflow.

## Execution

1. Read `engineering-harness/core/workflows/release.md`.
2. Load `release`.
3. Check relevant ADRs and release scope.
4. Run required tests, security checks, and data-integrity checks.
5. If the release changes experiment-facing UI or analytics, verify the relevant UX/UI and evidence-preservation requirements.
6. Confirm migrations and historical data protections where applicable.
7. Report the exact verification performed.

## Rule

Do not declare a release ready based on intent or an unexecuted checklist.
