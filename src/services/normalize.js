export function normalizeMeal(meal){
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {

            ingredients.push({

                ingredient,
                measure,

            });

        }

    }
    return {

        id: meal.idMeal ?? "",

        title: meal.strMeal ?? "",

        image: meal.strMealThumb ?? "",

        category: meal.strCategory ?? "",

        area: meal.strArea ?? "",

        instructions: meal.strInstructions ?? "",

        youtube: meal.strYoutube ?? "",

        tags: meal.strTags ? meal.strTags.split(",") : [],

        ingredients,

    };
}