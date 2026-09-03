import { Link } from "react-router-dom";
import { FaYoutube, FaGlobe, FaUtensils, FaArrowRight } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
    const { id, title, image, category, area, youtube } = recipe;

    return (
        <div className="w-full sm:w-[280px] md:w-[290px] lg:w-[300px] rounded-2xl shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-400/20">
            <div className="group bg-zinc-900/95 border border-white/10 hover:border-orange-300/30 rounded-2xl overflow-hidden min-h-[380px] flex flex-col backdrop-blur-sm transition-all duration-300">

                <div className="relative w-full h-[200px] overflow-hidden bg-black">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover shrink-0 transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-70" />

                    <div className="absolute top-3 right-3 rounded-full bg-black/45 backdrop-blur-sm border border-white/10 px-2 py-1 text-[10px] tracking-wider text-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        RECIPE
                    </div>
                </div>

                <div className="p-4 flex flex-col flex-1">

                    <div className="h-[50px] overflow-y-auto scrollbar-none">
                        <h2 className="font-semibold text-xl break-words text-gray-50 leading-tight tracking-tight group-hover:text-orange-100 transition-colors duration-300 line-clamp-2">
                            {title}
                        </h2>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2.5">

                        {category !== "" && (
                            <span className="bg-amber-500/15 border border-amber-300/20 text-amber-100 px-3 py-1 rounded-full text-xs flex items-center gap-2 backdrop-blur-sm">
                                <FaUtensils className="text-amber-300" />
                                {category}
                            </span>
                        )}

                        {area !== "" && (
                            <span className="bg-orange-500/10 border border-orange-300/15 text-orange-100 px-3 py-1 rounded-full text-xs flex items-center gap-2 backdrop-blur-sm">
                                <FaGlobe className="text-orange-300" />
                                {area}
                            </span>
                        )}

                    </div>

                    <div className="mt-auto pt-5 flex gap-2">
                        {
                            recipe?.youtube !== "" ? (
                                <a
                                    href={youtube}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-red-600 hover:bg-red-500 duration-300 py-2 px-4 rounded-full flex items-center gap-3 text-gray-300"
                                >
                                    <FaYoutube className="size-8" />
                                    Watch
                                </a>
                            ) : (
                                <button
                                    disabled
                                    className="bg-zinc-700 py-2 px-4 rounded-full flex items-center gap-3 cursor-not-allowed text-gray-300"
                                >
                                    <FaYoutube className="size-8" />
                                    N/A
                                </button>
                            )
                        }

                        <Link
                            to={`/recipes/${id}`}
                            className="flex-1 bg-linear-to-r from-amber-500 to-orange-400 hover:from-amber-400 hover:to-orange-300 text-black font-semibold rounded-full px-3 py-2 flex items-center justify-center gap-2 duration-300 shadow-md shadow-orange-950/20 hover:shadow-orange-400/20"
                        >
                            Details
                            <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;