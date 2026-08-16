import { createClient } from "redis";  
import { env } from "./env";

const redisClient = createClient({  
    url: env.REDIS_URL  
});  
  
redisClient.on("connect", () => {  
    console.log("Redis connected");  
});  
  
redisClient.on("error", (err: Error) => {
  console.error("Redis error:", err);
});
  
export default redisClient; 