import Recipe from "../models/Recipe.js";
import { searchRecipes, getHomeRecommendations, getRecipeRecommendations } from "../services/recipeSearchService.js";

export async function listRecipes(req, res) {
    const {
        q = "",
        category,
        area,
        ingredient,
        tag,
        page = "1",
        limit = "20",
        fuzzy = "true",
    } = req.query;

    const result =
        await searchRecipes({
            q,
            category,
            area,
            ingredient,
            tag,
            page: Math.max(
                1,
                Number(page)
            ),
            limit: Math.min(
                793,
                Math.max(
                    1,
                    Number(limit)
                )
            ),
            fuzzy: fuzzy === "true",
        });

    res.json(result);
}

export async function getRecipeById(req, res) {
    const recipe =
        await Recipe.findById(
            req.params.id
        ).lean();

    if (!recipe) {
        return res.status(404).json({
            message:
                "Recipe not found",
        });
    }

    res.json({
        recipe,
    });
}

export async function homeRecommendations(req, res) {
    const recipes =
        await getHomeRecommendations(
            req.user._id,
            12
        );

    res.json({
        recipes,
    });
}

export async function recipeRecommendations(req, res) {
    const recipes =
        await getRecipeRecommendations(
            req.params.id,
            6
        );

    res.json({
        recipes,
    });
}