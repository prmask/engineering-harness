import fs from "node:fs";
import path from "node:path";

const databasePath = path.resolve(process.env.DATABASE_PATH ?? "data/app.db");
const backupDirectory = path.resolve(process.env.BACKUP_DIRECTORY ?? "data/backups");

if (!fs.existsSync(databasePath)) {
  console.error(`Database not found: ${databasePath}`);
  process.exit(1);
}

fs.mkdirSync(backupDirectory, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupPath = path.join(backupDirectory, `backup-${timestamp}.db`);

fs.copyFileSync(databasePath, backupPath);

console.log(`Database backup created: ${backupPath}`);
