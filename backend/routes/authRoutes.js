import express from "express";
import { z } from "zod";
import { register, login, logout, getMe } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";

const router = express.Router();

const authSchema = z.object({
    body: z.object({
        name: z.string()
            .min(2)
            .max(50)
            .optional(),

        email: z.string()
            .email(),

        password: z.string()
            .min(8)
            .max(100),
    }),
    params: z.object({}),
    query: z.object({}),
});

router.post(
    "/register",
    validate(authSchema),
    register
);

router.post(
    "/login",
    validate(authSchema),
    login
);

router.post(
    "/logout",
    logout
);

router.get(
    "/me",
    requireAuth,
    getMe
);

export default router;