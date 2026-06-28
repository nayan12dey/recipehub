"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaCrown, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Loader from "@/components/Loader";

export default function ProfilePage() {
    const { data: session } = useSession();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async () => {

            if (!session?.user?.email) return;

            setLoading(true);

            const { data: token } =
                await authClient.token();

            const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${session.user.email}`,
                {
                    headers: {
                        authorization: `Bearer ${token?.token}`,
                    },
                }
            );

            const data = await res.json();

            setUserData(data);
            setLoading(false);
        };

        fetchUser();
    }, [session]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedUser = {
            name: form.name.value,
            image: form.image.value,
        };

        const { data: token } = await authClient.token();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${session?.user?.email}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token?.token}`,
                },
                body: JSON.stringify(updatedUser),
            }
        );

        const data = await res.json();

        if (data.modifiedCount > 0) {
            toast.success("Profile Updated");
            window.location.reload();
        }
    };

    const isPremium = userData?.plan === "premium";

    if (loading) {
        return <Loader />;
    }

    return (
        // <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6 flex items-center">

        //     <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 w-full items-start">

        //         {/* LEFT PROFILE CARD */}
        //         <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8">
        //             <div className="text-center mb-6">
        //                 <div className="flex justify-center mb-4">
        //                     <Image
        //                         src={userData?.image || "/avatar.png"}
        //                         width={120}
        //                         height={120}
        //                         alt="profile"
        //                         className="w-32 h-32 rounded-full object-cover border-4 border-orange-200"
        //                     />
        //                 </div>

        //                 <h1 className="text-2xl font-bold text-gray-800">
        //                     {userData?.name}
        //                 </h1>

        //                 <p className="text-gray-500 mt-1">
        //                     {session?.user?.email}
        //                 </p>

        //                 {isPremium && (
        //                     <div className="mt-4 inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold text-sm">
        //                         <FaCrown />
        //                         Premium Member
        //                     </div>
        //                 )}
        //             </div>

        //             <form onSubmit={handleUpdate} className="space-y-4">
        //                 <div>
        //                     <label className="text-sm text-gray-600">Name</label>
        //                     <input
        //                         type="text"
        //                         name="name"
        //                         defaultValue={userData?.name}
        //                         className="w-full mt-1 p-3 border rounded-xl outline-none focus:border-orange-400"
        //                     />
        //                 </div>

        //                 <div>
        //                     <label className="text-sm text-gray-600">Profile Image URL</label>
        //                     <input
        //                         type="text"
        //                         name="image"
        //                         defaultValue={userData?.image}
        //                         className="w-full mt-1 p-3 border rounded-xl outline-none focus:border-orange-400"
        //                     />
        //                 </div>

        //                 <Button
        //                     type="submit"
        //                     className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold"
        //                 >
        //                     Update Profile
        //                 </Button>
        //             </form>
        //         </div>

        //         {/* PREMIUM/UPGRADE SECTION */}
        //         {isPremium ? (

        //             <div className="backdrop-blur-md bg-white/40 border border-white/60 rounded-3xl shadow-lg p-6 text-gray-800 max-w-md mx-auto md:w-full">
        //                 <div className="flex justify-between items-center mb-4">
        //                     <div>
        //                         <p className="text-xs uppercase tracking-wider text-orange-600 font-bold">
        //                             Membership Status
        //                         </p>
        //                         <h2 className="text-2xl font-black text-gray-800 mt-0.5 flex items-center gap-2">
        //                             Premium Active
        //                         </h2>
        //                     </div>
        //                     <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2.5 rounded-2xl shadow-sm">
        //                         <FaCrown className="text-2xl text-white" />
        //                     </div>
        //                 </div>


        //                 <div className="space-y-3.5 mt-6 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/40">
        //                     <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
        //                         <FaCheckCircle className="text-emerald-500 text-base" />
        //                         <span>Unlimited Recipe Uploads</span>
        //                     </div>
        //                     <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
        //                         <FaCheckCircle className="text-emerald-500 text-base" />
        //                         <span>Premium Profile Badge</span>
        //                     </div>
        //                     <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
        //                         <FaCheckCircle className="text-emerald-500 text-base" />
        //                         <span>Ad-Free Experience</span>
        //                     </div>
        //                     <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
        //                         <FaCheckCircle className="text-emerald-500 text-base" />
        //                         <span>Priority Platform Features</span>
        //                     </div>
        //                 </div>

        //                 <div className="mt-6 pt-4 border-t border-gray-200/40 flex justify-between items-center text-xs font-semibold text-gray-500">
        //                     <span>Status: Active</span>
        //                     <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full">Auto-Renew</span>
        //                 </div>
        //             </div>
        //         ) : (
        //             /* Upgrade Card */
        //             <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8 flex flex-col justify-between">
        //                 <div>
        //                     <div className="flex justify-between items-center mb-6">
        //                         <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold">
        //                             PREMIUM
        //                         </span>
        //                         <FaCrown className="text-3xl text-orange-500" />
        //                     </div>

        //                     <h2 className="text-3xl font-bold text-orange-600">
        //                         Upgrade To Premium
        //                     </h2>

        //                     <p className="text-gray-500 mt-2">
        //                         Unlock premium features and enjoy unlimited recipe uploads.
        //                     </p>

        //                     <div className="mt-6">
        //                         <span className="text-5xl font-bold text-gray-800">$9.99</span>
        //                         <span className="text-gray-500 ml-2">/year</span>
        //                     </div>

        //                     <div className="mt-8 space-y-4">
        //                         <div className="flex items-start gap-3 bg-orange-50 p-4 rounded-xl text-gray-700">
        //                             <FaExclamationCircle className="text-orange-500 mt-1 flex-shrink-0" />
        //                             <span className="text-sm">Free users can add only 2 recipes.</span>
        //                         </div>

        //                         <div className="flex items-center gap-3 text-gray-700 font-medium">
        //                             <FaCheckCircle className="text-green-500" />
        //                             <span>Unlimited Recipes</span>
        //                         </div>

        //                         <div className="flex items-center gap-3 text-gray-700 font-medium">
        //                             <FaCheckCircle className="text-green-500" />
        //                             <span>Premium Badge</span>
        //                         </div>

        //                         <div className="flex items-center gap-3 text-gray-700 font-medium">
        //                             <FaCheckCircle className="text-green-500" />
        //                             <span>Ad-Free Experience</span>
        //                         </div>
        //                     </div>
        //                 </div>

        //                 <div className="mt-10">
        //                     <form action="/api/checkout_sessions" method="POST">
        //                         <Button
        //                             type="submit"
        //                             className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold py-3 rounded-xl shadow-md hover:opacity-90 transition-opacity"
        //                         >
        //                             Upgrade Now
        //                         </Button>
        //                     </form>
        //                     <p className="text-center text-xs text-gray-400 mt-4">
        //                         Secure payment powered by Stripe.
        //                     </p>
        //                 </div>
        //             </div>
        //         )}
        //     </div>
        // </div>

        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-zinc-950 dark:via-gray-900 dark:to-zinc-900 p-6 flex items-center transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 w-full items-start">

                {/* LEFT PROFILE CARD */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-orange-100 dark:border-gray-700 p-8 transition-colors duration-300">
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                            <Image
                                src={userData?.image || "/avatar.png"}
                                width={120}
                                height={120}
                                alt="profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-orange-200 dark:border-gray-600"
                            />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {userData?.name}
                        </h1>

                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {session?.user?.email}
                        </p>

                        {isPremium && (
                            <div className="mt-4 inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400 px-4 py-2 rounded-full font-semibold text-sm">
                                <FaCrown />
                                Premium Member
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={userData?.name}
                                className="w-full mt-1 p-3 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-800 dark:text-white focus:border-orange-400 dark:focus:border-orange-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 dark:text-gray-300">Profile Image URL</label>
                            <input
                                type="text"
                                name="image"
                                defaultValue={userData?.image}
                                className="w-full mt-1 p-3 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-800 dark:text-white focus:border-orange-400 dark:focus:border-orange-500 transition-colors"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition-colors"
                        >
                            Update Profile
                        </Button>
                    </form>
                </div>

                {/* PREMIUM/UPGRADE SECTION */}
                {isPremium ? (
                    /* Premium Active Card */
                    <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border border-white/60 dark:border-gray-700/60 rounded-3xl shadow-lg p-6 text-gray-800 dark:text-white max-w-md mx-auto md:w-full transition-colors duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold">
                                    Membership Status
                                </p>
                                <h2 className="text-2xl font-black text-black dark:text-yellow-400 mt-0.5 flex items-center gap-2">
                                    Premium Active
                                </h2>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2.5 rounded-2xl shadow-sm">
                                <FaCrown className="text-2xl text-white" />
                            </div>
                        </div>

                        <div className="space-y-3.5 mt-6 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm p-4 rounded-2xl border border-white/40 dark:border-gray-700/40">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <FaCheckCircle className="text-emerald-500 dark:text-emerald-400 text-base" />
                                <span>Unlimited Recipe Uploads</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <FaCheckCircle className="text-emerald-500 dark:text-emerald-400 text-base" />
                                <span>Premium Profile Badge</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <FaCheckCircle className="text-emerald-500 dark:text-emerald-400 text-base" />
                                <span>Ad-Free Experience</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <FaCheckCircle className="text-emerald-500 dark:text-emerald-400 text-base" />
                                <span>Priority Platform Features</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200/40 dark:border-gray-700/40 flex justify-between items-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                            <span>Status: Active</span>
                            <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">Auto-Renew</span>
                        </div>
                    </div>
                ) : (
                    /* Upgrade Card */
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-orange-100 dark:border-gray-700 p-8 flex flex-col justify-between transition-colors duration-300">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                                    PREMIUM
                                </span>
                                <FaCrown className="text-3xl text-orange-500 dark:text-orange-400" />
                            </div>

                            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                                Upgrade To Premium
                            </h2>

                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                Unlock premium features and enjoy unlimited recipe uploads.
                            </p>

                            <div className="mt-6">
                                <span className="text-5xl font-bold text-gray-800 dark:text-white">$9.99</span>
                                <span className="text-gray-500 dark:text-gray-400 ml-2">/year</span>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-start gap-3 bg-orange-50 dark:bg-orange-950/20 p-4 rounded-xl text-gray-700 dark:text-gray-300">
                                    <FaExclamationCircle className="text-orange-500 dark:text-orange-400 mt-1 flex-shrink-0" />
                                    <span className="text-sm">Free users can add only 2 recipes.</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                                    <FaCheckCircle className="text-green-500 dark:text-green-400" />
                                    <span>Unlimited Recipes</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                                    <FaCheckCircle className="text-green-500 dark:text-green-400" />
                                    <span>Premium Badge</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                                    <FaCheckCircle className="text-green-500 dark:text-green-400" />
                                    <span>Ad-Free Experience</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <form action="/api/checkout_sessions" method="POST">
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold py-3 rounded-xl shadow-md hover:opacity-90 transition-opacity"
                                >
                                    Upgrade Now
                                </Button>
                            </form>
                            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                                Secure payment powered by Stripe.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}