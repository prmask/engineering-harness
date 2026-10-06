#!/usr/bin/env bash
set -euo pipefail

# Require a staged test/spec change whenever staged application implementation
# code changes. Explicit approval is required for technically impractical cases.

FILES="$(git diff --cached --name-only --diff-filter=ACMR)"

if [[ -z "$FILES" ]]; then
  echo "Missing-test check: no staged files."
  exit 0
fi

IMPLEMENTATION_CHANGED=0
TEST_CHANGED=0

while IFS= read -r file; do
  [[ -z "$file" ]] && continue

  case "$file" in
    *.test.ts|*.test.tsx|*.test.js|*.test.jsx|*.test.mjs|*.test.cjs|\
    *.spec.ts|*.spec.tsx|*.spec.js|*.spec.jsx|*.spec.mjs|*.spec.cjs|\
    tests/*|__tests__/*)
      TEST_CHANGED=1
      ;;
    *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs)
      IMPLEMENTATION_CHANGED=1
      ;;
  esac
done <<< "$FILES"

if [[ "$IMPLEMENTATION_CHANGED" -eq 0 ]]; then
  echo "Missing-test check passed: no implementation change detected."
  exit 0
fi

if [[ "$TEST_CHANGED" -eq 1 ]]; then
  echo "Missing-test check passed: implementation change accompanied by test change."
  exit 0
fi

if [[ "${MISSING_TEST_APPROVED:-false}" == "true" ]]; then
  echo "Missing-test check passed with explicit approval."
  exit 0
fi

echo "BLOCKED: implementation change detected without a staged test change." >&2
echo "Required: add or update an appropriate test, or set MISSING_TEST_APPROVED=true for a documented technically impractical case." >&2
exit 1
