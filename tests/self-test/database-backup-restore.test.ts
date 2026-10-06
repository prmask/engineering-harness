import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const root = process.cwd();
const backupScript = join(root, 'scripts/db-backup.mjs');
const restoreScript = join(root, 'scripts/db-restore.mjs');

describe('database backup and restore', () => {
  test('creates a backup and restores the backup state', () => {
    const directory = mkdtempSync(join(tmpdir(), 'experiment-backup-'));
    const databasePath = join(directory, 'experiment.db');
    const backupDirectory = join(directory, 'backups');

    try {
      const initialContent = 'SQLite format 3\0test-record-protected-history';
      writeFileSync(databasePath, initialContent, 'utf8');

      execFileSync('node', [backupScript], {
        cwd: root,
        env: {
          ...process.env,
          DATABASE_PATH: databasePath,
          BACKUP_DIRECTORY: backupDirectory,
        },
        stdio: 'pipe',
      });

      const backupFiles = readdirSync(backupDirectory);
      expect(backupFiles.length).toBe(1);

      const backupFile = backupFiles[0];
      const createdBackupPath = join(backupDirectory, backupFile);
      expect(readFileSync(createdBackupPath, 'utf8')).toBe(initialContent);

      writeFileSync(databasePath, 'SQLite format 3\0changed-after-backup', 'utf8');

      execFileSync('node', [restoreScript, createdBackupPath], {
        cwd: root,
        env: {
          ...process.env,
          DATABASE_PATH: databasePath,
        },
        stdio: 'pipe',
      });

      expect(readFileSync(databasePath, 'utf8')).toBe(initialContent);
    } finally {
      try {
        rmSync(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      } catch {
        // Ignored on Windows temporary file lock
      }
    }
  });
});
