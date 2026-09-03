import Favourite from "../models/Favourite.js";
import Recipe from "../models/Recipe.js";

export async function getFavourites(req, res) {

    const favourites =
        await Favourite.find({
            userId: req.user._id,
        })
            .populate("recipeId")
            .sort({
                createdAt: -1,
            })
            .lean();

    res.json({
        recipes: favourites.map(item => item.recipeId).filter(Boolean),
    });

}

export async function addFavourite(req, res) {

    const recipe =
        await Recipe.findById(
            req.params.recipeId
        );

    if (!recipe) {
        return res.status(404).json({
            message: "Recipe not found",
        });
    }

    await Favourite.updateOne(
        {
            userId: req.user._id,
            recipeId: recipe._id,
        },

        {
            $setOnInsert: {
                userId: req.user._id,
                recipeId: recipe._id,
            },
        },

        {
            upsert: true,
        }

    );

    res.status(201).json({
        message: "Added to favourites",
    });

}

export async function removeFavourite(req, res) {
    await Favourite.deleteOne({
        userId: req.user._id,
        recipeId: req.params.recipeId,
    });

    res.json({
        message: "Removed from favourites",
    });
}