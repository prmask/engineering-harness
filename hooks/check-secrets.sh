#!/usr/bin/env bash
set -euo pipefail

# Scans staged files by default. Use --all to scan the working tree.
MODE="${1:-staged}"

if [[ "$MODE" == "all" ]]; then
  FILES=$(git ls-files -co --exclude-standard)
else
  FILES=$(git diff --cached --name-only --diff-filter=ACMR)
fi

if [[ -z "$FILES" ]]; then
  echo "Secret scan: nothing to scan."
  exit 0
fi

# Sensitive filenames that should never be committed.
BAD_FILE_PATTERN='(^|/)(\.env|\.env\..*|.*\.pem|.*\.key|credentials\.json|service-account\.json)$'

bad_files=0
while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  if [[ "$file" =~ $BAD_FILE_PATTERN ]]; then
    echo "BLOCKED: sensitive file detected: $file" >&2
    bad_files=1
  fi
done <<< "$FILES"

# Scan staged content for common credential patterns. These are intentionally conservative
# and may require a human review for false positives.
CONTENT="$(git diff --cached --binary --no-ext-diff 2>/dev/null || true)"

patterns=(
  'AKIA[0-9A-Z]{16}'
  'AIza[0-9A-Za-z_-]{30,}'
  '-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----'
  "(api[_-]?key|access[_-]?token|secret[_-]?key|client[_-]?secret)[[:space:]]*[:=][[:space:]]*(\"[A-Za-z0-9_./+=-]{16,}\"|'[A-Za-z0-9_./+=-]{16,}')"
  'gh[pousr]_[A-Za-z0-9_]{20,}'
)

for pattern in "${patterns[@]}"; do
  if grep -Eiq -- "$pattern" <<< "$CONTENT"; then
    echo "BLOCKED: possible secret detected matching pattern: $pattern" >&2
    bad_files=1
  fi
done

if [[ "$bad_files" -ne 0 ]]; then
  echo "Secret scan failed. Remove the secret/sensitive file and rotate any credential that may have been exposed." >&2
  exit 1
fi

echo "Secret scan passed."
