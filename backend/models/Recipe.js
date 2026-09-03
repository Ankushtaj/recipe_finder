import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        measure: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        _id: false,
    }
);

const recipeSchema = new mongoose.Schema(
    {
        externalId: {
            type: String,
            unique: true,
            sparse: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        image: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            default: "",
            index: true,
        },

        area: {
            type: String,
            default: "",
            index: true,
        },

        tags: {
            type: [String],
            default: [],
            index: true,
        },

        ingredients: {
            type: [ingredientSchema],
            default: [],
        },

        instructions: {
            type: String,
            default: "",
        },

        youtubeUrl: {
            type: String,
            default: "",
        },

        sourceUrl: {
            type: String,
            default: "",
        },

        thumbnail: {
            type: String,
            default: "",
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },

        updatedAt: {
            type: Date,
            default: Date.now,
        },
    }
);

recipeSchema.index(
    {
        title: "text",
        category: "text",
        area: "text",
        tags: "text",
        "ingredients.name": "text",
        instructions: "text",
    },
    {
        weights: {
            title: 10,
            category: 7,
            area: 6,
            tags: 4,
            "ingredients.name": 3,
            instructions: 1,
        },

        name: "recipe_text_search",
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;