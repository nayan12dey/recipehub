"use client";

import Loader from "@/components/Loader";
import { authClient, useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
    FaUserCheck,
    FaBan,
    FaCrown,
} from "react-icons/fa";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();

    useEffect(() => {
        const fetchUsers = async () => {
            if (!session?.user?.email) return;

            setLoading(true);

            const { data: token } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
                {
                    headers: {
                        authorization: `Bearer ${token?.token}`,
                    },
                }
            );

            const data = await res.json();

            setUsers(data);
            setLoading(false);
        };

        fetchUsers();
    }, [session]);

    const handleBlock = async (id) => {
        try {
            const { data: token } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/users/block/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        authorization: `Bearer ${token?.token}`,
                    },
                }
            );

            const data = await res.json();

            if (data.modifiedCount > 0) {
                setUsers((prev) =>
                    prev.map((user) =>
                        user._id === id
                            ? {
                                ...user,
                                status: "blocked",
                            }
                            : user
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnblock = async (id) => {
        try {
            const { data: token } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/users/unblock/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        authorization: `Bearer ${token?.token}`,
                    },
                }
            );

            const data = await res.json();

            if (data.modifiedCount > 0) {
                setUsers((prev) =>
                    prev.map((user) =>
                        user._id === id
                            ? {
                                ...user,
                                status: "active",
                            }
                            : user
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="max-w-6xl mx-auto my-8 p-1 md:p-2">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">

                {/* Header */}
                <div className="px-5 md:px-8 py-5 md:py-6 bg-gradient-to-r from-orange-50/50 to-transparent dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                            Manage Users
                        </h2>
                        <p className="text-xs md:text-sm text-gray-400 mt-1">
                            Overview and control of all registered users.
                        </p>
                    </div>

                    <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-xl w-fit">
                        Total: {users.length} Users
                    </span>
                </div>

                {/*  DESKTOP TABLE  */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full table-fixed text-left border-collapse text-gray-800 dark:text-gray-200">

                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wider font-semibold border-b border-gray-100 dark:border-gray-700">
                                <th className="w-[40%] py-4 px-8">User Details</th>
                                <th className="w-[15%] py-4 px-6">Role</th>
                                <th className="w-[15%] py-4 px-6">Plan</th>
                                <th className="w-[15%] py-4 px-6">Status</th>
                                <th className="w-[15%] py-4 px-8 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                            {users.map((user) => {
                                const isBlocked = user.status === "blocked";
                                const isPremium = user.plan === "premium";
                                const isAdmin = user.role === "admin";

                                return (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-orange-50/20 dark:hover:bg-gray-800 transition"
                                    >
                                        {/* User */}
                                        <td className="py-4 px-8">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-800 dark:text-white">
                                                    {user.name}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {user.email}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="py-4 px-6">
                                            {isAdmin ? (
                                                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-xl text-xs font-semibold">
                                                    <FaCrown />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex bg-gray-100 text-gray-600 px-3 py-1 rounded-xl text-xs font-medium">
                                                    User
                                                </span>
                                            )}
                                        </td>

                                        {/* Plan */}
                                        <td className="py-4 px-6">
                                            {isPremium ? (
                                                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 rounded-xl text-xs font-semibold">
                                                    👑 Premium
                                                </span>
                                            ) : (
                                                <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-xl text-xs">
                                                    Free
                                                </span>
                                            )}
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-6">
                                            {isAdmin ? (
                                                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-xl text-xs font-semibold border border-blue-100">
                                                    Active
                                                </span>
                                            ) : isBlocked ? (
                                                <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-xl text-xs font-semibold border border-red-100">
                                                    Blocked
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-xl text-xs font-semibold border border-green-100">
                                                    Active
                                                </span>
                                            )}
                                        </td>

                                        {/* Action */}
                                        <td className="py-4 px-8 text-right">
                                            {isAdmin ? (
                                                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-xs font-medium">
                                                    No Action
                                                </span>
                                            ) : isBlocked ? (
                                                <button
                                                    onClick={() => handleUnblock(user._id)}
                                                    className="w-36 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                                                >
                                                    <FaUserCheck />
                                                    Unblock
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleBlock(user._id)}
                                                    className="w-36 inline-flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 text-xs font-semibold px-4 py-2 rounded-xl transition"
                                                >
                                                    <FaBan />
                                                    Block User
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/*  MOBILE + TABLET CARD  */}
                <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">

                    {users.map((user) => {
                        const isBlocked = user.status === "blocked";
                        const isPremium = user.plan === "premium";
                        const isAdmin = user.role === "admin";

                        return (
                            <div
                                key={user._id}
                                className="p-4 space-y-3 hover:bg-orange-50/10 dark:hover:bg-gray-800 transition"
                            >
                                {/* Top */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800 dark:text-white">
                                            {user.name}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {user.email}
                                        </span>
                                    </div>

                                    {isAdmin ? (
                                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-100 px-2 py-1 rounded-xl text-xs font-semibold">
                                            <FaCrown />
                                            Admin
                                        </span>
                                    ) : (
                                        <span className="inline-flex bg-gray-100 text-gray-600 px-2 py-1 rounded-xl text-xs">
                                            User
                                        </span>
                                    )}
                                </div>

                                {/* Badges */}
                                <div className="flex gap-2 flex-wrap text-xs">
                                    {isPremium ? (
                                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 px-2 py-1 rounded-xl font-semibold">
                                            👑 Premium
                                        </span>
                                    ) : (
                                        <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-xl">
                                            Free
                                        </span>
                                    )}

                                    {isAdmin ? (
                                        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-xl font-semibold border border-blue-100">
                                            Active
                                        </span>
                                    ) : isBlocked ? (
                                        <span className="bg-red-50 text-red-600 px-2 py-1 rounded-xl font-semibold border border-red-100">
                                            Blocked
                                        </span>
                                    ) : (
                                        <span className="bg-green-50 text-green-600 px-2 py-1 rounded-xl font-semibold border border-green-100">
                                            Active
                                        </span>
                                    )}
                                </div>

                                {/* Action */}
                                <div>
                                    {isAdmin ? (
                                        <span className="text-xs text-gray-400">
                                            No Action
                                        </span>
                                    ) : isBlocked ? (
                                        <button
                                            onClick={() => handleUnblock(user._id)}
                                            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                                        >
                                            <FaUserCheck />
                                            Unblock
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleBlock(user._id)}
                                            className="w-full inline-flex items-center justify-center gap-2 bg-white text-gray-600 border border-gray-200 text-xs font-semibold px-4 py-2 rounded-xl"
                                        >
                                            <FaBan />
                                            Block User
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty state */}
                {users.length === 0 && (
                    <div className="text-center py-12 text-gray-400 text-sm">
                        No users found.
                    </div>
                )}
            </div>
        </div>
    );


}
