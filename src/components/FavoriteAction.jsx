// import { Star } from 'lucide-react';
// import React from 'react';

// const FavoriteAction = () => {

//     const handleFavorite = async () => {

//         const favorite = {
//             userEmail: session.user.email,
//             userId: session.user.id,
//             recipeId: recipe._id,
//             addedAt: new Date(),
//         };

//         const res = await fetch(
//             "http://localhost:5000/favorites",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type":
//                         "application/json",
//                 },
//                 body: JSON.stringify(
//                     favorite
//                 ),
//             }
//         );

//         const data = await res.json();

//         if (data.insertedId) {
//             toast.success("Added to favorites");
//         }
//     };


//     return (

//         <button className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold text-sm border border-amber-200 hover:border-amber-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
//             <Star className="w-4 h-4" />
//             Add to Favourites
//         </button>
//     );
// };

// export default FavoriteAction;




"use client";

import { useSession } from "@/lib/auth-client";
import { Star } from "lucide-react";

import toast from "react-hot-toast";

const FavoriteAction = ({ recipe }) => {

    console.log(recipe)

    const { data: session } = useSession();

    const handleFavorite = async () => {

        const favorite = {
            userEmail: session?.user?.email,
            userId: session?.user?.id,

            recipeId: recipe._id,
            recipeName: recipe.recipeName,
            recipeImage: recipe.recipeImage,
            category: recipe.category,
            cuisineType: recipe.cuisineType,

            addedAt: new Date(),
        };

        const res = await fetch(
            "http://localhost:5000/favorites",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(favorite),
            }
        );

        const data = await res.json();

        if (data.insertedId) {
            toast.success("Added to favorites");
        }

        if (data.message) {
            toast.error("Already added");
        }
    };

    return (
        <button
            onClick={handleFavorite}
            className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold text-sm border border-amber-200 hover:border-amber-300"
        >
            <Star className="w-4 h-4" />
            Add to Favourites
        </button>
    );
};

export default FavoriteAction;


