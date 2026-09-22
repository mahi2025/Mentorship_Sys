import { createClient } from "redis";
import { env } from "./env";

function getRedisUrl(): string {
  const url = new URL(env.REDIS_URL);

  if (url.protocol === "redis:" || url.protocol === "rediss:") {
    return url.toString();
  }

  if (url.protocol === "https:" && env.REDIS_TOKEN) {
    url.protocol = "rediss:";
    url.port = "6379";
    url.username = "default";
    url.password = env.REDIS_TOKEN;
    url.pathname = "";
    url.search = "";
    url.hash = "";

    return url.toString();
  }

  throw new Error(
    "REDIS_URL must use redis:// or rediss://, or an Upstash https:// URL with REDIS_TOKEN",
  );
}

const redisClient = createClient({
  url: getRedisUrl(),
});

redisClient.on("connect", () => {
    console.log("Redis connected");
});

redisClient.on("error", (err: Error) => {
  console.error("Redis error:", err);
});

export default redisClient;