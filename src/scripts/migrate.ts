import { promises as fs } from "node:fs";
import path from "node:path";

import { Migrator, FileMigrationProvider } from "kysely";
import { db } from "../config/kysely";

async function migrate() {
  const migrator = new Migrator({
    db,

    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(
        process.cwd(),
        "src",
        "database",
        "migrations",
      ),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((result) => {
    if (result.status === "Success") {
      console.log(` ${result.migrationName}`);
    }
  });

  if (error) {
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrate();
