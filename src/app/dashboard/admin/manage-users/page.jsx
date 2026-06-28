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
        <div className="max-w-6xl mx-auto my-8 p-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">

                <div className="px-8 py-6 bg-gradient-to-r from-orange-50/50 to-transparent border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                            Manage Users
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            Overview and control of all registered users.
                        </p>
                    </div>

                    <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
                        Total: {users.length} Users
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-fixed text-left border-collapse">

                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                                <th className="w-[40%] py-4 px-8">
                                    User Details
                                </th>

                                <th className="w-[15%] py-4 px-6">
                                    Role
                                </th>

                                <th className="w-[15%] py-4 px-6">
                                    Plan
                                </th>

                                <th className="w-[15%] py-4 px-6">
                                    Status
                                </th>

                                <th className="w-[15%] py-4 px-8 text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 text-sm">
                            {users.map((user) => {
                                const isBlocked =
                                    user.status === "blocked";

                                const isPremium =
                                    user.plan === "premium";

                                const isAdmin =
                                    user.role === "admin";

                                return (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-orange-50/20 transition"
                                    >
                                        <td className="py-4 px-8">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-800">
                                                    {user.name}
                                                </span>

                                                <span className="text-xs text-gray-400">
                                                    {user.email}
                                                </span>
                                            </div>
                                        </td>

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

                                        <td className="py-4 px-8 text-right">

                                            {isAdmin ? (
                                                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-xs font-medium">
                                                    No Action
                                                </span>
                                            ) : isBlocked ? (
                                                <button
                                                    onClick={() =>
                                                        handleUnblock(user._id)
                                                    }
                                                    className="w-36 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                                                >
                                                    <FaUserCheck />
                                                    Unblock
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleBlock(user._id)
                                                    }
                                                    className="w-36 inline-flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 text-xs font-semibold px-4 py-2 rounded-xl"
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

                {users.length === 0 && (
                    <div className="text-center py-12 text-gray-400 text-sm">
                        No users found.
                    </div>
                )}
            </div>
        </div>
    );


}
