#!/usr/bin/env bash
set -euo pipefail

FILE="${1:-}"

if [[ -z "$FILE" ]]; then
  echo "Usage: after-typescript-edit.sh <path-to-ts-or-tsx-file>" >&2
  exit 2
fi

case "$FILE" in
  *.ts|*.tsx) ;;
  *)
    echo "Hook skipped: not a TypeScript file: $FILE"
    exit 0
    ;;
esac

if [[ ! -f "$FILE" ]]; then
  echo "Hook skipped: file does not exist: $FILE"
  exit 0
fi

if [[ ! -f package.json ]]; then
  echo "TypeScript hook cannot run: package.json not found." >&2
  exit 1
fi

command -v pnpm >/dev/null 2>&1 || {
  echo "TypeScript hook cannot run: pnpm is required." >&2
  exit 1
}

pnpm exec prettier --write "$FILE"
pnpm exec eslint "$FILE"

echo "TypeScript edit checks passed: $FILE"
