import { pool } from "../config/database";
import { PostgresDialect } from "kysely";
import { betterAuth } from "better-auth";
import { ProfilesService } from "../modules/profiles/profile.service";
import { openAPI } from "better-auth/plugins";

const profilesService = new ProfilesService();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: {
    dialect: new PostgresDialect({ pool }),
    type: "postgres",
    schema: "public",
  },
  trustedOrigins: ["http://localhost:5000"],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          console.log("New user created:", user.id);

          await profilesService.createDefaultProfile(user.id);
        },
      },
    },
  },
  plugins: [openAPI()],
});
