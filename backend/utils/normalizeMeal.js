export function normalizeMeal(meal) {

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {

        const name = meal[`strIngredient${i}`]?.trim();
        const measure = meal[`strMeasure${i}`]?.trim();

        if (name) {

            ingredients.push({
                name,
                measure: measure || "",
            });

        }

    }

    const tags = meal.strTags
        ? meal.strTags
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean)
        : [];

    return {

        externalId: meal.idMeal,

        title: meal.strMeal || "",

        image: meal.strMealThumb || "",

        thumbnail: meal.strMealThumb || "",

        category: meal.strCategory || "",

        area: meal.strArea || "",

        tags,

        ingredients,

        instructions: meal.strInstructions || "",

        youtubeUrl: meal.strYoutube || "",

        sourceUrl: meal.strSource || "",

    };

}