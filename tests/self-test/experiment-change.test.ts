import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { createGitTestRepo, getBashPath } from './helpers/git-test-repo.js';

const root = process.cwd();
const hook = existsSync(join(root, 'engineering-harness/hooks/check-experiment-change.sh'))
  ? join(root, 'engineering-harness/hooks/check-experiment-change.sh')
  : join(root, 'hooks/check-experiment-change.sh');

type ProcessError = {
  status?: number;
  stdout?: string | Buffer;
  stderr?: string | Buffer;
};

function runHook(repo: string, env?: Partial<NodeJS.ProcessEnv>) {
  try {
    const output = execFileSync(getBashPath(), [hook], {
      cwd: repo,
      encoding: 'utf8',
      env: (() => {
        const childEnv = {
          ...process.env,
          ...env,
        };

        if (env?.EXPERIMENT_CHANGE_APPROVED === undefined) {
          delete childEnv.EXPERIMENT_CHANGE_APPROVED;
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

describe('experiment change hook', () => {
  test('passes when no experiment-related file is staged', () => {
    const testRepo = createGitTestRepo();

    try {
      writeFileSync(
        join(testRepo.path, 'normal.txt'),
        'ordinary project text\n',
      );

      testRepo.git('add', 'normal.txt');

      const result = runHook(testRepo.path, {
        EXPERIMENT_CHANGE_APPROVED: undefined,
      });

      expect(result.code).toBe(0);
      expect(result.output).toContain(
        'Experiment change check passed: no experiment specification change detected.',
      );
    } finally {
      testRepo.cleanup();
    }
  });

  test('blocks staged changes under docs/experiment/ without approval', () => {
    const testRepo = createGitTestRepo();

    try {
      const expDir = join(testRepo.path, 'docs', 'experiment');
      mkdirSync(expDir, { recursive: true });

      writeFileSync(
        join(expDir, 'protocol.md'),
        '# Experiment Protocol\n',
      );

      testRepo.git('add', 'docs/experiment/protocol.md');

      const result = runHook(testRepo.path, {
        EXPERIMENT_CHANGE_APPROVED: undefined,
      });

      expect(result.code).not.toBe(0);
      expect(result.output).toContain('BLOCKED: explicit experiment-change approval is required.');
    } finally {
      testRepo.cleanup();
    }
  });

  test('allows staged experiment changes when approved', () => {
    const testRepo = createGitTestRepo();

    try {
      const expDir = join(testRepo.path, 'docs', 'experiment');
      mkdirSync(expDir, { recursive: true });

      writeFileSync(
        join(expDir, 'protocol.md'),
        '# Experiment Protocol v2\n',
      );

      testRepo.git('add', 'docs/experiment/protocol.md');

      const result = runHook(testRepo.path, {
        EXPERIMENT_CHANGE_APPROVED: 'true',
      });

      expect(result.code).toBe(0);
      expect(result.output).toContain(
        'Experiment change check passed with explicit approval.',
      );
    } finally {
      testRepo.cleanup();
    }
  });
});
