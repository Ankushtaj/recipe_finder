import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

favouriteSchema.index(
    {
        userId: 1,
        recipeId: 1,
    },
    {
        unique: true,
    }
);

favouriteSchema.index({
    userId: 1,
    createdAt: -1,
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;