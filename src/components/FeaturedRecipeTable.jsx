import Image from "next/image";
import Link from "next/link";
import { FaClock, FaGlobe } from "react-icons/fa";

export default function FeaturedRecipeTable({ recipe }) {
    return (
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">

            <Image
            width={200}
            height={200}
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                className="w-full h-56 object-cover"
            />

            <div className="p-5">

                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {recipe.category}
                </span>

                <h3 className="text-xl font-bold mt-4">
                    {recipe.recipeName}
                </h3>

                <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
                    <span className="flex items-center gap-1">
                        <FaGlobe />
                        {recipe.cuisineType}
                    </span>

                    <span className="flex items-center gap-1">
                        <FaClock />
                        {recipe.preparationTime}
                    </span>
                </div>

                <Link
                    href={`/recipes/${recipe._id}`}
                    className="mt-5 inline-block w-full text-center bg-orange-500 text-white py-2 rounded-xl"
                >
                    View Recipe
                </Link>
            </div>
        </div>
    );
}