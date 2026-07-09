import { pool } from "../config/database";
import { PostgresDialect } from "kysely";
import { betterAuth } from "better-auth";

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
});
