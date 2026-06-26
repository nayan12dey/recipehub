"use client";

import Loader from "@/components/Loader";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
    FaUsers,
    FaUtensils,
    FaCrown,
    FaFlag,
    FaChartLine,
} from "react-icons/fa";

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/admin-overview")
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const statCards = [
        {
            id: "total-users",
            label: "Total Users",
            value: stats.totalUsers ?? 0,
            icon: FaUsers,
            gradient: "from-blue-500 to-indigo-500",
            bgLight: "bg-blue-50",
            borderColor: "border-blue-100",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
            textColor: "text-blue-600",
            shadowColor: "shadow-blue-100",
            badgeText: "Registered Accounts",
            badgeColor: "text-blue-400",
        },
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
            badgeText: "Community Content",
            badgeColor: "text-orange-400",
        },
        {
            id: "premium-members",
            label: "Premium Members",
            value: stats.totalPremiumMembers ?? 0,
            icon: FaCrown,
            gradient: "from-amber-500 to-orange-500",
            bgLight: "bg-amber-50",
            borderColor: "border-amber-100",
            iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
            textColor: "text-amber-600",
            shadowColor: "shadow-amber-100",
            badgeText: "Active Subscriptions",
            badgeColor: "text-amber-400",
        },
        {
            id: "total-reports",
            label: "Total Reports",
            value: stats.totalReports ?? 0,
            icon: FaFlag,
            gradient: "from-rose-500 to-pink-500",
            bgLight: "bg-rose-50",
            borderColor: "border-rose-100",
            iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
            textColor: "text-rose-600",
            shadowColor: "shadow-rose-100",
            badgeText: "Flagged Content",
            badgeColor: "text-rose-400",
        },
    ];

    const firstName = session?.user?.name?.split(" ")[0] || "Admin";

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-full">
            {/* ── Page Header ── */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-sm shadow-indigo-200">
                        <FaChartLine size={14} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        Admin Overview
                    </h1>
                </div>
                <p className="text-gray-400 text-sm ml-11">
                    Welcome back,{" "}
                    <span className="font-semibold text-indigo-500">{firstName}</span>!
                    Here&apos;s a live snapshot of the platform metrics.
                </p>
            </div>

            {/* ── Stat Cards Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
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

                            {/* Icon Wrapper */}
                            <div
                                className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4 shadow-sm`}
                            >
                                <Icon size={20} className="text-white" />
                            </div>

                            {/* Dynamic Value with Loading State */}
                            {loading ? (
                                <div className="h-10 w-24 rounded-lg bg-gray-200/60 animate-pulse mb-1" />
                            ) : (
                                <p className={`text-4xl font-extrabold ${textColor} leading-none mb-1 tabular-nums`}>
                                    {value.toLocaleString()}
                                </p>
                            )}

                            {/* Label */}
                            <p className="text-gray-700 font-semibold text-sm">{label}</p>

                            {/* Subtitle / Badge */}
                            <p className={`text-[11px] font-medium mt-1 ${badgeColor}`}>
                                {badgeText}
                            </p>
                        </div>
                    )
                )}
            </div>

            {/* ── Bottom Action Banner (Moderation Quick Access) ── */}
            <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-6 shadow-lg shadow-indigo-200 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-white font-bold text-lg leading-tight">
                            Platform Moderation Center 🛡️
                        </h2>
                        <p className="text-indigo-100 text-sm mt-1 max-w-sm">
                            There are currently{" "}
                            <span className="font-bold text-white">
                                {stats.totalReports ?? 0}
                            </span>{" "}
                            report{(stats.totalReports ?? 0) !== 1 ? "s" : ""} requiring attention. Keep the community clean and friendly!
                        </p>
                    </div>
                    <a
                        href="/dashboard/admin/reports"
                        className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-600 text-sm font-bold hover:bg-indigo-50 transition-colors duration-200 shadow-sm"
                    >
                        <FaFlag size={12} />
                        Review User Reports
                    </a>
                </div>
            </div>
        </div>
    );
}
