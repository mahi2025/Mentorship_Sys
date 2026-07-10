import { pool } from "../config/database";
import { PostgresDialect } from "kysely";
import { betterAuth } from "better-auth";
import logger from "../config/logger";
import { ProfilesService } from "../modules/profiles/profiles.service";


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
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
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

  logger: {
    level: "info",
    log: (level, message, ...args) => {
      logger.log(level, message, { source: "better-auth", ...args });
    },
  },

});
