#!/usr/bin/env bash
set -euo pipefail

# Detect staged database/schema/migration changes.
FILES="$(git diff --cached --name-only --diff-filter=ACMR)"

if [[ -z "$FILES" ]]; then
  echo "Database change check: no staged files."
  exit 0
fi

DB_CHANGED=0
while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  case "$file" in
    */schema/*|*/schemas/*|*/migrations/*|*schema.ts|*schema.sql|*.sqlite|*.db)
      DB_CHANGED=1
      echo "Database-related change detected: $file"
      ;;
  esac
done <<< "$FILES"

if [[ "$DB_CHANGED" -eq 0 ]]; then
  echo "Database change check passed: no database/schema change detected."
  exit 0
fi

if [[ "${MIGRATION_VERIFIED:-false}" != "true" ]]; then
  echo "BLOCKED: database/schema change detected without explicit migration verification." >&2
  echo "Required: plan and test the migration, protect historical data, and set MIGRATION_VERIFIED=true for the approved operation." >&2
  exit 1
fi

echo "Database change check passed with explicit migration verification."
