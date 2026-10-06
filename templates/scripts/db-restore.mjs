import fs from "node:fs";
import path from "node:path";

const databasePath = path.resolve(process.env.DATABASE_PATH ?? "data/app.db");
const backupPath = process.argv[2] ? path.resolve(process.argv[2]) : null;

if (!backupPath) {
  console.error("Usage: node db-restore.mjs <backup-file>");
  process.exit(1);
}

if (!fs.existsSync(backupPath)) {
  console.error(`Backup not found: ${backupPath}`);
  process.exit(1);
}

fs.copyFileSync(backupPath, databasePath);

console.log(`Database restored from: ${backupPath}`);
