import app from "./app";
import { env} from "./config/env";
import { connectDB } from "./config/database";


const start = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`running on port ${env.PORT}`);
  });
};

start();
