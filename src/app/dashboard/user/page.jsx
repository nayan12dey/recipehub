"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { FaUtensils, FaHeart, FaThumbsUp, FaChartLine } from "react-icons/fa";

export default function DashboardOverview() {
    const { data: session } = useSession();
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user?.email) return;

        setLoading(true);
        fetch(`http://localhost:5000/dashboard/${session.user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [session?.user?.email]);

    const statCards = [
        {
            id: "total-recipes",
            label: "Total Recipes",
            value: stats.totalRecipes ?? 0,
            icon: FaUtensils,
            gradient: "from-orange-500 to-red-500",
            bgLight: "bg-orange-50",
            borderColor: "border-orange-100",
            iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
            textColor: "text-orange-600",
            shadowColor: "shadow-orange-100",
            badgeText: "Recipes Created",
            badgeColor: "text-orange-400",
        },
        {
            id: "total-favorites",
            label: "Total Favorites",
            value: stats.totalFavorites ?? 0,
            icon: FaHeart,
            gradient: "from-rose-500 to-pink-500",
            bgLight: "bg-rose-50",
            borderColor: "border-rose-100",
            iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
            textColor: "text-rose-600",
            shadowColor: "shadow-rose-100",
            badgeText: "Saved Recipes",
            badgeColor: "text-rose-400",
        },
        {
            id: "total-likes",
            label: "Likes Received",
            value: stats.totalLikes ?? 0,
            icon: FaThumbsUp,
            gradient: "from-amber-500 to-orange-500",
            bgLight: "bg-amber-50",
            borderColor: "border-amber-100",
            iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
            textColor: "text-amber-600",
            shadowColor: "shadow-amber-100",
            badgeText: "Community Appreciation",
            badgeColor: "text-amber-400",
        },
    ];

    const firstName = session?.user?.name?.split(" ")[0] || "Chef";

    return (
        <div className="min-h-full">
            {/* ── Page Header ── */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-sm shadow-orange-200">
                        <FaChartLine size={14} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        Dashboard Overview
                    </h1>
                </div>
                <p className="text-gray-400 text-sm ml-11">
                    Welcome back,{" "}
                    <span className="font-semibold text-orange-500">{firstName}</span>!
                    Here&apos;s a snapshot of your activity.
                </p>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {statCards.map(
                    ({
                        id,
                        label,
                        value,
                        icon: Icon,
                        gradient,
                        bgLight,
                        borderColor,
                        iconBg,
                        textColor,
                        shadowColor,
                        badgeText,
                        badgeColor,
                    }) => (
                        <div
                            id={id}
                            key={id}
                            className={`relative rounded-2xl border ${borderColor} ${bgLight} p-6 shadow-md ${shadowColor} overflow-hidden group transition-transform duration-200 hover:-translate-y-1`}
                        >
                            {/* Decorative circles */}
                            <div
                                className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${gradient} opacity-10`}
                            />
                            <div
                                className={`absolute -bottom-8 -left-4 w-20 h-20 rounded-full bg-gradient-to-br ${gradient} opacity-10`}
                            />

                            {/* Icon */}
                            <div
                                className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4 shadow-sm`}
                            >
                                <Icon size={20} className="text-white" />
                            </div>

                            {/* Value */}
                            {loading ? (
                                <div className="h-10 w-20 rounded-lg bg-gray-200 animate-pulse mb-1" />
                            ) : (
                                <p className={`text-4xl font-extrabold ${textColor} leading-none mb-1 tabular-nums`}>
                                    {value.toLocaleString()}
                                </p>
                            )}

                            {/* Label */}
                            <p className="text-gray-700 font-semibold text-sm">{label}</p>

                            {/* Badge */}
                            <p className={`text-[11px] font-medium mt-1 ${badgeColor}`}>
                                {badgeText}
                            </p>
                        </div>
                    )
                )}
            </div>

            {/* ── Activity Summary Banner ── */}
            <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-6 shadow-lg shadow-orange-200 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-white font-bold text-lg leading-tight">
                            Keep Cooking! 🍳
                        </h2>
                        <p className="text-orange-100 text-sm mt-1 max-w-sm">
                            You&apos;ve created{" "}
                            <span className="font-bold text-white">
                                {stats.totalRecipes ?? 0}
                            </span>{" "}
                            recipe
                            {(stats.totalRecipes ?? 0) !== 1 ? "s" : ""} and received{" "}
                            <span className="font-bold text-white">
                                {stats.totalLikes ?? 0}
                            </span>{" "}
                            like
                            {(stats.totalLikes ?? 0) !== 1 ? "s" : ""} from the community.
                        </p>
                    </div>
                    <a
                        href="/dashboard/user/add-recipe"
                        className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-orange-600 text-sm font-bold hover:bg-orange-50 transition-colors duration-200 shadow-sm"
                    >
                        <FaUtensils size={13} />
                        Add New Recipe
                    </a>
                </div>
            </div>
        </div>
    );
}