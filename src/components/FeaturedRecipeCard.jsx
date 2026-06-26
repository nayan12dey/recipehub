import Image from "next/image";
import Link from "next/link";
import { FaClock, FaGlobe } from "react-icons/fa";

export default function FeaturedRecipeCard({ recipe }) {
    return (
        // <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">

        //     <Image
        //     width={200}
        //     height={200}
        //         src={recipe.recipeImage}
        //         alt={recipe.recipeName}
        //         className="w-full h-56 object-cover"
        //     />

        //     <div className="p-5">

        //         <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
        //             {recipe.category}
        //         </span>

        //         <h3 className="text-xl font-bold mt-4">
        //             {recipe.recipeName}
        //         </h3>

        //         <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
        //             <span className="flex items-center gap-1">
        //                 <FaGlobe />
        //                 {recipe.cuisineType}
        //             </span>

        //             <span className="flex items-center gap-1">
        //                 <FaClock />
        //                 {recipe.preparationTime}
        //             </span>
        //         </div>

        //         <Link
        //             href={`/recipes/${recipe._id}`}
        //             className="mt-5 inline-block w-full text-center bg-orange-500 text-white py-2 rounded-xl"
        //         >
        //             View Recipe
        //         </Link>
        //     </div>
        // </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg dark:shadow-black/20 overflow-hidden hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300 border border-transparent dark:border-gray-800">

            <Image
                width={200}
                height={200}
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                className="w-full h-56 object-cover"
            />

            <div className="p-5">

                <span className="bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                    {recipe.category}
                </span>

                <h3 className="text-xl font-bold mt-4 text-gray-900 dark:text-gray-50">
                    {recipe.recipeName}
                </h3>

                <div className="flex items-center gap-4 mt-3 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                        <FaGlobe className="text-gray-400 dark:text-gray-500" />
                        {recipe.category ? recipe.cuisineType : "Global"}
                    </span>

                    <span className="flex items-center gap-1">
                        <FaClock className="text-gray-400 dark:text-gray-500" />
                        {recipe.preparationTime}
                    </span>
                </div>

                <Link
                    href={`/recipes/${recipe._id}`}
                    className="mt-5 inline-block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-medium transition-colors duration-200 shadow-sm"
                >
                    View Recipe
                </Link>
            </div>
        </div>
    );
}    