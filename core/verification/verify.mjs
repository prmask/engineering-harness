import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const defaultTarget = existsSync(join(process.cwd(), 'tests', 'harness'))
  ? 'tests/harness/'
  : 'tests/';

const commandToRun = args.length > 0
  ? args
  : ['pnpm', 'vitest', 'run', defaultTarget];

const evidenceScript = existsSync(join(process.cwd(), 'engineering-harness', 'core', 'evidence', 'record-evidence.mjs'))
  ? 'engineering-harness/core/evidence/record-evidence.mjs'
  : 'core/evidence/record-evidence.mjs';

const result = spawnSync(
  process.execPath,
  [evidenceScript, ...commandToRun],
  {
    stdio: 'inherit',
    shell: false,
  },
);

const exitCode =
  typeof result.status === 'number'
    ? result.status
    : 1;

if (exitCode === 0) {
  console.log('\nINDEPENDENT VERIFICATION: PASS');
} else {
  console.error(`\nINDEPENDENT VERIFICATION: FAIL (exit ${exitCode})`);
}

process.exit(exitCode);
