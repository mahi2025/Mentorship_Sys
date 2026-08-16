import { promises as fs } from "node:fs";
import path from "node:path";

import { Migrator, FileMigrationProvider } from "kysely";

import { db } from "../config/database";

async function rollback() {
  const migrator = new Migrator({
    db,

    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(process.cwd(), 
      "src",
      "database",
       "migrations"),
    }),
  });

  const { error, results } = await migrator.migrateDown();

  results?.forEach((result) => {
    console.log(result);
  });

  if (error) {
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

rollback();
