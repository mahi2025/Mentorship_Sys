import app from "./App";
import { env } from "./config/env";
import { connectDB } from "./config/database";

const startServer = async () => {
    await connectDB();

    app.listen(env.PORT, () => {
        console.log(`server running on port ${env.PORT}`);
    });
};

startServer();