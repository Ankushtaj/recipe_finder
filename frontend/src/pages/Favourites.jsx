import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import RecipeCard from '../components/RecipeCard'
import { getFavourites } from "../services/api.js"
import { normalizeMeal } from "../services/normalize.js"
import BackButton from "../components/BackButton"

const Favourites = () => {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)

    const getFavouriteRecipes = async () => {
        setLoading(true)

        try {
            const data = await getFavourites()
            const normalized = data.recipes.map(normalizeMeal)
            setRecipes(normalized)
        }
        catch (error) {
            console.log(error)
            setRecipes([])
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFavouriteRecipes()
    }, [])

    if (loading) {
        return (
            <div className='w-full min-h-screen bg-[#0b0f14] flex justify-center items-center'>
                <Loading />
            </div>
        )
    }

    if (recipes.length === 0) {
        return (
            <div className="min-h-screen bg-[#0b0f14] flex flex-col gap-y-2 items-center justify-center text-orange-300 px-6">
                <div className='text-orange-300 text-[1rem] sm:text-xl md:text-2xl font-bold text-center'>
                    You haven't saved any recipes yet.
                </div>

                <div className='text-gray-400 text-sm sm:text-lg md:text-xl mt-2 text-center'>
                    Explore recipes and tap ❤️ to save them.
                </div>

                <div className="mt-10">
                    <BackButton />
                </div>
            </div>
        )
    }

    return (
        <div className='bg-[#0b0f14] min-h-screen scroll-mt-16 px-4 sm:px-6 lg:px-8 py-10'>

            <div className='text-center'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl text-orange-300 font-bold'>
                    ❤️ My Favourite Recipes
                </h1>

                <p className="text-gray-400 mt-2 text-base sm:text-lg">
                    {recipes.length} Saved Recipe{recipes.length !== 1 ? "s" : ""}
                </p>
            </div>

            <div className="max-w-7xl mx-auto mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
                    {
                        recipes.map(
                            (item, index) => (
                                <RecipeCard
                                    recipe={item}
                                    key={item.id || index}
                                />
                            )
                        )
                    }
                </div>
            </div>

            <div className="flex justify-center mt-12 pb-4">
                <BackButton />
            </div>

        </div>
    )
}

export default Favourites