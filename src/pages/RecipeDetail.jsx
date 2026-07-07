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
import { Link } from "react-router-dom"

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null)
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate();

    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    const [add, setAdd] = useState(false);

    function saveFavs() {
        localStorage.setItem("favs", JSON.stringify(favs));
    }

    function addfav(id) {
        if (!favs.includes(id))
            favs.push(id)
        saveFavs()
    }
    function removefav(id) {
        for (let i = 0; i < favs.length; i++) {
            if (favs[i] === id) {
                favs.splice(i, 1)
                saveFavs()
                break
            }
        }
    }

    const getRecipe = async (id) => {
        try {
            setLoading(true)
            const data = await fetchRecipeById(id)
            console.log(data)
            const normalized = normalizeMeal(data)
            setRecipe(normalized)
            const recommend = await fetchRandomRecipes(6)
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
        setAdd((JSON.parse(localStorage.getItem("favs")) || []).includes(id))
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
                        {(recipe?.category === "")? <></> : <span className="bg-orange-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                            {recipe?.category}
                        </span>}
                        {(recipe?.area === "")? <></> : <span className="bg-zinc-800 px-4 py-1 rounded-full text-sm">
                            {recipe?.area}
                        </span>}
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
                        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 max-h-[350px] overflow-y-auto leading-8 text-gray-300 scrollbar-none">{recipe?.instructions}</div>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <a
                                href={(recipe?.youtube === "")?"javascript:void(0);":recipe?.youtube}
                                target={(recipe?.youtube === "")?"":"_blank"}
                                rel="noreferrer"
                                className="bg-red-600 hover:bg-red-500 duration-300 p-3 rounded-lg flex items-center gap-3"
                            >
                                <FaYoutube className="size-8"/>
                                {(recipe?.youtube === "")? "N/A" : "Watch"}
                            </a>
                            <button
                                onClick={() => {
                                    if (add) {
                                        removefav(recipe?.id)
                                        setAdd(false)
                                    }
                                    else {
                                        addfav(recipe?.id)
                                        setAdd(true)
                                    }
                                }}
                                className="min-w-[220px] bg-orange-400 hover:bg-orange-500 duration-300 py-3 px-2 rounded-lg text-center text-white font-semibold tracking-tight"
                            >
                                {(add == true) ? 'Remove from Favourites 🤍' : 'Add to Favourites ❤️'}
                            </button>
                            <Link
                                to="/favourites"
                                title="Go to Favourites"
                                className="bg-orange-400 p-4 rounded-full shadow-lg duration-300 font-semibold text-xl transition-all duration-300 hover:scale-110 hover:text-orange-300 hover:border-orange-400 hover:shadow-[0_0_18px_rgba(251,146,60,0.65)]"
                            >
                                ❤️
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-orange-300 mb-8">You May Also Like</h2>
                    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(270px,1fr))] gap-8 p-6 place-items-center">
                        {
                            recipes.map((item, index) => (
                                <RecipeCard recipe={item} key={index} />))
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-center px-8 pb-12">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-slate-600 hover:bg-slate-700 duration-300 p-3 rounded-lg flex items-center gap-2 text-gray-100 font-medium tracking-tight">
                    <FaArrowLeft />
                    Back
                </button>
            </div>
        </div>
    );
}

export default RecipeDetail