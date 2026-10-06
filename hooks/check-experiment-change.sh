#!/usr/bin/env bash
set -euo pipefail

FILES="$(git diff --cached --name-only --diff-filter=ACMR)"

if [[ -z "$FILES" ]]; then
  echo "Experiment change check: no staged files."
  exit 0
fi

CHANGED=0
while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  case "$file" in
    docs/experiment/*)
      CHANGED=1
      echo "Experiment definition modified: $file"
      ;;
  esac
done <<< "$FILES"

if [[ "$CHANGED" -eq 0 ]]; then
  echo "Experiment change check passed: no experiment specification change detected."
  exit 0
fi

echo "WARNING: Experiment definition modified." >&2
echo "Review with the experiment-integrity workflow and preserve historical definitions." >&2

if [[ "${EXPERIMENT_CHANGE_APPROVED:-false}" != "true" ]]; then
  echo "BLOCKED: explicit experiment-change approval is required." >&2
  echo "Required: assess impact, obtain user authorization, version the amendment, and set EXPERIMENT_CHANGE_APPROVED=true for the approved operation." >&2
  exit 1
fi

echo "Experiment change check passed with explicit approval."
