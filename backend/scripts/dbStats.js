import "../config/env.js";

import mongoose from "mongoose";

import { connectDB } from "../config/db.js";

async function main() {

    try {

        await connectDB();

        const stats =
            await mongoose.connection.db.stats();

        const dataMB =
            stats.dataSize / 1024 / 1024;

        const storageMB =
            stats.storageSize / 1024 / 1024;

        const indexMB =
            stats.indexSize / 1024 / 1024;

        const totalMB =
            (stats.dataSize + stats.indexSize)
            / 1024 / 1024;

        console.log("\nQuickCuisine Database Stats\n");

        console.log(
            `Documents: ${stats.objects}`
        );

        console.log(
            `Data size: ${dataMB.toFixed(2)} MB`
        );

        console.log(
            `Storage size: ${storageMB.toFixed(2)} MB`
        );

        console.log(
            `Index size: ${indexMB.toFixed(2)} MB`
        );

        console.log(
            `Data + indexes: ${totalMB.toFixed(2)} MB`
        );

        console.log(
            `Remaining from 512 MB: ${(512 - totalMB).toFixed(2)} MB`
        );

    }

    catch (error) {

        console.error(
            "Failed to read database stats:",
            error
        );

    }

    finally {

        await mongoose.connection.close();

    }

}

main();