
"use client";

import Link from "next/link";
import EditModal from "@/components/EditModal";
import { FaTrash, FaEye, FaClock, FaGlobe } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";

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

export default function RecipeCard({ recipe, onDelete, onUpdate }) {
    return (
        <div className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">

            {/* Image */}
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

                <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${categoryStyles[recipe.category] ?? "bg-gray-100 text-gray-600"}`}>
                    {recipe.category}
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-4 gap-3">

                <h3 className="light:text-gray-800 dark:text-white font-bold text-base line-clamp-1">
                    {recipe.recipeName}
                </h3>

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
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">

                    <Link
                        href={`/recipes/${recipe._id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-orange-200 text-orange-600 text-xs font-semibold hover:bg-orange-50"
                    >
                        <FaEye size={11} />
                        View
                    </Link>

                    <div className="flex-1">
                        <EditModal recipe={recipe} onUpdate={onUpdate} />
                    </div>

                    <button
                        onClick={() => onDelete(recipe._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-50"
                    >
                        <FaTrash size={10} />
                        Delete
                    </button>

                </div>
            </div>
        </div>
    );
}