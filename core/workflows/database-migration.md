# Database Migration Workflow

## Purpose
Change database structure safely while preserving historical experimental evidence.

## Flow
Schema proposal
→ Impact analysis
→ Data Integrity review
→ Migration plan
→ Backup
→ Migration
→ Migration test
→ Historical-data verification
→ Application verification
→ Documentation

## Steps

1. Identify affected schema and application behavior.
2. Read experiment and data-integrity rules.
3. Determine whether the change affects historical observations or calculations.
4. Design a deterministic migration.
5. Create a backup before risky/destructive operations.
6. Implement the migration.
7. Test it against representative data.
8. Verify historical records, nullability, dates, scoring, and calculated metrics.
9. Test application behavior after migration.
10. Document the migration and recovery considerations.

## Rules
- Missing data remains missing.
- Never silently overwrite observations.
- Never manually alter historical data to satisfy a test.
- Preserve previous methodology when calculation definitions change.
