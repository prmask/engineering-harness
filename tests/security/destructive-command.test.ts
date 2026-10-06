import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { getBashPath } from './helpers/git-test-repo.js';

const root = process.cwd();
const hook = existsSync(join(root, 'engineering-harness/hooks/guard-destructive-command.sh'))
  ? join(root, 'engineering-harness/hooks/guard-destructive-command.sh')
  : join(root, 'hooks/guard-destructive-command.sh');

type ProcessError = {
  status?: number;
  stdout?: string | Buffer;
  stderr?: string | Buffer;
};

function runGuard(command: string, env?: Partial<NodeJS.ProcessEnv>) {
  try {
    const output = execFileSync(getBashPath(), [hook, command], {
      cwd: root,
      encoding: 'utf8',
      env: (() => {
        const childEnv = {
          ...process.env,
          ...env,
        };

        if (env?.DESTRUCTIVE_COMMAND_APPROVED === undefined) {
          delete childEnv.DESTRUCTIVE_COMMAND_APPROVED;
        }

        return childEnv;
      })(),
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    return {
      code: 0,
      output,
    };
  } catch (error: unknown) {
    const processError = error as ProcessError;

    return {
      code: processError.status ?? 1,
      output: `${processError.stdout ?? ''}${processError.stderr ?? ''}`,
    };
  }
}

describe('destructive command guard', () => {
  test('allows safe non-destructive commands', () => {
    const result = runGuard('npm test');
    expect(result.code).toBe(0);
  });

  test('blocks rm -rf without approval', () => {
    const result = runGuard('rm -rf /tmp/data');
    expect(result.code).not.toBe(0);
    expect(result.output).toContain('BLOCKED: potentially destructive command detected');
  });

  test('blocks DROP TABLE without approval', () => {
    const result = runGuard('psql -c "DROP TABLE users;"');
    expect(result.code).not.toBe(0);
    expect(result.output).toContain('BLOCKED: potentially destructive command detected');
  });

  test('blocks git reset --hard without approval', () => {
    const result = runGuard('git reset --hard HEAD~1');
    expect(result.code).not.toBe(0);
    expect(result.output).toContain('BLOCKED: potentially destructive command detected');
  });

  test('allows destructive command with explicit approval', () => {
    const result = runGuard('rm -rf ./build', {
      DESTRUCTIVE_COMMAND_APPROVED: 'true',
    });
    expect(result.code).toBe(0);
    expect(result.output).toContain('Destructive command explicitly approved.');
  });
});
