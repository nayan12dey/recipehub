"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import PopularRecipeCard from "./PopularRecipeCard";
import Loader from "./Loader";

export default function PopularRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/popular-recipes`)
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        // <section className="relative overflow-hidden py-24 bg-gradient-to-b from-orange-50 via-white to-orange-50">

        //     {/* Background Blobs */}
        //     <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full bg-red-300/20 blur-3xl pointer-events-none" />
        //     <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />

        //     <div className="relative z-10 max-w-7xl mx-auto px-6">

        //         {/* Header */}
        //         <motion.div
        //             initial={{ opacity: 0, y: -20 }}
        //             whileInView={{ opacity: 1, y: 0 }}
        //             viewport={{ once: true }}
        //             transition={{ duration: 0.5 }}
        //             className="text-center max-w-3xl mx-auto"
        //         >
        //             <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
        //                 <FaFire size={14} />
        //                 Trending Now
        //             </span>

        //             <h2 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
        //                 Popular Recipes
        //             </h2>

        //             <p className="mt-5 max-w-xl mx-auto text-lg leading-relaxed text-gray-600">
        //                 Most loved recipes by our community.
        //             </p>
        //         </motion.div>

        //         {/* Loading State */}
        //         {loading && (
        //             <div className="mt-16 text-center text-gray-500 font-medium">
        //                 Loading popular masterpieces...
        //             </div>
        //         )}

        //         {/* Grid with Framer Motion Cards */}
        //         {!loading && recipes.length > 0 && (
        //             <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        //                 {recipes.map((recipe, index) => (
        //                     <motion.div
        //                         key={recipe._id}
        //                         initial={{ opacity: 0, y: 25 }}
        //                         whileInView={{ opacity: 1, y: 0 }}
        //                         viewport={{ once: true }}
        //                         transition={{
        //                             duration: 0.35,
        //                             delay: index * 0.05,
        //                         }}
        //                         whileHover={{
        //                             y: -8,
        //                             scale: 1.02,
        //                             transition: {
        //                                 duration: 0.2,
        //                                 ease: "easeOut",
        //                             },
        //                         }}
        //                         className="
        //                             group
        //                             rounded-2xl
        //                             border
        //                             border-white/50
        //                             bg-white/80
        //                             backdrop-blur-md
        //                             p-6
        //                             shadow-md
        //                             transform-gpu
        //                             will-change-transform
        //                         "
        //                     >
        //                         <PopularRecipeCard recipe={recipe} />
        //                     </motion.div>
        //                 ))}
        //             </div>
        //         )}

        //         {/* Empty State */}
        //         {!loading && recipes.length === 0 && (
        //             <div className="mt-16 rounded-2xl border border-dashed border-red-200 bg-white/60 py-14 text-center text-gray-500">
        //                 <p className="font-medium">No popular recipes found at the moment</p>
        //                 <p className="text-sm mt-2">Check back later for trending dishes 🔥</p>
        //             </div>
        //         )}
        //     </div>
        // </section>

        <section className="relative overflow-hidden py-24 bg-gradient-to-b from-orange-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-colors duration-300">

            {/* Background Blobs */}
            <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full bg-red-300/20 dark:bg-red-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-orange-300/20 dark:bg-orange-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 dark:bg-orange-950/50 px-4 py-2 text-sm font-medium text-orange-600 dark:text-orange-400">
                        <FaFire size={14} />
                        Trending Now
                    </span>

                    <h2 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
                        Popular Recipes
                    </h2>

                    <p className="mt-5 max-w-xl mx-auto text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                        Most loved recipes by our community.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="mt-16 text-center text-gray-500 dark:text-gray-400 font-medium animate-pulse">
                        Loading popular masterpieces...
                    </div>
                )}

                {/* Grid with Framer Motion Cards */}
                {!loading && recipes.length > 0 && (
                    <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {recipes.map((recipe, index) => (
                            <motion.div
                                key={recipe._id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.35,
                                    delay: index * 0.05,
                                }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    transition: {
                                        duration: 0.2,
                                        ease: "easeOut",
                                    },
                                }}
                                className="
                            group
                            rounded-2xl
                            border
                            border-white/50 dark:border-gray-800/60
                            bg-white/80 dark:bg-gray-900/80
                            backdrop-blur-md
                            p-6
                            shadow-md dark:shadow-black/30
                            transform-gpu
                            will-change-transform
                            transition-colors duration-300
                        "
                            >
                                <PopularRecipeCard recipe={recipe} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && recipes.length === 0 && (
                    <div className="mt-16 rounded-2xl border border-dashed border-red-200 dark:border-red-900/60 bg-white/60 dark:bg-gray-900/40 py-14 text-center text-gray-500 dark:text-gray-400">
                        <p className="font-medium">No popular recipes found at the moment</p>
                        <p className="text-sm mt-2 text-gray-400 dark:text-gray-500">Check back later for trending dishes 🔥</p>
                    </div>
                )}
            </div>
        </section>
    );
}