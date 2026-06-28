"use client";

import { useSession } from "@/lib/auth-client";
import { Flag, X, AlertTriangle, ShieldAlert, Ban } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";

export default function ReportModal({ recipe }) {
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { data: session } = useSession();

   
    const reportOptions = [
        { id: "Spam", label: "Spam", icon: Ban, description: "Misleading, repetitive, or promotional content." },
        { id: "Offensive Content", label: "Offensive Content", icon: AlertTriangle, description: "Contains inappropriate language or imagery." },
        { id: "Copyright Issue", label: "Copyright Issue", icon: ShieldAlert, description: "Intellectual property theft or copied recipe." }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reason) {
            toast.error("Please select a reason");
            return;
        }

        setSubmitting(true);

        const reportData = {
            recipeId: recipe._id,
            recipeName: recipe.recipeName,
            authorEmail: recipe.authorEmail,
            reporterEmail: session?.user?.email,
            reason,
            status: "pending",
            createdAt: new Date(),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/reports`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reportData),
            });

            const data = await res.json();

            if (data.insertedId) {
                toast.success("Report Submitted successfully");
                setReason("");
                setOpen(false);
            } else if (data.message) {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-transparent hover:bg-red-50/50 text-gray-400 hover:text-red-500 font-semibold text-sm border border-gray-200 hover:border-red-200 transition-all duration-300 transform active:scale-[0.98]"
            >
                <Flag className="w-4 h-4 transition-transform group-hover:scale-110" />
                Report Recipe
            </button>

            {/* Modal using Framer Motion AnimatePresence for smooth unmounting */}
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                        {/* Backdrop Fade Effect */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        {/* Modal Box Scale Effect */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            className="relative bg-white p-6 rounded-3xl w-full max-w-md shadow-2xl z-10 border border-gray-100 overflow-hidden"
                        >
                            {/* Close Cross Icon */}
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                Report Recipe
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Help us understand what's wrong with this recipe.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-6">
                                {/* Custom Smooth Radio/Select Option List */}
                                <div className="space-y-3">
                                    {reportOptions.map((option) => {
                                        const Icon = option.icon;
                                        const isSelected = reason === option.id;

                                        return (
                                            <label
                                                key={option.id}
                                                className={`
                                                    flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200
                                                    ${isSelected
                                                        ? "border-red-500 bg-red-50/40 shadow-sm"
                                                        : "border-gray-100 hover:border-gray-300 bg-gray-50/50 hover:bg-gray-50"
                                                    }
                                                `}
                                            >
                                                {/* Hidden Native Input */}
                                                <input
                                                    type="radio"
                                                    name="reportReason"
                                                    value={option.id}
                                                    checked={isSelected}
                                                    onChange={(e) => setReason(e.target.value)}
                                                    className="sr-only" // visually hidden, screen reader active
                                                />

                                                {/* Left Icon with color flip */}
                                                <div className={`p-2 rounded-lg transition-colors ${isSelected ? "bg-red-500 text-white" : "bg-white text-gray-400 border border-gray-100"}`}>
                                                    <Icon className="w-4 h-4" />
                                                </div>

                                                {/* Labels */}
                                                <div className="flex-1">
                                                    <div className={`font-semibold text-sm transition-colors ${isSelected ? "text-red-700" : "text-gray-800"}`}>
                                                        {option.label}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                                        {option.description}
                                                    </div>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>

                                {/* Form Action Buttons */}
                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-semibold py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 transform active:scale-[0.98] cursor-pointer"
                                    >
                                        {submitting ? "Submitting..." : "Submit Report"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 font-medium text-gray-700 rounded-xl transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}