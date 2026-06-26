"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, AlertCircle } from "lucide-react";
import ReportsTable from "@/components/ReportsTable";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function ReportsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/reports")
            .then((res) => res.json())
            .then((data) => {
                setReports(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Dismiss Report
    const handleDismiss = async (id) => {
        const res = await fetch(
            `http://localhost:5000/reports/dismiss/${id}`,
            {
                method: "PATCH",
            }
        );

        const data = await res.json();

        if (data.modifiedCount > 0) {
            toast.success("Report dismissed");

            setReports((prev) =>
                prev.map((report) =>
                    report._id === id
                        ? {
                            ...report,
                            status: "dismissed",
                        }
                        : report
                )
            );
        }
    };

    // Remove Recipe
    const handleRemoveRecipe = async (
        recipeId,
        reportId
    ) => {



        await fetch(
            `http://localhost:5000/recipes/${recipeId}`,
            {
                method: "DELETE",
            }
        );

        await fetch(
            `http://localhost:5000/reports/resolve/${reportId}`,
            {
                method: "PATCH",
            }
        );

        toast.success("Recipe removed");

        setReports((prev) =>
            prev.map((report) =>
                report._id === reportId
                    ? {
                        ...report,
                        status: "resolved",
                    }
                    : report
            )
        );
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="relative min-h-screen overflow-hidden py-12 bg-gradient-to-b from-gray-50 via-white to-gray-50">

            <div className="absolute top-[-100px] right-[-100px] w-96 h-96 rounded-full bg-red-100/40 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-100 pb-8"
                >
                    <div>
                        <div className="flex items-center gap-2 text-red-600 font-semibold text-sm bg-red-50 px-3 py-1 rounded-full w-fit">
                            <ShieldAlert className="w-4 h-4" />
                            Admin Moderation
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
                            Recipe Reports
                        </h1>

                        <p className="text-gray-500 text-sm mt-1">
                            Review and manage user flags on submitted recipes.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm backdrop-blur-md">
                        <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                            <AlertCircle className="w-5 h-5" />
                        </div>

                        <div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Flags
                            </div>

                            <div className="text-2xl font-bold text-gray-900">
                                {loading ? "..." : reports.length}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mt-10 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden"
                >
                    {loading ? (
                        <div className="py-20 text-center text-gray-500 font-medium">
                            Fetching active reports...
                        </div>
                    ) : reports.length > 0 ? (
                        <ReportsTable
                            reports={reports}
                            handleDismiss={handleDismiss}
                            handleRemoveRecipe={handleRemoveRecipe}
                        />
                    ) : (
                        <div className="py-16 text-center text-gray-500 font-medium bg-gray-50/30">
                            No active reports found. All clear!
                        </div>
                    )}
                </motion.div>

            </div>
        </main>
    );
}