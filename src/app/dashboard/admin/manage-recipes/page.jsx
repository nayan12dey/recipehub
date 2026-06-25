"use client";

import { useEffect, useState } from "react";
import AdminRecipeTable from "@/components/AdminRecipeTable";
import toast from "react-hot-toast";

export default function ManageRecipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/recipes")
            .then(res => res.json())
            .then(data => setRecipes(data));
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch(
            `http://localhost:5000/recipes/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await res.json();

        if (data.deletedCount > 0) {
            setRecipes(prev =>
                prev.filter(recipe => recipe._id !== id)
            );
        }
    };

    const handleUpdate = (updatedRecipe) => {
        setRecipes(prev =>
            prev.map(recipe =>
                recipe._id === updatedRecipe._id
                    ? updatedRecipe
                    : recipe
            )
        );
    };

    const handleFeature = async (id) => {
        console.log(id);

        const res = await fetch(
            `http://localhost:5000/recipes/feature/${id}`,
            {
                method: "PATCH",
            }
        );

        const data = await res.json();

        console.log(data);

        if (data.modifiedCount > 0) {
            setRecipes(prev =>
                prev.map(recipe =>
                    recipe._id === id
                        ? {
                            ...recipe,
                            isFeatured: true,
                        }
                        : recipe
                )
            );

            toast.success("Recipe Featured Successfully");
        }
    };



    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Manage Recipes
            </h1>

            <AdminRecipeTable
                recipes={recipes}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                handleFeature={handleFeature}
            />
        </div>
    );
}

