# Release Workflow

## Purpose
Verify that the application is ready for a controlled release or deployable state.

## Flow
Release scope
→ Git/diff check
→ Backup/migration check
→ Tests
→ Typecheck
→ Lint
→ Build
→ E2E
→ Security/integrity checks
→ Documentation
→ Final verification
→ Release

## Steps

1. Confirm release scope and acceptance criteria.
2. Inspect Git status and diff.
3. Create/verify database backup when applicable.
4. Verify migrations.
5. Run unit/integration tests.
6. Run E2E tests where applicable.
7. Run typecheck.
8. Run lint.
9. Run production build.
10. Run security checks when applicable.
11. Verify experiment/data integrity.
12. Update changelog/release notes and documentation.
13. Record actual verification results.
14. Release only when required checks pass.

## Rules
- Never claim a check passed unless it was actually run.
- Never release with unresolved critical data-integrity or security failures.
- Do not include unrelated changes.
