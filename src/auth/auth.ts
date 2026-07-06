import { betterAuth } from "better-auth";
import { pool } from "../config/db_pool";
import { PostgresDialect } from 'kysely';

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URl,
  database: {
    dialect: new PostgresDialect({ pool }),
    type: "postgres",
    schema: "auth",
  },
  trustedOrigins: ["http://localhost:5000"],

  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
