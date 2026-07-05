import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { fetchRecipeById, fetchRandomRecipes } from '../services/mealdb'
import { normalizeMeal } from '../services/normalize'
import Loading from '../components/Loading'
import Header from '../components/Header'
import { AiFillPushpin } from "react-icons/ai"
import { FaYoutube, FaArrowLeft } from "react-icons/fa";
import { BsPatchCheck } from "react-icons/bs"
import RecipeCard from '../components/RecipeCard'

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null)
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate();

    const getRecipe = async (id) => {
        try {
            setLoading(true)
            const data = await fetchRecipeById(id)
            console.log(data)
            const normalized = normalizeMeal(data)
            setRecipe(normalized)
            const recommend = await fetchRandomRecipes(8)
            setRecipes(recommend.map(normalizeMeal))
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRecipe(id)
    }, [id])


    if (loading) {
        return (
            <div className='w-full h-[100vh] flex items-center justify-center'>
                <Loading />
            </div>
        );
    }
    if (!recipe) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-[#090b0f]">
                <Loading />
            </div>
        );
    }
    return (
        <div className="bg-[#090b0f] min-h-screen text-white">
            <div className="relative h-[45vh]">
                <img src={recipe?.image} alt={recipe?.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#090b0f]" />

                <div className="absolute bottom-8 left-6 md:left-16">
                    <h1 className="text-3xl md:text-5xl font-bold">{recipe?.title}</h1>
                    <div className="flex flex-wrap gap-3 mt-4">
                        <span className="bg-orange-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                            {recipe?.category}
                        </span>
                        <span className="bg-zinc-800 px-4 py-1 rounded-full text-sm">
                            {recipe?.area}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
                <div className="grid md:grid-cols-2 gap-15">

                    <div>
                        <h2 className="text-2xl font-bold text-orange-300 mb-5">Ingredients</h2>
                        <div className="space-y-3">
                            {
                                recipe?.ingredients.map((item, index) => (
                                    <div key={index} className="flex gap-3 text-gray-300">
                                        <AiFillPushpin className="text-orange-400 mt-1" />
                                        <span>
                                            <span className='font-bold'>{item.measure}</span>
                                            {" "}
                                            {item.ingredient}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-orange-300 mb-5">Instructions</h2>
                        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 h-[350px] overflow-y-auto leading-8 text-gray-300 scrollbar-none">{recipe?.instructions}</div>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <a
                                href={recipe?.youtube}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-red-600 hover:bg-red-500 duration-300 px-6 py-3 rounded-lg flex items-center gap-3"
                            >
                                <FaYoutube />
                                Watch Recipe
                            </a>
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-orange-400 hover:bg-orange-500 duration-300 px-6 py-3 rounded-lg flex items-center gap-3 text-orange-50 font-semibold"
                            >
                                <FaArrowLeft />
                                Back
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-orange-300 mb-8">You May Also Like</h2>
                    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] gap-8 p-6 place-items-center">
                        {
                            recipes.map((item, index) => (
                                <RecipeCard recipe={item} key={index} />))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail