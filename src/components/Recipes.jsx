import React, { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import Loading from './Loading.jsx'
import Searchbar from './SearchBar.jsx'
import RecipeCard from './RecipeCard.jsx'
import { normalizeMeal } from "../services/normalize.js";
import { searchByName, searchByCategory, searchByArea, searchByIngredient, fetchRecipeById, fetchRandomRecipes } from '../services/mealdb.js'

const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchRecipefunc = async (r) => {
        setLoading(true)
        try {
            let meals;
            if (r == false) {
                meals = await fetchRandomRecipes(12);
            }
            else {
                meals = await searchByName(query);
                if (meals.length === 0) {
                    meals = await searchByCategory(query);
                    const fullMeals = await Promise.all(meals.map(meal => fetchRecipeById(meal.idMeal)));
                    meals = fullMeals;
                }
                if (meals.length === 0) {
                    meals = await searchByArea(query);
                    const fullMeals = await Promise.all(meals.map(meal => fetchRecipeById(meal.idMeal)));
                    meals = fullMeals;
                }
                if (meals.length === 0) {
                    meals = await searchByIngredient(query);
                    const fullMeals = await Promise.all(meals.map(meal => fetchRecipeById(meal.idMeal)));
                    meals = fullMeals;
                }
            }
            const normalized = meals.map(normalizeMeal);
            setRecipes(normalized);
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }
    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearchedRecipe = async (e) => {
        e.preventDefault()
        fetchRecipefunc(true)
    }

    useEffect(() => {
        fetchRecipefunc(false)
    }, [])

    function mountRecipes() {
        if (recipes.length > 0) {
            return (
                <>
                    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] gap-8 py-6 px-8 place-items-center">
                        {
                            recipes.map((item, index) => (
                                <RecipeCard recipe={item} key={index} />))
                        }
                    </div>
                </>
            )
        }
        else {
            return (
                <div className='text-gray-100 font-medium w-full items-center justify-center py-10'>
                    <p className='text-center'>No Recipe Found</p>
                </div>
            )
        }
    }

    if (loading) {
        return (
            <div className='w-full flex justify-center pt-4'><Loading /></div>
        )
    }
    return (
        <div id='explore' className='bg-[#0b0f14] min-h-screen scroll-mt-16'>
            <div className='w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10'>
                <form className='w-full lg:w-2/4' onSubmit={handleSearchedRecipe}>
                    <Searchbar placeholder="eg. Cake, Vegan, Chicken" handleInputChange={handleChange} rightIcon={<BiSearchAlt2 className='text-orange-300' onClick={handleSearchedRecipe} />} />
                </form>
            </div>
            {mountRecipes()}
        </div>
    )
}

export default Recipes
