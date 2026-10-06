#!/usr/bin/env bash
set -euo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "BLOCKED: database-change adapter requires python3." >&2
  exit 2
fi

FILE_PATH="$(
  python3 -c '
import json
import sys

try:
    payload = json.load(sys.stdin)
    file_path = payload.get("tool_input", {}).get("file_path", "")
except Exception:
    file_path = ""

if file_path:
    print(file_path)
'
)"

if [[ -z "$FILE_PATH" ]]; then
  echo "BLOCKED: unable to determine the file being changed." >&2
  exit 2
fi

# Normalize absolute repository paths.
if [[ "$FILE_PATH" == "$ROOT/"* ]]; then
  FILE_PATH="${FILE_PATH#"$ROOT"/}"
fi

# Keep the Claude runtime scope aligned with the canonical
# engineering-harness/hooks/check-database-change.sh control.
case "$FILE_PATH" in
  */schema/*|*/schemas/*|*/migrations/*|*schema.ts|*schema.sql|*.sqlite|*.db)
    ;;
  *)
    exit 0
    ;;
esac

echo "DATABASE CHANGE DETECTED" >&2
echo "Affected file: $FILE_PATH" >&2
echo "Protected database/schema/migration scope detected." >&2
echo "Explicit migration verification is required." >&2

if [[ "${MIGRATION_VERIFIED:-false}" != "true" ]]; then
  echo "BLOCKED: database/schema change detected without explicit migration verification." >&2
  echo "Required: plan and test the migration, protect historical data, and set MIGRATION_VERIFIED=true for the approved operation." >&2
  exit 2
fi

echo "Database change explicitly approved with migration verification." >&2
exit 0
