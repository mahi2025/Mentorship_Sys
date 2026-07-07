import { promises as fs } from "node:fs";
import path from "node:path";

const migrationName = process.argv[2];

if (!migrationName) {
  console.error("Please provide a migration name.");
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");

const fileName = `${timestamp}_${migrationName}.ts`;

const filePath = path.join(
  process.cwd(),
  "src",
  "database",
  "migrations",
  fileName,
);

const template = `import { Kysely } from "kysely";
import type { DB } from "../types";

export async function up(db: Kysely<DB>): Promise<void> {

}

export async function down(db: Kysely<DB>): Promise<void> {

}
`;

async function createMigration() {
  await fs.writeFile(filePath, template);

  console.log("Migration created:");
  console.log(fileName);
}

createMigration();
