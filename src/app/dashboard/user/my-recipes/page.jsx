"use client";


import EditModal from "@/components/EditModal";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyRecipes() {

    const { data: session } = useSession();
    console.log(session)

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(
            `http://localhost:5000/my-recipes/${session?.user?.email}`
        )
            .then((res) => res.json())
            .then((data) => setRecipes(data));
    }, [session]);

    const handleDelete = async (id) => {
        const res = await fetch(
            `http://localhost:5000/recipes/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await res.json();

        if (data.deletedCount > 0) {
            setRecipes(
                recipes.filter(
                    recipe => recipe._id !== id
                )
            );
        }
    };




    return (
        <table>

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {recipes.map((recipe) => (
                    <tr key={recipe._id}>
                        <td>{recipe.recipeName}</td>

                        <td>{recipe.category}</td>

                        <td className="flex gap-2">

                            <Link href={`/recipes/${recipe._id}`}>
                                <Button>
                                    View
                                </Button>
                            </Link>

                            <EditModal recipe={recipe} />

                            <Button
                                color="danger"
                                onClick={() =>
                                    handleDelete(recipe._id)
                                }
                            >
                                Delete
                            </Button>

                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
    );
}