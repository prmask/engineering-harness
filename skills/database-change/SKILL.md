# Database Change

## Purpose
Safely change the database while preserving historical experimental evidence.

## Procedure
1. Read relevant schema, architecture, experiment, and data-integrity documentation.
2. Identify affected tables, fields, records, calculations, and historical data.
3. Determine whether the change alters experiment meaning.
4. Design a deterministic migration.
5. Create a backup before destructive or risky operations.
6. Implement the migration.
7. Test migration on representative data.
8. Verify historical records and calculated results.
9. Consider rollback/recovery.
10. Update schema, architecture, and migration documentation.

## Rules
- Never silently overwrite or delete observations.
- Never convert missing data to zero.
- Never manually edit historical data to make tests pass.
- Preserve previous methodology when calculations change.
- Destructive migrations require backup and verification.

## Output
Impact assessment, migration plan, implementation, tests, integrity checks, backup/recovery considerations, and documentation updates.
