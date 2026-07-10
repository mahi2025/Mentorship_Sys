import { db } from "../config/database";

export async function seedRoles() {
  const roles = [
    {
      name: "admin",
      description: "System administrator",
    },

    {
      name: "mentor",
      description: "provide mentorship services",
    },

    {
      name: "mentee",
      description: "book mentorship services",
    },
  ];

  for (const role of roles) {
    await db
      .insertInto("role")
      .values(role)
      .onConflict((oc) => oc.column("name").doNothing())
      .execute();
  }
}

