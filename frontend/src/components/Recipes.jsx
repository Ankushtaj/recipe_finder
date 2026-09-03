import { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import Loading from './Loading.jsx'
import Searchbar from './SearchBar.jsx'
import RecipeCard from './RecipeCard.jsx'
import { Link } from "react-router-dom"
import { normalizeMeal } from "../services/normalize.js"
import { getRecipes, getHomeRecommendations, addSearchHistory } from "../services/api.js"
import { useAuth } from "../context/AuthContext.jsx"

const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()

    const fetchRecipefunc = async (searchText = "") => {
        setLoading(true)

        try {
            let data
            if (searchText.trim() === "") {
                if (user) {
                    data = await getHomeRecommendations()
                }
                else {
                    data = await getRecipes({
                        q: "",
                        page: 1,
                        limit: 12,
                        fuzzy: true,
                    })
                }
            }
            else {
                data = await getRecipes({
                    q: searchText,
                    page: 1,
                    limit: 48,
                    fuzzy: true,
                })
            }

            const normalized = data.recipes.map(
                normalizeMeal
            )

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

    const handleChange = (e) => {
        setQuery(
            e.target.value
        )
    }

    const handleClear = () => {
        setQuery("")
        fetchRecipefunc("")
    }

    const handleSearchedRecipe = async (e) => {
        e.preventDefault()
        const search = query.trim()

        if (search === "") {
            fetchRecipefunc("")
            return
        }

        await fetchRecipefunc(search)

        if (user) {
            try {
                await addSearchHistory(search)
            }
            catch (error) {
                console.log(
                    "Could not save search history:",
                    error
                )
            }
        }
    }

    useEffect(() => {
        fetchRecipefunc("")
    }, [user])

    function mountRecipes() {
        if (recipes.length > 0) {
            return (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-8 py-6 px-6 place-items-center">
                    {
                        recipes.map(
                            (item, index) => (
                                <RecipeCard recipe={item} key={item.id || index} />
                            )
                        )
                    }
                </div>
            )
        }

        return (
            <div className='text-gray-100 font-medium w-full items-center justify-center py-10'>
                <p className='text-center'>
                    No Recipe Found
                </p>
            </div>
        )
    }

    if (loading) {
        return (
            <div className='w-full flex justify-center pt-4'>
                <Loading />
            </div>
        )
    }

    return (
        <div id="explore" className='bg-[#0b0f14] min-h-screen scroll-mt-16'>
            <div className='w-full flex items-center justify-center gap-3 pt-10 pb-5 px-2 md:px-10'>
                <form
                    className='w-full lg:w-2/4'
                    onSubmit={handleSearchedRecipe}>
                    <Searchbar
                        placeholder="eg. Cake, Vegan, Chicken"
                        value={query}
                        handleInputChange={handleChange}
                        onClear={handleClear}
                        rightIcon={<BiSearchAlt2
                            className='text-orange-300 cursor-pointer'
                            onClick={handleSearchedRecipe}
                        />}
                    />
                </form>

                <Link
                    to="/favourites"
                    title={
                        user
                            ? "Go to Favourites"
                            : "Login to view Favourites"
                    }
                    className='bg-black border border-gray-500/80 text-md rounded-full block p-2.5 outline-none shadow-lg focus:ring focus:ring-slate-800 focus:border-slate-800 transition-all duration-300 hover:scale-110 hover:text-orange-300 hover:border-orange-400 hover:shadow-[0_0_18px_rgba(251,146,60,0.65)]'
                >
                    ❤️
                </Link>
            </div>

            {mountRecipes()}
        </div>
    )
}

export default Recipes