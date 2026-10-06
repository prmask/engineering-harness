# New Feature Workflow

## Purpose
Safely move an approved feature request from product requirement to verified implementation.

## Flow
User request
→ Product Architect
→ Research if needed
→ UX/UI Design if the feature affects the interface
→ System Architect
→ Acceptance criteria and tests
→ Implementer
→ Automated tests
→ Fresh-context review
→ Security/Data Integrity/Experiment review when applicable
→ Verification
→ Documentation
→ Memory

## Steps

1. Read `AGENTS.md` and relevant product, experiment, architecture, and decision documents.
2. Product Architect defines behavior, scope, acceptance criteria, and edge cases.
3. Researcher performs research when unfamiliar technology or external knowledge is required.
4. UX/UI Designer designs affected flows and states when the feature changes the UI.
5. System Architect identifies technical impact and approves the implementation approach.
6. Test Engineer defines tests before implementation where practical.
7. Implementer implements only the approved scope.
8. Run unit/integration/E2E tests appropriate to the change.
9. Code Reviewer reviews significant changes from fresh context; trivial changes may omit fresh-context review when no meaningful risk exists.
10. Run Security Reviewer, Data Integrity, or Experiment Scientist when the change affects their areas.
11. Run typecheck, lint, build, and other required verification.
12. Update authoritative documentation.
13. Update memory only for useful non-authoritative context.

## Rules
- Do not silently invent requirements.
- Do not silently change experiment rules.
- Do not skip UX design for meaningful interface changes.
- Do not claim completion without verification.
