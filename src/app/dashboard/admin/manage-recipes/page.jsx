"use client";

import { useEffect, useState } from "react";
import AdminRecipeTable from "@/components/AdminRecipeTable";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function ManageRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);

            const { data: token } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/all-recipes`,
                {
                    headers: {
                        authorization: `Bearer ${token?.token}`,
                    },
                }
            );

            const data = await res.json();

            setRecipes(data);
            setLoading(false);
        };

        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        const { data: token } = await authClient.token();
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/${id}`,
            {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token?.token}`,
                },
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

        const { data: token } = await authClient.token();
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/feature/${id}`,
            {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${token?.token}`,
                },
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

    if (loading) {
        return <Loader />;
    }



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

