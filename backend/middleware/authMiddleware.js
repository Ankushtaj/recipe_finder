import User from "../models/User.js";
import { env } from "../config/env.js";
import { verifyToken } from "../utils/jwt.js";

function getToken(req) {

    const cookieToken = req.cookies?.[env.cookieName];

    if (cookieToken) {
        return cookieToken;
    }

    const authHeader = req.headers.authorization;

    if (
        authHeader &&
        authHeader.startsWith("Bearer ")
    ) {
        return authHeader.split(" ")[1];
    }

    return null;
}

export async function requireAuth(req, res, next) {

    try {

        const token = getToken(req);

        if (!token) {

            return res.status(401).json({
                message: "Authentication required",
            });

        }

        const decoded = verifyToken(token);

        const user = await User.findById(decoded.userId)
            .select("-passwordHash");

        if (!user) {

            return res.status(401).json({
                message: "User no longer exists",
            });

        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired authentication",
        });

    }

}

export async function optionalAuth(req, res, next) {

    try {

        const token = getToken(req);

        if (!token) {
            return next();
        }

        const decoded = verifyToken(token);

        const user = await User.findById(decoded.userId)
            .select("-passwordHash");

        if (user) {
            req.user = user;
        }

        next();

    } catch {
        next();
    }

}