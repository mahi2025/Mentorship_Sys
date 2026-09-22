import { seedRoles } from "./roles";
import { seedAdmin } from "./admin";
import { db } from "../config/database";

async function seed() {
  await seedRoles();
  await seedAdmin();

  console.log("Database seeded successfully");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.destroy());
