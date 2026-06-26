"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Utensils, ChevronRight } from "lucide-react";
import Loader from "@/components/Loader";

export default function BrowseRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch("http://localhost:5000/recipes")
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data)
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
    return <Loader />;
}

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                    Explore Recipes
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Discover a world of culinary delights, from quick weeknight dinners to gourmet weekend feasts.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
                {recipes.map((recipe) => (
                    <div
                        key={recipe._id}
                        className="group flex flex-col bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 transform hover:-translate-y-1"
                    >
                        <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <Image
                                src={recipe.recipeImage || "/placeholder.jpg"}
                                alt={recipe.recipeName}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="flex flex-col flex-grow p-6">
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
                                    {recipe.category}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                                    {recipe.cuisineType}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {recipe.recipeName}
                            </h2>

                            <div className="mt-auto pt-6 flex flex-col gap-4 border-t border-gray-100 dark:border-gray-700/50">
                                <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 gap-5">
                                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-2.5 py-1.5 rounded-lg">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        <span>{recipe.preparationTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-2.5 py-1.5 rounded-lg">
                                        <Utensils className="w-4 h-4 text-orange-500" />
                                        <span>{recipe.cuisineType}</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/recipes/${recipe._id}`}
                                    className="relative flex items-center justify-center w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-sm font-semibold text-white dark:text-gray-900 rounded-xl transition-all overflow-hidden group/btn"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        View Recipe Details
                                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}