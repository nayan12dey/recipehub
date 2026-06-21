"use client";


import EditModal from "@/components/EditModal";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
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
    }, []);

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

                        <td>
                            <Button>View</Button>
                            <EditModal recipe={recipe}></EditModal>
                            <Button onClick={() => handleDelete(recipe._id)} variant="danger-soft">Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
    );
}