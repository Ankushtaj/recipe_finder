import React from "react";
import { Link } from "react-router-dom";
import {FaYoutube,FaGlobe,FaUtensils,FaTags,FaArrowRight,} from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
    const {id,title,image,category,area,instructions,youtube,tags,} = recipe;

    return (
        <div className="w-full sm:w-[280px] md:w-[290px] lg:w-[300px] rounded-2xl shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-orange-400/30 hover:-translate-y-2 transition-all duration-300">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden min-h-[380px] flex flex-col">
                <img src={image} alt={title} className="w-full h-[200px] object-cover shrink-0 hover:scale-105 duration-300"/>

                <div className="p-4 flex flex-col flex-1">
                    <div className="h-[50px] overflow-y-auto scrollbar-none">
                        <h2 className="font-bold text-xl break-words text-gray-50 line-clamp-2">
                            {title}
                        </h2>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2.5">
                        {(category === "")? <></> : <span className="bg-amber-500 text-amber-50 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                            <FaUtensils />
                            {category}
                        </span>}

                        {(area === "")? <></> : <span className="bg-amber-700 text-amber-50 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                            <FaGlobe />
                            {area}
                        </span>}
                    </div>

                    <div className="mt-auto pt-4 flex gap-2">
                        <a
                            href={(youtube === "")?"javascript:void(0);":youtube}
                            target={(youtube === "")?"":"_blank"}
                            rel="noreferrer"
                            className="flex-1 bg-red-700 hover:bg-red-600 text-white rounded-lg py-2 flex items-center justify-center gap-3 duration-300">
                            <FaYoutube className="size-8"/>
                            {(youtube === "")? "N/A" : "Watch"}
                        </a>

                        <Link
                            to={`/recipes/${id}`}
                            className="flex-1 bg-amber-500/90 hover:bg-orange-400 text-white rounded-lg py-2 flex items-center justify-center gap-2 duration-300">
                            Details
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;