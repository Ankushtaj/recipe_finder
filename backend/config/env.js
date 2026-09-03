import "dotenv/config";

const requiredEnv = ["MONGO_URI","JWT_SECRET","IMAGEKIT_PRIVATE_KEY"];

for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

export const env = {
    port: Number(process.env.PORT || 3000),
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
    cookieName: process.env.COOKIE_NAME || "qc_access",
    cookieSecure: process.env.COOKIE_SECURE === "true",
    cookieSameSite: process.env.COOKIE_SAME_SITE || "lax",
    nodeEnv: process.env.NODE_ENV || "development",
};
