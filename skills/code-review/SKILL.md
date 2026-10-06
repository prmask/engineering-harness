# Code Review

## Purpose
Independently identify defects, risks, and unnecessary complexity in completed work.

## Procedure
1. Read the original requirement and acceptance criteria.
2. Read relevant experiment, product, and architecture documentation.
3. Review the diff and affected files.
4. Check correctness and edge cases.
5. Check architecture and maintainability.
6. Check tests and test quality.
7. Check data integrity and experiment integrity when applicable.
8. Check security implications.
9. Check approved UX/UI adherence when applicable.
10. Report findings by severity.

## Rules
- For significant changes, review from fresh context and do not rely on the implementer's explanation as evidence.
- For trivial changes, fresh-context review may be omitted when no meaningful risk exists.
- If review findings require changes, the corrected change must receive a fresh re-review before verification.
- Do not assume passing tests prove correctness.
- Do not approve behavior that conflicts with authoritative documentation.
- Distinguish confirmed defects from suggestions.

## Output
Findings with severity, evidence, affected location, and recommended remediation; or an explicit approval with verification performed.

## Review Evidence
For significant changes, record the review result with:
- review scope and files/diff examined;
- fresh-context status;
- findings with severity, evidence, affected location, and recommended remediation;
- fixes made for blocking findings;
- fresh re-review result after required fixes;
- final review disposition;
- verification performed after the final review.

Do not record a clean approval without stating what was actually reviewed.
