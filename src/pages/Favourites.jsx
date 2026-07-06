import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import RecipeCard from '../components/RecipeCard'
import { FaArrowLeft } from "react-icons/fa";
import { normalizeMeal } from "../services/normalize.js"
import { fetchRecipeById } from '../services/mealdb.js'
import { useNavigate } from "react-router-dom";

const Favourites = () => {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const favs = JSON.parse(localStorage.getItem("favs")) || []
    const getFavourites = async () => {
        setLoading(true)
        try {
            const meals = await Promise.all(favs.map(id => fetchRecipeById(id)))
            setRecipes(meals.map(normalizeMeal))
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFavourites();
    }, [])

    if (loading) {
        return (
            <div className='w-full flex justify-center pt-4'><Loading /></div>
        )
    }
    if (recipes.length === 0) {
        return (
            <div className="min-h-screen flex flex-col gap-y-2 items-center justify-center text-orange-300 ">
                <div className='text-orange-300 text-[1rem] sm:text-xl md:text-2xl font-bold'>You haven't saved any recipes yet.</div>
                <div className='text-gray-400 text-sm sm:text-lg md:text-xl mt-2 text-center'>Explore recipes and tap ❤️ to save them.</div>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-slate-600 hover:bg-slate-700 duration-300 max-w-[90px] px-3 py-2 rounded-lg flex items-center gap-2 text-gray-100 font-medium tracking-tight mt-10">
                    <FaArrowLeft />
                    Back
                </button>
            </div>
        )
    }
    return (
        <div className='bg-[#0b0f14] min-h-screen scroll-mt-16 flex flex-col gap-y-8'>
            <div className='text-center'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl text-orange-300 font-bold pt-8'>❤️ My Favourite Recipes</h1>
                <p className="text-gray-400 mt-2 text-lg">{recipes.length} Saved Recipe{recipes.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-8 py-6 px-6 place-items-center">
                {
                    recipes.map((item, index) => (
                        <RecipeCard recipe={item} key={index} />))
                }
            </div>
            <div className="flex justify-center px-8 pb-10">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-slate-600 hover:bg-slate-700 duration-300 max-w-[90px] px-3 py-2 rounded-lg flex items-center gap-2 text-gray-100 font-medium tracking-tight mt-5">
                    <FaArrowLeft />
                    Back
                </button>
            </div>
        </div>
    )
}

export default Favourites
