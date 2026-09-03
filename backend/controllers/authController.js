import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createToken } from "../utils/jwt.js";
import { env } from "../config/env.js";

function setAuthCookie(res, token) {
    res.cookie(
        env.cookieName,
        token,
        {
            httpOnly: true,
            secure: env.cookieSecure,
            sameSite: env.cookieSameSite,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        }
    );
}

export async function register(req, res) {

    const { name, email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
        email: normalizedEmail,
    });

    if (existingUser) {
        return res.status(409).json({
            message: "Email is already registered",
        });
    }

    const passwordHash = await bcrypt.hash(
        password,
        12
    );

    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
    });

    const token = createToken(user._id.toString());

    setAuthCookie(res, token);

    res.status(201).json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });

}

export async function login(req, res) {

    const { email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
        email: normalizedEmail,
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    const validPassword =
        await bcrypt.compare(
            password,
            user.passwordHash
        );

    if (!validPassword) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    const token = createToken(user._id.toString());

    setAuthCookie(res, token);

    res.json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
}

export async function logout(req, res) {

    res.clearCookie(
        env.cookieName,
        {
            httpOnly: true,
            secure: env.cookieSecure,
            sameSite: env.cookieSameSite,
            path: "/",
        }
    );

    res.json({
        message: "Logged out successfully",
    });

}

export async function getMe(req, res) {
    res.json({
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        },
    });
}