"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUtensils } from "react-icons/fa";
import FeaturedRecipeTable from "./FeaturedRecipeTable";

export default function FeaturedRecipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/featured-recipes")
            .then(res => res.json())
            .then(data => setRecipes(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">
            {/* Ambient Deep Glow Elements */}
            <div className="absolute top-12 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-12 -right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Content with Smooth Animation */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16 relative z-10"
            >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black tracking-widest font-mono border border-orange-500/10 mb-4 uppercase">
                    <FaUtensils className="text-xs" /> Chef's Selection
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent tracking-tight">
                    Featured Recipes
                </h2>

                <p className="text-gray-500 max-w-md mx-auto mt-3 font-medium text-sm md:text-base leading-relaxed">
                    Discover our hand-picked premium culinary masterpieces, curated just for you.
                </p>
            </motion.div>

            {/* Animated Grid for Recipe Cards */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
            >
                {recipes.map((recipe, index) => (
                    <motion.div
                        key={recipe._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <FeaturedRecipeTable recipe={recipe} />
                    </motion.div>
                ))}
            </motion.div>

            {recipes.length === 0 && (
                <div className="text-center py-12 text-gray-400 font-mono text-sm relative z-10">
                    No culinary masterpieces featured at the moment.
                </div>
            )}
        </section>
    );
}