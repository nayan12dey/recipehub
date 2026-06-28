"use client";

import { useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
    FaUtensils,
    FaImage,
    FaTag,
    FaGlobe,
    FaTachometerAlt,
    FaClock,
    FaListUl,
    FaBookOpen,
    FaPlus,
} from "react-icons/fa";
import Loader from "@/components/Loader";

/* ── tiny field-wrapper helpers ── */
function FieldLabel({ icon: Icon, label, required }) {
    return (
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shrink-0">
                <Icon size={11} />
            </span>
            {label}
            {required && <span className="text-orange-500 text-xs">*</span>}
        </label>
    );
}

const inputBase =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm text-gray-800 text-sm placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all duration-200 " +
    "hover:border-orange-300";

const selectBase =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm text-gray-800 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all duration-200 " +
    "hover:border-orange-300 cursor-pointer appearance-none";

export default function AddRecipePage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);


    if (loading) {
        return <Loader />;
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const imageFile = form.image.files[0];

        const formData = new FormData();
        formData.append("image", imageFile);

        const imageUpload = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
            { method: "POST", body: formData }
        );

        const imageData = await imageUpload.json();

        const recipe = {
            recipeName: form.recipeName.value,
            recipeImage: imageData.data.url,
            category: form.category.value,
            cuisineType: form.cuisineType.value,
            difficultyLevel: form.difficultyLevel.value,
            preparationTime: form.preparationTime.value,
            ingredients: form.ingredients.value,
            instructions: form.instructions.value,
            authorName: session?.user?.name,
            authorEmail: session?.user?.email,
            likesCount: 0,
            isFeatured: false,
            status: "approved",
            createdAt: new Date(),
        };

        console.log(recipe)

        const { data: token } = await authClient.token()
        console.log(token.token)  

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token?.token}`
            },
            body: JSON.stringify(recipe),
        });

        const data = await res.json();

        if (data.insertedId) {
            toast.success("Recipe added successfully!");
            form.reset();
            setImagePreview(null);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50/60 dark:bg-gray-900 py-8 px-4 sm:px-6">

            {/* Page header */}
            <div className="max-w-3xl mx-auto mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md shadow-orange-200">
                        <FaPlus className="text-white" size={16} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white leading-tight">
                            Add New Recipe
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Share your culinary creation with the community
                        </p>
                    </div>
                </div>

                {/* Decorative gradient line */}
                <div className="mt-4 h-px w-full bg-gradient-to-r from-orange-400 via-red-400 to-transparent rounded-full" />
            </div>

            {/* Card */}
            <div className="max-w-3xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/80 dark:bg-gray-800 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-sm shadow-gray-200 overflow-hidden"
                >

                    {/* ── Section 1 : Basic Info ── */}
                    <SectionHeader title="Basic Information" />
                    <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-5">

                        {/* Recipe Name */}
                        <div className="sm:col-span-2">
                            <FieldLabel icon={FaUtensils} label="Recipe Name" required />
                            <input
                                type="text"
                                name="recipeName"
                                placeholder="e.g. Classic Margherita Pizza"
                                className={inputBase}
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <FieldLabel icon={FaTag} label="Category" />
                            <div className="relative">
                                <select name="category" className={selectBase}>
                                    <option value="Main Course"> Main Course</option>
                                    <option value="Fast Food">Fast Food</option>
                                    <option value="Snack">Snack</option>
                                    <option value="Dinner">Healthy</option>
                                    <option value="Street Food">Street Food</option>
                                    <option value="Beverage">Beverage</option>
                                    <option value="Dessert">Dessert</option>
                                </select>
                                <ChevronIcon />
                            </div>
                        </div>

                        {/* Cuisine Type */}
                        <div>
                            <FieldLabel icon={FaGlobe} label="Cuisine Type" required />
                            <input
                                type="text"
                                name="cuisineType"
                                placeholder="e.g. Italian, Indian, Mexican"
                                className={inputBase}
                                required
                            />
                        </div>

                        {/* Difficulty */}
                        <div>
                            <FieldLabel icon={FaTachometerAlt} label="Difficulty Level" />
                            <div className="relative">
                                <select name="difficultyLevel" className={selectBase}>
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                                <ChevronIcon />
                            </div>
                        </div>

                        {/* Prep Time */}
                        <div>
                            <FieldLabel icon={FaClock} label="Preparation Time" required />
                            <input
                                type="text"
                                name="preparationTime"
                                placeholder="e.g. 30 minutes"
                                className={inputBase}
                                required
                            />
                        </div>
                    </div>



                    {/* ── Section 2 : Image Upload ── */}
                    <SectionHeader title="Recipe Photo" />
                    <div className="px-6 pb-6">
                        <FieldLabel icon={FaImage} label="Upload Image" required />

                        <label
                            htmlFor="recipeImageInput"
                            className={`
                                relative flex flex-col items-center justify-center
                                w-full rounded-2xl border-2 border-dashed cursor-pointer
                                transition-all duration-200 overflow-hidden
                                ${imagePreview
                                    ? "border-orange-400 bg-orange-50/40 h-56"
                                    : "border-gray-200 bg-gray-50/60 hover:border-orange-400 hover:bg-orange-50/30 h-40"
                                }
                            `}
                        >
                            {imagePreview ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-center py-6 px-4">
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-orange-100 flex items-center justify-center">
                                        <FaImage className="text-orange-500" size={20} />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        Click to upload a photo
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        PNG, JPG, WEBP up to 10 MB
                                    </p>
                                </div>
                            )}
                        </label>

                        <input
                            id="recipeImageInput"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            required
                        />

                        {imagePreview && (
                            <button
                                type="button"
                                onClick={() => setImagePreview(null)}
                                className="mt-2 text-xs text-red-400 hover:text-red-600 transition-colors"
                            >
                                ✕ Remove image
                            </button>
                        )}
                    </div>



                    {/* ── Section 3 : Recipe Details ── */}
                    <SectionHeader title="Recipe Details" />
                    <div className="px-6 pb-6 space-y-5">

                        {/* Ingredients */}
                        <div>
                            <FieldLabel icon={FaListUl} label="Ingredients" />
                            <textarea
                                name="ingredients"
                                placeholder={`List each ingredient on a new line:\n• 2 cups flour\n• 1 tsp salt\n• 3 tbsp olive oil`}
                                className={`${inputBase} resize-none leading-relaxed`}
                                rows={5}
                            />
                            <p className="text-[11px] text-gray-400 mt-1.5 pl-1">
                                Tip: One ingredient per line for best readability.
                            </p>
                        </div>

                        {/* Instructions */}
                        <div>
                            <FieldLabel icon={FaBookOpen} label="Instructions" />
                            <textarea
                                name="instructions"
                                placeholder={`Step-by-step instructions:\n1. Preheat oven to 220°C\n2. Mix dry ingredients\n3. Add wet ingredients and stir`}
                                className={`${inputBase} resize-none leading-relaxed`}
                                rows={7}
                            />
                            <p className="text-[11px] text-gray-400 mt-1.5 pl-1">
                                Tip: Number each step for clarity.
                            </p>
                        </div>
                    </div>

                    {/* ── Submit ── */}
                    <div className="px-6 py-5 bg-gray-50/80 border-t border-gray-100">
                        <button
                            type="submit"

                            className="
                                w-full py-3.5 rounded-2xl
                                bg-gradient-to-r from-orange-500 to-red-500
                                text-white font-bold text-sm tracking-wide
                                shadow-md shadow-orange-200
                                hover:shadow-lg hover:shadow-orange-300
                                active:scale-[0.99]
                                disabled:opacity-60 disabled:cursor-not-allowed
                                transition-all duration-200
                                flex items-center justify-center gap-2.5
                            "
                        >
                            <FaPlus size={13} />
                            Publish Recipe
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-3">
                            Your recipe will be visible to the community after submission.
                        </p>
                    </div>

                </form>
            </div>
        </div>

        

        
    );
}

/* ── Small shared sub-components ── */

function SectionHeader({ emoji, title }) {
    return (
        <div className="px-6 pt-6 pb-4 flex items-center gap-2.5">
            <span className="text-lg">{emoji}</span>
            <h2 className="text-base font-bold text-gray-800">{title}</h2>
        </div>
    );
}


function ChevronIcon() {
    return (
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </span>
    );
}