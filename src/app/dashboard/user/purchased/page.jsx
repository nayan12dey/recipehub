"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaClock, FaGlobe } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import Loader from "@/components/Loader";


const difficultyStyles = {
    Easy: "bg-green-100 text-green-700 border-green-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Hard: "bg-red-100 text-red-700 border-red-200",
};

const categoryStyles = {
    "Main Course": "bg-orange-100 text-orange-700",
    "Fast Food": "bg-yellow-100 text-yellow-700",
    Snack: "bg-lime-100 text-lime-700",
    Healthy: "bg-emerald-100 text-emerald-700",
    "Street Food": "bg-violet-100 text-violet-700",
    Beverage: "bg-sky-100 text-sky-700",
    Dessert: "bg-pink-100 text-pink-700",
};

export default function PurchasedRecipes() {
    const { data: session } = useSession();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (session?.user?.email) {
            setLoading(true);
            fetch(`http://localhost:5000/purchases/${session.user.email}`)
                .then(res => res.json())
                .then(data => {
                    setRecipes(data)
                    setLoading(false);
                });

        }
    }, [session]);


    if (loading) {
        return <Loader />;
    }


    if (recipes.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 font-medium text-sm">
                No purchased recipes found.
            </div>
        );
    }


    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {recipes.map(recipe => (
                <div
                    key={recipe._id}
                    className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                    {/* Image Section */}
                    <div className="relative h-44 overflow-hidden bg-orange-50 flex-shrink-0">
                        {recipe.recipeImage ? (
                            <img
                                src={recipe.recipeImage}
                                alt={recipe.recipeName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <MdOutlineRestaurantMenu size={52} className="text-orange-200" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                        {/* Category Tag */}
                        <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${categoryStyles[recipe.category] ?? "bg-gray-100 text-gray-600"}`}>
                            {recipe.category}
                        </span>

                        {/* Paid Tag */}
                        <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                            Paid: ${recipe.amount}
                        </span>
                    </div>

                    {/* Body Section */}
                    <div className="flex flex-col flex-1 p-4 gap-3">
                        <h3 className="text-gray-800 font-bold text-base line-clamp-1">
                            {recipe.recipeName}
                        </h3>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-2 text-[11px] text-gray-500 font-medium">
                            {recipe.cuisineType && (
                                <span className="flex items-center gap-1">
                                    <FaGlobe size={10} className="text-orange-400" />
                                    {recipe.cuisineType}
                                </span>
                            )}

                            {recipe.preparationTime && (
                                <span className="flex items-center gap-1">
                                    <FaClock size={10} className="text-orange-400" />
                                    {recipe.preparationTime}
                                </span>
                            )}

                            {recipe.difficultyLevel && (
                                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${difficultyStyles[recipe.difficultyLevel]}`}>
                                    {recipe.difficultyLevel}
                                </span>
                            )}
                        </div>

                        <div className="flex-1" />

                        {/* Actions */}
                        <div className="pt-2 border-t border-gray-100">
                            <Link
                                href={`/recipes/${recipe.recipeId}`}
                                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-orange-200 text-orange-600 text-xs font-semibold hover:bg-orange-50 transition-colors duration-200"
                            >
                                <FaEye size={11} />
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}