import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";
import searchHistoryRoutes from "./routes/searchHistoryRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.set("trust proxy", 1);

app.use(helmet());

app.use(
    cors({
        origin: env.clientUrl,
        credentials: true,
    })
);

app.use(
    express.json({
        limit: "1mb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "1mb",
    })
);

app.use(cookieParser());

app.use(morgan("dev"));

app.use(
    "/api",
    rateLimit({

        windowMs:
            15 * 60 * 1000,

        limit: 300,

        standardHeaders: true,

        legacyHeaders: false,

    })
);

const authLimiter =
    rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 20,
        standardHeaders: true,
        legacyHeaders: false,
    });

app.get(
    "/api/health",
    (req, res) => {
        res.json({
            status: "ok",
            service: "QuickCuisine API",
        });
    }
);

app.use(
    "/api/auth",
    authLimiter,
    authRoutes
);

app.use(
    "/api/recipes",
    recipeRoutes
);

app.use(
    "/api/posts",
    postRoutes
);

app.use(
    "/api/favourites",
    favouriteRoutes
);

app.use(
    "/api/search-history",
    searchHistoryRoutes
);

app.use(
    notFound
);

app.use(
    errorHandler
);

export default app;
