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

            {/* TABLE */}
            <table className="hidden lg:table w-full text-left border-collapse min-w-[800px]">

                <thead>
                    <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        <th className="p-4 font-semibold text-sm first:rounded-l-2xl">#</th>
                        <th className="p-4 font-semibold text-sm">Recipe</th>
                        <th className="p-4 font-semibold text-sm">Category</th>
                        <th className="p-4 font-semibold text-sm">Author</th>
                        <th className="p-4 font-semibold text-sm">Cuisine</th>
                        <th className="p-4 font-semibold text-sm last:rounded-r-2xl text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-orange-50/60">
                    {recipes.map((recipe, index) => (
                        <tr
                            key={recipe._id}
                            className="hover:bg-orange-50/40 dark:hover:bg-orange-200 transition-all duration-300 group"
                        >
                            <td className="p-4 text-gray-500 font-mono text-sm">
                                {index + 1}
                            </td>

                            <td className="p-4 text-gray-900 font-medium group-hover:text-orange-600 dark:text-orange-500">
                                {recipe?.recipeName}
                            </td>

                            <td className="p-4">
                                <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold border border-orange-100">
                                    {recipe?.category}
                                </span>
                            </td>

                            <td className="p-4 text-gray-600 text-sm">
                                {recipe?.authorEmail}
                            </td>

                            <td className="p-4 text-gray-700 text-sm">
                                {recipe?.cuisineType}
                            </td>

                            <td className="p-4">
                                <div className="flex items-center justify-center gap-2">

                                    {recipe?.isFeatured ? (
                                        <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-200">
                                            <FaStar className="animate-pulse" size={12} />
                                            Featured
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handleFeature && handleFeature(recipe._id)}
                                            className="bg-white hover:bg-amber-500 text-amber-600 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-200 hover:border-amber-500 transition-all"
                                        >
                                            Feature
                                        </button>
                                    )}

                                    <EditModal recipe={recipe} onUpdate={onUpdate} />

                                    <button
                                        onClick={() => onDelete(recipe?._id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-500 hover:text-white transition-all"
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

            {/*   MOBILE + TABLET  */}
            <div className="lg:hidden space-y-3 p-2">

                {recipes.map((recipe, index) => (
                    <div
                        key={recipe._id}
                        className="bg-white dark:bg-gray-900 border border-orange-100/50 rounded-2xl p-4 shadow-sm"
                    >

                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-xs text-gray-400">#{index + 1}</p>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {recipe?.recipeName}
                                </h3>
                            </div>

                            {recipe?.isFeatured ? (
                                <span className="bg-amber-50 text-amber-600 px-2 py-1 rounded-xl text-xs font-bold border border-amber-200">
                                    <FaStar size={12} /> Featured
                                </span>
                            ) : (
                                <button
                                    onClick={() => handleFeature && handleFeature(recipe._id)}
                                    className="text-xs px-3 py-1 rounded-xl border border-amber-200 text-amber-600"
                                >
                                    Feature
                                </button>
                            )}
                        </div>

                        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                            <p><span className="font-medium">Category:</span> {recipe?.category}</p>
                            <p><span className="font-medium">Author:</span> {recipe?.authorEmail}</p>
                            <p><span className="font-medium">Cuisine:</span> {recipe?.cuisineType}</p>
                        </div>

                        <div className="flex gap-2 mt-3">
                            <EditModal recipe={recipe} onUpdate={onUpdate} />

                            <button
                                onClick={() => onDelete(recipe?._id)}
                                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-red-200 text-red-500 text-xs font-semibold"
                            >
                                <FaTrash size={11} />
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

