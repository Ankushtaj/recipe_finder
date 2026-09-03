import express from "express";
import { getFavourites, addFavourite, removeFavourite } from "../controllers/favouriteController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    requireAuth,
    getFavourites
);

router.post(
    "/:recipeId",
    requireAuth,
    addFavourite
);

router.delete(
    "/:recipeId",
    requireAuth,
    removeFavourite
);

export default router;