import Recipe from "../models/Recipe.js";

import { normalizeMeal } from "../utils/normalizeMeal.js";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

function sleep(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}

async function fetchJson(url) {

    const response =
        await fetch(url);

    if (!response.ok) {

        throw new Error(
            `TheMealDB HTTP ${response.status}`
        );

    }

    return response.json();

}

async function getCategories() {

    const data =
        await fetchJson(
            `${BASE_URL}/list.php?c=list`
        );

    return (
        data.meals || []
    ).map(
        item => item.strCategory
    );

}

async function getMealsForCategory(
    category
) {

    const data =
        await fetchJson(

            `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`

        );

    return data.meals || [];

}

async function getMealDetails(id) {

    const data =
        await fetchJson(
            `${BASE_URL}/lookup.php?i=${id}`
        );

    return data.meals?.[0] || null;

}

export async function importAllRecipes() {

    console.log(
        "Starting TheMealDB ingestion..."
    );

    const categories =
        await getCategories();

    console.log(
        `Categories found: ${categories.length}`
    );

    const recipeIds =
        new Set();

    for (
        const category of categories
    ) {

        console.log(
            `Collecting: ${category}`
        );

        try {

            const meals =
                await getMealsForCategory(
                    category
                );

            for (
                const meal of meals
            ) {

                recipeIds.add(
                    meal.idMeal
                );

            }

            /*
                Don't hammer the public API.
            */
            await sleep(200);

        } catch (error) {

            console.error(
                `Category failed: ${category}`,
                error.message
            );

        }

    }

    console.log(
        `Unique recipes found: ${recipeIds.size}`
    );

    const ids =
        [...recipeIds];

    const BATCH_SIZE = 10;

    let imported = 0;

    for (
        let i = 0;
        i < ids.length;
        i += BATCH_SIZE
    ) {

        const batch =
            ids.slice(
                i,
                i + BATCH_SIZE
            );

        const meals =
            await Promise.all(

                batch.map(
                    id =>
                        getMealDetails(id)
                            .catch(
                                error => {

                                    console.error(
                                        `Failed recipe ${id}:`,
                                        error.message
                                    );

                                    return null;

                                }
                            )
                )

            );

        const operations =
            meals
                .filter(Boolean)
                .map(meal => {

                    const normalized =
                        normalizeMeal(meal);

                    return {

                        updateOne: {

                            filter: {
                                externalId:
                                    normalized.externalId,
                            },

                            update: {

                                $set: normalized,

                                $setOnInsert: {
                                    createdAt:
                                        new Date(),
                                },

                            },

                            upsert: true,

                        },

                    };

                });

        if (operations.length > 0) {

            await Recipe.bulkWrite(
                operations,
                {
                    ordered: false,
                }
            );

            imported +=
                operations.length;

        }

        console.log(
            `Processed ${Math.min(
                i + BATCH_SIZE,
                ids.length
            )}/${ids.length}`
        );

        await sleep(300);

    }

    console.log(
        `Ingestion complete. Processed ${imported} recipes.`
    );

}