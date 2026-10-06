# Release

## Purpose
Verify that a change or release is safe, reproducible, documented, and ready to use.

## Procedure
1. Confirm scope and acceptance criteria.
2. Check Git status and diff.
3. Create/verify a database backup when applicable.
4. Verify migrations.
5. Run unit/integration tests.
6. Run E2E tests where applicable.
7. Run typecheck.
8. Run lint.
9. Run production build.
10. Run security checks where applicable.
11. Verify documentation and changelog/release notes.
12. Confirm experiment data integrity.
13. Record verification results.
14. Release only after required checks succeed.

## Rules
- Never claim a check passed unless it was actually run.
- Never release with known critical data-integrity or security failures.
- Do not include unrelated changes in a release.
- Preserve reproducibility.

## Output
Release scope, checks run, results, migrations/backups verified, known issues, documentation status, and release decision.
