import express from "express";
import { listRecipes, getRecipeById, homeRecommendations, recipeRecommendations } from "../controllers/recipeController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    listRecipes
);

router.get(
    "/recommendations/home",
    requireAuth,
    homeRecommendations
);

router.get(
    "/recommendations/:id",
    recipeRecommendations
);

router.get(
    "/:id",
    getRecipeById
);

export default router;