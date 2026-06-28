
"use client";

import { authClient, useSession } from "@/lib/auth-client";
import RecipeCard from "@/components/RecipeCard";
import { FaBookOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

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

        </div>
    );
}