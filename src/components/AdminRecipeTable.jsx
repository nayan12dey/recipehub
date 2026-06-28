"use client";

import { FaTrash, FaStar } from "react-icons/fa";
import EditModal from "./EditModal";

export default function AdminRecipeTable({
    recipes = [],
    onDelete,
    onUpdate,
    handleFeature,
}) {

  

    
    return (
        <div className="overflow-x-auto bg-white/70 dark:bg-gray-900 backdrop-blur-xl rounded-3xl shadow-xl border border-orange-100/50 p-1">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl">
                        <th className="p-4 font-semibold text-sm first:rounded-l-2xl">#</th>
                        <th className="p-4 font-semibold text-sm">Recipe</th>
                        <th className="p-4 font-semibold text-sm">Category</th>
                        <th className="p-4 font-semibold text-sm">Author</th>
                        <th className="p-4 font-semibold text-sm">Cuisine</th>
                        <th className="p-4 font-semibold text-sm last:rounded-r-2xl text-center">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-orange-50/60">
                    {recipes.map((recipe, index) => (
                        <tr
                            key={recipe._id}
                            className="hover:bg-orange-50/40 dark:hover:bg-orange-200 transition-all duration-300 group"
                        >
                            <td className="p-4 text-gray-500 font-mono text-sm">{index + 1}</td>

                            <td className="p-4 text-gray-900 font-medium group-hover:text-orange-600 transition-colors dark:text-orange-500">
                                {recipe?.recipeName}
                            </td>

                            <td className="p-4">
                                <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold border border-orange-100">
                                    {recipe?.category}
                                </span>
                            </td>

                            <td className="p-4 text-gray-600 text-sm">{recipe?.authorEmail}</td>

                            <td className="p-4 text-gray-700 text-sm">{recipe?.cuisineType}</td>

                            <td className="p-4">
                                <div className="flex items-center justify-center gap-2">
                                    {/* Feature Button/Badge */}
                                    {recipe?.isFeatured ? (
                                        <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-200">
                                            <FaStar className="animate-pulse" size={12} />
                                            Featured
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handleFeature && handleFeature(recipe._id)}
                                            className="bg-white hover:bg-amber-500 text-amber-600 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-200 hover:border-amber-500 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
                                        >
                                            Feature
                                        </button>
                                    )}

                                    {/* Edit Action */}
                                    <div className="transition-all duration-300 hover:scale-105">
                                        <EditModal
                                            recipe={recipe}
                                            onUpdate={onUpdate}
                                        />
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => onDelete(recipe?._id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-500 hover:text-white hover:border-red-500 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
                                    >
                                        <FaTrash size={11} />
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

