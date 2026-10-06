import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [, , command, ...args] = process.argv;

if (!command) {
  console.error(
    'Usage: node engineering-harness/core/evidence/record-evidence.mjs <command> [args...]',
  );
  process.exit(2);
}

const evidenceDir = existsSync(join(process.cwd(), 'engineering-harness', 'core', 'evidence'))
  ? join(process.cwd(), 'engineering-harness', 'core', 'evidence')
  : join(process.cwd(), 'core', 'evidence');

mkdirSync(evidenceDir, { recursive: true });

let commit = 'unknown';

try {
  commit = execFileSync('git', ['rev-parse', 'HEAD'], {
    encoding: 'utf8',
  }).trim();
} catch {
  // Git metadata unavailable.
}

const timestamp = new Date().toISOString();

let exitCode = 0;

try {
  execFileSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
} catch (error) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number'
  ) {
    exitCode = error.status;
  } else {
    exitCode = 1;
  }
}

const evidence = {
  timestamp,
  commit,
  command: [command, ...args].join(' '),
  exitCode,
  result: exitCode === 0 ? 'PASS' : 'FAIL',
};

const filename = `${timestamp.replace(/[:.]/g, '-')}.json`;

writeFileSync(
  join(evidenceDir, filename),
  `${JSON.stringify(evidence, null, 2)}\n`,
);

process.exit(exitCode);
