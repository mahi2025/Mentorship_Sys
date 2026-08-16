import { seedRoles } from "./roles";
import { seedAdmin } from "./admin";

async function seed() {
  await seedRoles();
  await seedAdmin();

  console.log("Database seeded successfully");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
