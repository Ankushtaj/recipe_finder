export async function fetchRecipeById(id) {

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const data = await response.json();

    return data.meals[0];

}

export async function searchByName(query) {

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    const data = await response.json();

    return data.meals ?? [];
}

export async function searchByCategory(query) {

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
    );

    const data = await response.json();

    return data.meals ?? [];
}

export async function searchByArea(query) {

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`
    );

    const data = await response.json();

    return data.meals ?? [];
}

export async function searchByIngredient(query) {

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
    );

    const data = await response.json();

    return data.meals ?? [];
}

export async function fetchRandomRecipe() {
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );

    const data = await response.json();

    return data.meals[0];
}
export async function fetchRandomRecipes(count) {

    const promises = [];

    for (let i = 0; i < count; i++) {
        promises.push(fetchRandomRecipe());
    }

    const meals = await Promise.all(promises);

    return meals;
}