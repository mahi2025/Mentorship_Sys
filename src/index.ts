import "./docs/zod-openapi";
import { env } from "./config/env";
import { connectDB } from "./config/database";
import redisClient from "./config/redis";

const start = async () => {
  await connectDB();

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  const { createApp } = await import("./App.js");
  const app = createApp();

  app.listen(env.PORT, "0.0.0.0", () => {
    console.log(`running on port ${env.PORT}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});