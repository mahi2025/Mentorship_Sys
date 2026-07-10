import { env} from "./config/env";
import { connectDB } from "./config/database";
import redisClient from "./config/redis";

const start = async () => {
  
  await connectDB();
  
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

  const { default: app } = await import("./App.js");

  app.listen(env.PORT, () => {
    console.log(`running on port ${env.PORT}`);
  });
};

start();
