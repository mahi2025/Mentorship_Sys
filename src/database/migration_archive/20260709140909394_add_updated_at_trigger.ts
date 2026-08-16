import { Kysely, sql  } from "kysely";
import type { DB } from "../schema";

export async function up(db: Kysely<DB>): Promise<void> {
     await sql`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `.execute(db);

     await sql`
    CREATE TRIGGER update_profile_updated_at
    BEFORE UPDATE ON profile
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `.execute(db);
}

export async function down(db: Kysely<DB>): Promise<void> {
    await sql`
    DROP TRIGGER IF EXISTS update_profile_updated_at
    ON profile;
  `.execute(db);

    await sql`
    DROP FUNCTION IF EXISTS update_updated_at_column;
  `.execute(db);
}
