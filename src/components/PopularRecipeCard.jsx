"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaUser } from "react-icons/fa";

export default function PopularRecipeCard({ recipe }) {
    return (
        // <div className="group flex flex-col h-full justify-between bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl">

        //     {/* Image Section */}
        //     <div className="relative overflow-hidden aspect-[4/3] w-full h-56 bg-gray-100 rounded-2xl">
        //         <Image
        //             width={400}
        //             height={300}
        //             src={recipe.recipeImage}
        //             alt={recipe.recipeName}
        //             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        //         />
        //     </div>

        //     {/* Content Section */}
        //     <div className="pt-5 px-5">

        //         {recipe.category && (
        //             <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
        //                 {recipe.category}
        //             </span>
        //         )}

        //         {/* Title */}
        //         <h3 className="text-xl font-bold text-gray-900 line-clamp-1 transition-colors duration-200">
        //             {recipe.recipeName}
        //         </h3>

        //         {/* Metadata */}
        //         <div className="flex items-center gap-4 mt-3 text-sm">

        //             <span className="flex items-center gap-1.5 text-orange-500 font-semibold">
        //                 <FaHeart />
        //                 {recipe.likesCount ?? 0} Likes
        //             </span>

        //             <span className="flex items-center gap-1.5 text-gray-500">
        //                 <FaUser className="text-gray-400" />
        //                 {recipe.authorName || "Unknown"}
        //             </span>

        //         </div>
        //     </div>

        //     {/* Button */}
        //     <div className="px-5 pb-5 mt-6">
        //         <Link
        //             href={`/recipes/${recipe._id}`}
        //             className="inline-block w-full text-center bg-orange-500 hover:bg-orange-600 transition text-white py-2 rounded-xl"
        //         >
        //             View Recipe
        //         </Link>
        //     </div>
        // </div>

        <div className="group flex flex-col h-full justify-between bg-white dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-black/30 border border-transparent dark:border-gray-800">

            {/* Image Section */}
            <div className="relative overflow-hidden aspect-[4/3] w-full h-56 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <Image
                    width={400}
                    height={300}
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content Section */}
            <div className="pt-5 px-5">

                {recipe.category && (
                    <span className="inline-block bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        {recipe.category}
                    </span>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 line-clamp-1 transition-colors duration-200">
                    {recipe.recipeName}
                </h3>

                {/* Metadata */}
                <div className="flex items-center gap-4 mt-3 text-sm">

                    <span className="flex items-center gap-1.5 text-orange-500 dark:text-orange-400 font-semibold">
                        <FaHeart />
                        {recipe.likesCount ?? 0} Likes
                    </span>

                    <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                        <FaUser className="text-gray-400 dark:text-gray-500" />
                        {recipe.authorName || "Unknown"}
                    </span>

                </div>
            </div>

            {/* Button */}
            <div className="px-5 pb-5 mt-6">
                <Link
                    href={`/recipes/${recipe._id}`}
                    className="inline-block w-full text-center bg-orange-500 hover:bg-orange-600 transition text-white py-2 rounded-xl font-medium shadow-sm"
                >
                    View Recipe
                </Link>
            </div>
        </div>
    );
}