
"use client";

import { useSession } from "@/lib/auth-client";
import RecipeCard from "@/components/RecipeCard";
import { FaBookOpen } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function MyRecipes() {
    const { data: session } = useSession();

    const [recipes, setRecipes] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user?.email) return;

        // setLoading(true);

        fetch(`http://localhost:5000/my-recipes/${session.user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setRecipes(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
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
        const res = await fetch(`http://localhost:5000/recipes/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (data.deletedCount > 0) {
            setRecipes((prev) => prev.filter((r) => r._id !== id));
        }
    };

    return (
        <div className="min-h-full">

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-1">
                    <FaBookOpen className="text-orange-500" />
                    <h1 className="text-2xl font-bold text-gray-800">
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