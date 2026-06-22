

"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";

import {
    FaUtensils,
    FaImage,
    FaTag,
    FaGlobe,
    FaTachometerAlt,
    FaClock,
    FaListUl,
    FaBookOpen,
} from "react-icons/fa";


function FieldLabel({ icon: Icon, label, required }) {
    return (
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white">
                <Icon size={11} />
            </span>
            {label}
            {required && (
                <span className="text-orange-500 text-xs">*</span>
            )}
        </label>
    );
}

const inputBase =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-orange-400";

const selectBase =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-orange-400";

export default function EditModal({ recipe, onUpdate }) {
    const [imagePreview, setImagePreview] =
        useState(recipe?.recipeImage);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImagePreview(
                URL.createObjectURL(file)
            );
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;

        let imageURL =
            recipe.recipeImage;

        console.log(imageURL)

        const imageFile =
            form.image.files[0];

        if (imageFile) {
            const formData =
                new FormData();

            formData.append(
                "image",
                imageFile
            );

            const upload =
                await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

            const imageData =
                await upload.json();

            imageURL =
                imageData.data.url;
        }

        const updatedRecipe = {
            recipeName:
                form.recipeName.value,

            recipeImage:
                imageURL,

            category:
                form.category.value,

            cuisineType:
                form.cuisineType.value,

            difficultyLevel:
                form.difficultyLevel.value,

            preparationTime:
                form.preparationTime.value,

            ingredients:
                form.ingredients.value,

            instructions:
                form.instructions.value,

            updatedAt:
                new Date(),
        };

        console.log(updatedRecipe)

        const res = await fetch(
            `http://localhost:5000/recipes/${recipe._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(
                    updatedRecipe
                ),
            }
        );

        const data =
            await res.json();


        if (data.modifiedCount > 0) {

            const updatedRecipeWithId = {
                ...updatedRecipe,
                _id: recipe._id,
            };

            onUpdate(updatedRecipeWithId);

            toast.success(
                "Recipe Updated Successfully"
            );
        }
    };

    return (
        <Modal>
            <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-orange-200 bg-transparent text-orange-600 text-xs font-semibold hover:bg-orange-50 transition-colors"
            >
                ✏️ Edit
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-3xl">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>
                                Update Recipe
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body>
                            <Surface variant="default">
                                <form
                                    id="updateForm"
                                    onSubmit={
                                        handleUpdate
                                    }
                                    className="space-y-5"
                                >
                                    <div>
                                        <FieldLabel
                                            icon={FaUtensils}
                                            label="Recipe Name"
                                        />

                                        <input
                                            type="text"
                                            name="recipeName"
                                            defaultValue={
                                                recipe?.recipeName
                                            }
                                            className={
                                                inputBase
                                            }
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel icon={FaTag} label="Category" />
                                        <div className="relative">
                                            <select name="category" className={selectBase} defaultValue={recipe?.category}>
                                                <option value="Main Course"> Main Course</option>
                                                <option value="Fast Food">Fast Food</option>
                                                <option value="Snack">Snack</option>
                                                <option value="Dinner">Healthy</option>
                                                <option value="Street Food">Street Food</option>
                                                <option value="Beverage">Beverage</option>
                                                <option value="Dessert">Dessert</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div>
                                        <FieldLabel
                                            icon={FaGlobe}
                                            label="Cuisine Type"
                                        />

                                        <input
                                            type="text"
                                            name="cuisineType"
                                            defaultValue={
                                                recipe?.cuisineType
                                            }
                                            className={
                                                inputBase
                                            }
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel
                                            icon={
                                                FaTachometerAlt
                                            }
                                            label="Difficulty"
                                        />

                                        <select
                                            name="difficultyLevel"
                                            defaultValue={
                                                recipe?.difficultyLevel
                                            }
                                            className={
                                                selectBase
                                            }
                                        >
                                            <option>
                                                Easy
                                            </option>
                                            <option>
                                                Medium
                                            </option>
                                            <option>
                                                Hard
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <FieldLabel
                                            icon={FaClock}
                                            label="Preparation Time"
                                        />

                                        <input
                                            type="text"
                                            name="preparationTime"
                                            defaultValue={
                                                recipe?.preparationTime
                                            }
                                            className={
                                                inputBase
                                            }
                                        />
                                    </div>

                                    <div className="pb-6">
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

                                    <div>
                                        <FieldLabel
                                            icon={FaListUl}
                                            label="Ingredients"
                                        />

                                        <textarea
                                            rows={5}
                                            name="ingredients"
                                            defaultValue={
                                                recipe?.ingredients
                                            }
                                            className={`${inputBase} resize-none`}
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel
                                            icon={FaBookOpen}
                                            label="Instructions"
                                        />

                                        <textarea
                                            rows={6}
                                            name="instructions"
                                            defaultValue={
                                                recipe?.instructions
                                            }
                                            className={`${inputBase} resize-none`}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        form="updateForm"
                                        slot="close"
                                        className={"bg-orange-500 w-full"}
                                    >
                                        Update Recipe
                                    </Button>
                                </form>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer>



                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}