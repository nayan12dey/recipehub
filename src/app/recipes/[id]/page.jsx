import Image from "next/image";
import Link from "next/link";
import {
    Clock,
    ChefHat,
    Utensils,
    Heart,
    ShoppingBag,
    Flag,
    Star,
    ArrowLeft,
    Users,
    Flame,
    BookOpen,
} from "lucide-react";
import LikeAction from "@/components/LikeAction";
import FavoriteAction from "@/components/FavoriteAction";

export default async function RecipeDetails({ params }) {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/recipes/${id}`, {
        cache: "no-store",
    });



    const recipe = await res.json();

    const difficultyColor = {
        Easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
        Medium: "bg-amber-100 text-amber-700 border-amber-200",
        Hard: "bg-red-100 text-red-700 border-red-200",
    };

    const difficultyDot = {
        Easy: "bg-emerald-500",
        Medium: "bg-amber-500",
        Hard: "bg-red-500",
    };

    const difficultyClass =
        difficultyColor[recipe.difficultyLevel] ||
        "bg-gray-100 text-gray-700 border-gray-200";
    const dotClass = difficultyDot[recipe.difficultyLevel] || "bg-gray-500";

    // Parse ingredients and instructions into arrays if they are strings
    const ingredients = Array.isArray(recipe.ingredients)
        ? recipe.ingredients
        : typeof recipe.ingredients === "string"
            ? recipe.ingredients.split(/\n|,/).map((s) => s.trim()).filter(Boolean)
            : [];

    const instructions = Array.isArray(recipe.instructions)
        ? recipe.instructions
        : typeof recipe.instructions === "string"
            ? recipe.instructions.split(/\n|\d+\./).map((s) => s.trim()).filter(Boolean)
            : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">

            {/* ── HERO SECTION ── */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden">

                {/* Hero Image */}
                <Image
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                {/* Back Button */}
                <div className="absolute top-6 left-6 z-10">
                    <Link
                        href="/recipes"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-medium hover:bg-white/25 transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Recipes
                    </Link>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
                    <div className="max-w-5xl mx-auto">

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {recipe.category && (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/90 text-white backdrop-blur-sm">
                                    {recipe.category}
                                </span>
                            )}
                            {recipe.cuisineType && (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                                    🌍 {recipe.cuisineType}
                                </span>
                            )}
                            {recipe.difficultyLevel && (
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyClass} backdrop-blur-sm`}>
                                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotClass} mr-1.5`} />
                                    {recipe.difficultyLevel}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
                            {recipe.recipeName}
                        </h1>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap items-center gap-4 text-white/90">
                            {recipe.preparationTime && (
                                <div className="flex items-center gap-1.5 text-sm font-medium">
                                    <Clock className="w-4 h-4 text-orange-300" />
                                    <span>{recipe.preparationTime}</span>
                                </div>
                            )}
                            {recipe.authorName && (
                                <div className="flex items-center gap-1.5 text-sm font-medium">
                                    <ChefHat className="w-4 h-4 text-orange-300" />
                                    <span>by {recipe.authorName}</span>
                                </div>
                            )}
                            {recipe.likesCount !== undefined && (
                                <div className="flex items-center gap-1.5 text-sm font-medium">
                                    <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                                    <span>{recipe.likesCount} likes</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/*  LEFT: Ingredients + Instructions  */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Ingredients Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
                            <div className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-orange-500 to-red-500">
                                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Utensils className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Ingredients</h2>
                            </div>

                            <div className="p-6">
                                {ingredients.length > 0 ? (
                                    <ul className="space-y-3">
                                        {ingredients.map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 group"
                                            >
                                                <span className="mt-0.5 w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-700 leading-relaxed">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic">{recipe.ingredients}</p>
                                )}
                            </div>
                        </div>

                        {/* Instructions Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
                            <div className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-red-500 to-orange-500">
                                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Instructions</h2>
                            </div>

                            <div className="p-6">
                                {instructions.length > 0 ? (
                                    <ol className="space-y-5">
                                        {instructions.map((step, index) => (
                                            <li key={index} className="flex gap-4 group">
                                                <div className="flex-shrink-0">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white text-sm font-bold flex items-center justify-center shadow-md">
                                                        {index + 1}
                                                    </div>
                                                    {index < instructions.length - 1 && (
                                                        <div className="w-0.5 h-full ml-4 mt-2 bg-gradient-to-b from-orange-200 to-transparent" />
                                                    )}
                                                </div>
                                                <div className="pb-5">
                                                    <p className="text-gray-700 leading-relaxed">{step}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {recipe.instructions}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/*  RIGHT: Info + Actions */}
                    <div className="space-y-6">

                        {/* Recipe Info Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                                Recipe Info
                            </h3>

                            {recipe.preparationTime && (
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-orange-50 hover:bg-orange-100 transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Prep Time</p>
                                        <p className="text-sm font-bold text-gray-800">{recipe.preparationTime}</p>
                                    </div>
                                </div>
                            )}

                            {recipe.difficultyLevel && (
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-red-50 hover:bg-red-100 transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Flame className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Difficulty</p>
                                        <p className="text-sm font-bold text-gray-800">{recipe.difficultyLevel}</p>
                                    </div>
                                </div>
                            )}

                            {recipe.cuisineType && (
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Utensils className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Cuisine</p>
                                        <p className="text-sm font-bold text-gray-800">{recipe.cuisineType}</p>
                                    </div>
                                </div>
                            )}

                            {recipe.category && (
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Star className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Category</p>
                                        <p className="text-sm font-bold text-gray-800">{recipe.category}</p>
                                    </div>
                                </div>
                            )}

                            {recipe.authorName && (
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-gray-700 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <ChefHat className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Chef</p>
                                        <p className="text-sm font-bold text-gray-800">{recipe.authorName}</p>
                                    </div>
                                </div>
                            )}

                            {recipe.likesCount !== undefined && (
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-pink-50 hover:bg-pink-100 transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Community Likes</p>
                                        <p className="text-sm font-bold text-gray-800">{recipe.likesCount}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 space-y-3">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                                Actions
                            </h3>

                            {/* Purchase Recipe */}

                            <form action={`/api/recipe_checkout?recipeId=${recipe._id}`} method="POST">
                                <section>
                                    <button type="submit" role="link" className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:from-orange-600 hover:to-red-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                                        <ShoppingBag className="w-4 h-4" />
                                        Purchase Recipe
                                    </button>
                                </section>
                            </form>


                            {/* <button className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:from-orange-600 hover:to-red-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                                <ShoppingBag className="w-4 h-4" />
                                Purchase Recipe
                            </button> */}

                            {/* Like */}
                            <LikeAction recipeId={recipe._id} ></LikeAction>

                            {/* Add Favourite */}
                            <FavoriteAction recipe={recipe}></FavoriteAction>

                            {/* <button className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold text-sm border border-amber-200 hover:border-amber-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                                <Star className="w-4 h-4" />
                                Add to Favourites
                            </button> */}

                            {/* Report */}
                            <button className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-transparent hover:bg-red-50 text-gray-400 hover:text-red-500 font-medium text-sm border border-gray-200 hover:border-red-200 transition-all duration-200">
                                <Flag className="w-4 h-4" />
                                Report Recipe
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}