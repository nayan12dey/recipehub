
"use client";

import { authClient, useSession } from "@/lib/auth-client";
import RecipeCard from "@/components/RecipeCard";
import { FaBookOpen, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import Link from "next/link";
// import toast from "react-hot-toast";

export default function MyRecipes() {
    const { data: session } = useSession();

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchRecipes = async () => {
            if (!session?.user?.email) return;

            setLoading(true);

            const { data: token } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/my-recipes/${session.user.email}`,
                {
                    headers: {
                        authorization: `Bearer ${token?.token}`,
                    },
                }
            );

            const data = await res.json();

            setRecipes(Array.isArray(data) ? data : []);
            setLoading(false);
        };

        fetchRecipes();
    }, [session]);

    const handleRecipeUpdate = (updatedRecipe) => {
        setRecipes((prev) =>
            prev.map((recipe) =>
                recipe._id === updatedRecipe._id
                    ? updatedRecipe
                    : recipe
            )
        );
    };

    const handleDelete = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (data.deletedCount > 0) {
            setRecipes((prev) => prev.filter((r) => r._id !== id));
            toast.success("Recipe deleted successfully!");
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-full">

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-1">
                    <FaBookOpen className="text-orange-500" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        My Recipes
                    </h1>
                </div>
                <p className="text-gray-400 text-sm ml-7">
                    Manage and organise all your recipes.
                </p>
            </div>

            {/* Grid */}
            {recipes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">

                    <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-5">
                        <FaBookOpen className="text-3xl text-orange-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        No Recipes Found
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                        You haven't added any recipes yet. Start sharing your delicious recipes with the community.
                    </p>

                    <Link
                        href="/dashboard/user/add-recipe"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
                    >
                        <FaPlus />
                        Add Your First Recipe
                    </Link>
                </div>
            ) : (
                /* Recipe Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe._id}
                            recipe={recipe}
                            onDelete={handleDelete}
                            onUpdate={handleRecipeUpdate}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}