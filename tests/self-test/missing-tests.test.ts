import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { createGitTestRepo, getBashPath } from './helpers/git-test-repo.js';

const root = process.cwd();
const hook = existsSync(join(root, 'engineering-harness/hooks/check-missing-tests.sh'))
  ? join(root, 'engineering-harness/hooks/check-missing-tests.sh')
  : join(root, 'hooks/check-missing-tests.sh');

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

        if (env?.MISSING_TEST_APPROVED === undefined) {
          delete childEnv.MISSING_TEST_APPROVED;
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
    const processError = error as {
      status?: number;
      stdout?: string | Buffer;
      stderr?: string | Buffer;
    };

    return {
      code: processError.status ?? 1,
      output: `${processError.stdout ?? ''}${processError.stderr ?? ''}`,
    };
  }
}

describe('missing-test enforcement hook', () => {
  test('passes when no implementation change is staged', () => {
    const testRepo = createGitTestRepo();

    try {
      writeFileSync(
        join(testRepo.path, 'README.md'),
        'documentation change\n',
      );

      testRepo.git('add', 'README.md');

      const result = runHook(testRepo.path);

      expect(result.code).toBe(0);
      expect(result.output).toContain(
        'Missing-test check passed: no implementation change detected.',
      );
    } finally {
      testRepo.cleanup();
    }
  });

  test('blocks a staged implementation change without a test change', () => {
    const testRepo = createGitTestRepo();

    try {
      const srcDir = join(testRepo.path, 'src');
      mkdirSync(srcDir, { recursive: true });

      writeFileSync(
        join(srcDir, 'example.ts'),
        'export const value = 1;\n',
      );

      testRepo.git('add', 'src/example.ts');

      const result = runHook(testRepo.path);

      expect(result.code).not.toBe(0);
      expect(result.output).toContain(
        'BLOCKED: implementation change detected without a staged test change.',
      );
    } finally {
      testRepo.cleanup();
    }
  });

  test('allows a staged implementation change accompanied by a test change', () => {
    const testRepo = createGitTestRepo();

    try {
      const srcDir = join(testRepo.path, 'src');
      const testsDir = join(testRepo.path, 'tests');

      mkdirSync(srcDir, { recursive: true });
      mkdirSync(testsDir, { recursive: true });

      writeFileSync(
        join(srcDir, 'example.ts'),
        'export const value = 1;\n',
      );

      writeFileSync(
        join(testsDir, 'example.test.ts'),
        "test('example', () => {});\n",
      );

      testRepo.git('add', 'src/example.ts', 'tests/example.test.ts');

      const result = runHook(testRepo.path);

      expect(result.code).toBe(0);
      expect(result.output).toContain(
        'Missing-test check passed: implementation change accompanied by test change.',
      );
    } finally {
      testRepo.cleanup();
    }
  });

  test('allows an implementation change with explicit approval', () => {
    const testRepo = createGitTestRepo();

    try {
      const srcDir = join(testRepo.path, 'src');
      mkdirSync(srcDir, { recursive: true });

      writeFileSync(
        join(srcDir, 'example.ts'),
        'export const value = 1;\n',
      );

      testRepo.git('add', 'src/example.ts');

      const result = runHook(testRepo.path, {
        MISSING_TEST_APPROVED: 'true',
      });

      expect(result.code).toBe(0);
      expect(result.output).toContain(
        'Missing-test check passed with explicit approval.',
      );
    } finally {
      testRepo.cleanup();
    }
  });
});
