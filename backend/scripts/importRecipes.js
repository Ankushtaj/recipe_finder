import "../config/env.js";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { importAllRecipes } from "../services/ingestionService.js";

async function main() {

    try {
        await connectDB();
    await importAllRecipes();

    } catch (error) {
        console.error(
            "Recipe import failed:",
            error
        );

        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
}

main();