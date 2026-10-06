#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

if [[ -d "$ROOT/engineering-harness/hooks" ]]; then
  HOOKS_DIR="$ROOT/engineering-harness/hooks"
else
  HOOKS_DIR="$ROOT/hooks"
fi

"$HOOKS_DIR/check-secrets.sh"
"$HOOKS_DIR/check-database-change.sh"
"$HOOKS_DIR/check-ui-change.sh"
"$HOOKS_DIR/check-missing-tests.sh"

if [[ -f package.json ]]; then
  command -v pnpm >/dev/null 2>&1 || {
    echo "Pre-commit checks require pnpm." >&2
    exit 1
  }
  pnpm typecheck
  pnpm test
else
  echo "Pre-commit notice: package.json not found (standalone harness mode). Skipping npm checks."
fi

echo "Pre-commit checks passed."
