import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const PORT = process.env.PORT || env.port || 3000;

async function startServer() {

    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(
            `QuickCuisine backend running on port ${PORT}`
        );
    });

}

startServer();