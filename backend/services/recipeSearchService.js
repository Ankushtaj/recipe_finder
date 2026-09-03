import Fuse from "fuse.js";
import Recipe from "../models/Recipe.js";
import Favourite from "../models/Favourite.js";
import SearchHistory from "../models/SearchHistory.js";

let fuseCache = null;

async function buildFuse() {
    const recipes = await Recipe.find({})
        .select("title category area tags ingredients image")
        .lean();

    fuseCache = new Fuse(recipes, {
        keys: [
            {
                name: "title",
                weight: 0.45,
            },
            {
                name: "category",
                weight: 0.20,
            },
            {
                name: "area",
                weight: 0.20,
            },
            {
                name: "tags",
                weight: 0.10,
            },
            {
                name: "ingredients.name",
                weight: 0.05,
            },
        ],
        threshold: 0.45,
        ignoreLocation: true,
        minMatchCharLength: 2,
    });

    return fuseCache;
}

export async function invalidateSearchCache() {
    fuseCache = null;
}

export async function searchRecipes({
    q = "",
    category,
    area,
    ingredient,
    tag,
    page = 1,
    limit = 20,
    fuzzy = false,
}) {
    const skip = (page - 1) * limit;
    const filters = {};

    if (category) {
        filters.category = new RegExp(
            `^${escapeRegex(category)}$`,
            "i"
        );
    }

    if (area) {
        filters.area = new RegExp(
            `^${escapeRegex(area)}$`,
            "i"
        );
    }

    if (ingredient) {
        filters["ingredients.name"] = new RegExp(
            escapeRegex(ingredient),
            "i"
        );
    }

    if (tag) {
        filters.tags = new RegExp(
            escapeRegex(tag),
            "i"
        );
    }

    if (!q.trim()) {
        const [recipes, total] = await Promise.all([
            Recipe.find(filters)
                .sort({
                    createdAt: -1,
                })
                .skip(skip)
                .limit(limit)
                .lean(),

            Recipe.countDocuments(filters),
        ]);

        return {
            recipes,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    if (fuzzy) {
        const fuse = fuseCache || await buildFuse();

        const results = fuse.search(q, {
            limit: Math.max(100, limit),
        });

        const ids = results
            .map(result => result.item._id)
            .slice(skip, skip + limit);

        const recipes = await Recipe.find({
            ...filters,
            _id: {
                $in: ids,
            },
        }).lean();

        const order = new Map(
            ids.map((id, index) => [
                id.toString(),
                index,
            ])
        );

        recipes.sort(
            (a, b) =>
                order.get(a._id.toString()) -
                order.get(b._id.toString())
        );

        return {
            recipes,
            total: results.length,
            page,
            limit,
            totalPages: Math.ceil(
                results.length / limit
            ),
        };
    }

    const textResults = await Recipe.find(
        {
            ...filters,
            $text: {
                $search: q,
            },
        },
        {
            score: {
                $meta: "textScore",
            },
        }
    )
        .sort({
            score: {
                $meta: "textScore",
            },
        })
        .skip(skip)
        .limit(limit)
        .lean();

    const textTotal = await Recipe.countDocuments({
        ...filters,
        $text: {
            $search: q,
        },
    });

    if (textTotal > 0) {
        return {
            recipes: textResults,
            total: textTotal,
            page,
            limit,
            totalPages: Math.ceil(
                textTotal / limit
            ),
        };
    }

    const regex = new RegExp(
        escapeRegex(q),
        "i"
    );

    const partialFilter = {
        ...filters,
        $or: [
            {
                title: regex,
            },
            {
                category: regex,
            },
            {
                area: regex,
            },
            {
                tags: regex,
            },
            {
                "ingredients.name": regex,
            },
        ],
    };

    const [recipes, total] = await Promise.all([
        Recipe.find(partialFilter)
            .skip(skip)
            .limit(limit)
            .lean(),

        Recipe.countDocuments(
            partialFilter
        ),
    ]);

    return {
        recipes,
        total,
        page,
        limit,
        totalPages: Math.ceil(
            total / limit
        ),
    };
}

export async function getHomeRecommendations(userId, limit = 12) {
    const favourites = await Favourite.find({
        userId,
    })
        .populate(
            "recipeId",
            "title"
        )
        .sort({
            createdAt: -1,
        })
        .limit(10)
        .lean();

    let titles = [];

    if (favourites.length > 0) {
        titles = favourites
            .map(
                item =>
                    item.recipeId?.title?.trim()
            )
            .filter(Boolean);
    }
    else {
        const history =
            await SearchHistory.find({
                userId,
            })
                .sort({
                    createdAt: -1,
                })
                .limit(10)
                .lean();

        titles = history
            .map(
                item =>
                    item.query?.trim()
            )
            .filter(Boolean);
    }

    if (titles.length === 0) {
        return await Recipe.aggregate([
            {
                $sample: {
                    size: limit,
                },
            },
        ]);
    }

    const favouriteIds = favourites
        .map(
            item =>
                item.recipeId?._id
        )
        .filter(Boolean);

    const recommendationMap = new Map();

    for (const title of titles) {
        const result = await searchRecipes({
            q: title,
            page: 1,
            limit: 20,
            fuzzy: true,
        });

        for (const recipe of result.recipes) {
            const alreadyFavourite =
                favouriteIds.some(
                    favId =>
                        favId.toString() ===
                        recipe._id.toString()
                );

            if (alreadyFavourite) {
                continue;
            }

            recommendationMap.set(
                recipe._id.toString(),
                recipe
            );

            if (
                recommendationMap.size >=
                limit
            ) {
                break;
            }
        }

        if (
            recommendationMap.size >=
            limit
        ) {
            break;
        }
    }

    if (
        recommendationMap.size <
        limit
    ) {
        const remaining =
            limit -
            recommendationMap.size;

        const excludedIds = [
            ...favouriteIds,
            ...recommendationMap.keys(),
        ];

        const fallbackRecipes =
            await Recipe.aggregate([
                {
                    $match: {
                        _id: {
                            $nin: excludedIds,
                        },
                    },
                },
                {
                    $sample: {
                        size: remaining,
                    },
                },
            ]);

        for (
            const recipe
            of fallbackRecipes
        ) {
            recommendationMap.set(
                recipe._id.toString(),
                recipe
            );
        }
    }

    return [
        ...recommendationMap.values()
    ].slice(
        0,
        limit
    );
}

export async function getRecipeRecommendations(
    recipeId,
    limit = 6
) {
    const currentRecipe = await Recipe.findById(
        recipeId
    )
        .select(
            "title"
        )
        .lean();

    if (!currentRecipe) {
        return [];
    }

    if (!currentRecipe.title?.trim()) {
        return [];
    }

    const recommendationMap = new Map();

    const queries = [
        currentRecipe.title.trim()
    ];

    const titleWords = [
        ...new Set(
            currentRecipe.title
                .toLowerCase()
                .split(/\s+/)
                .map(word =>
                    word.replace(
                        /[^a-z0-9]/g,
                        ""
                    )
                )
                .filter(
                    word =>
                        word.length >= 3
                )
        ),
    ];

    queries.push(...titleWords);

    for (const query of queries) {
        if (
            recommendationMap.size >=
            limit
        ) {
            break;
        }

        const result = await searchRecipes({
            q: query,
            page: 1,
            limit: 100,
            fuzzy: true,
        });

        for (const recipe of result.recipes) {
            if (
                recipe._id.toString() ===
                recipeId.toString()
            ) {
                continue;
            }

            recommendationMap.set(
                recipe._id.toString(),
                recipe
            );

            if (
                recommendationMap.size >=
                limit
            ) {
                break;
            }
        }
    }

    if (
        recommendationMap.size <
        limit
    ) {
        const remaining =
            limit -
            recommendationMap.size;

        const excludedIds = [
            recipeId,
            ...recommendationMap.keys(),
        ];

        const fallbackRecipes =
            await Recipe.aggregate([
                {
                    $match: {
                        _id: {
                            $nin: excludedIds,
                        },
                    },
                },
                {
                    $sample: {
                        size: remaining,
                    },
                },
            ]);

        for (
            const recipe
            of fallbackRecipes
        ) {
            recommendationMap.set(
                recipe._id.toString(),
                recipe
            );
        }
    }

    return [
        ...recommendationMap.values()
    ].slice(
        0,
        limit
    );
}

function escapeRegex(value) {
    return value.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );
}