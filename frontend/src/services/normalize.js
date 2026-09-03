export function normalizeMeal(meal) {
    return {
        id: meal._id ?? meal.id ?? meal.externalId ?? "",

        title: meal.title ?? "",

        image: meal.image ?? "",

        category: meal.category ?? "",

        area: meal.area ?? "",

        instructions: meal.instructions ?? "",

        youtube: meal.youtubeUrl ?? "",

        tags: Array.isArray(meal.tags) ? meal.tags : [],

        ingredients: Array.isArray(meal.ingredients) ? meal.ingredients.map(
            item => ({
                ingredient:
                    item.name ??
                    item.ingredient ??
                    "",

                measure:
                    item.measure ??
                    "",
            })
        ) : [],
    };
}