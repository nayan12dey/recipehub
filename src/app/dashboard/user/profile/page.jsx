// "use client";

// import { useSession } from "@/lib/auth-client";
// import { Button } from "@heroui/react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// const ProfilePage = () => {
//     const { data: session } = useSession();
//     const router = useRouter();

//     const handleUpdate = async (e) => {
//         e.preventDefault();

//         const form = e.target;

//         const updatedUser = {
//             name: form.name.value,
//             image: form.image.value,
//         };

//         const res = await fetch(
//             `http://localhost:5000/users/${session?.user?.email}`,
//             {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(updatedUser),
//             }
//         );

//         const data = await res.json();

//         if (data.modifiedCount > 0) {
//             toast.success("Profile Updated");
//             window.location.reload();
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4">

//             <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-orange-100 p-6">

//                 {/* Header */}
//                 <div className="text-center mb-6">
//                     <h1 className="text-2xl font-bold text-gray-800">
//                         My Profile
//                     </h1>
//                     <p className="text-sm text-gray-500">
//                         Update your personal information
//                     </p>
//                 </div>

//                 {/* Profile Image */}
//                 <div className="flex justify-center mb-6">
//                     <div className="relative">
//                         <Image
//                             width={100}
//                             height={100}
//                             src={session?.user?.image || "/avatar.png"}
//                             alt="profile"
//                             className="w-28 h-28 rounded-full object-cover border-4 border-orange-200 shadow-md"
//                         />
//                     </div>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleUpdate} className="space-y-4">

//                     <div>
//                         <label className="text-sm text-gray-600">Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             defaultValue={session?.user?.name}
//                             className="mt-1 w-full border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none p-3 rounded-xl transition"
//                             placeholder="Enter your name"
//                         />
//                     </div>

//                     <div>
//                         <label className="text-sm text-gray-600">Profile Image URL</label>
//                         <input
//                             type="url"
//                             name="image"
//                             defaultValue={session?.user?.image}
//                             className="mt-1 w-full border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none p-3 rounded-xl transition"
//                             placeholder="Enter image URL"
//                         />
//                     </div>

//                     <Button
//                         type="submit"
//                         className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition-all shadow-md"
//                     >
//                         Update Profile
//                     </Button>

//                 </form>

//             </div>
//         </div>
//     );
// };

// export default ProfilePage;



"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
    FaCrown,
    FaCheckCircle,
    FaExclamationCircle,
} from "react-icons/fa";

const ProfilePage = () => {
    const { data: session } = useSession();

    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;

        const updatedUser = {
            name: form.name.value,
            image: form.image.value,
        };

        const res = await fetch(
            `http://localhost:5000/users/${session?.user?.email}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
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

    const isPremium = session?.user?.isPremium;

    return (
        <div className="min-h-screen flex flex-col md:flex-row md:items-start justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6 gap-6">

            {/* PROFILE CARD */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-orange-100 p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Profile
                    </h1>
                    <p className="text-sm text-gray-500">
                        Update your personal information
                    </p>
                </div>

                <div className="flex justify-center mb-6">
                    <Image
                        width={120}
                        height={120}
                        src={session?.user?.image || "/avatar.png"}
                        alt="profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-orange-200 shadow-md"
                    />
                </div>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={session?.user?.name}
                            className="mt-1 w-full border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none p-3 rounded-xl transition"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">
                            Profile Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            defaultValue={session?.user?.image}
                            className="mt-1 w-full border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none p-3 rounded-xl transition"
                            placeholder="Enter image URL"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl"
                    >
                        Update Profile
                    </Button>
                </form>
            </div>

            {/* PREMIUM SECTION */}
            {isPremium ? (
                <div className="w-full max-w-md bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 text-white rounded-2xl shadow-xl p-6">

                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="uppercase tracking-widest text-xs opacity-90">
                                Premium Membership
                            </p>

                            <h2 className="text-2xl font-bold mt-1">
                                Premium Member 👑
                            </h2>
                        </div>

                        <FaCrown className="text-4xl text-yellow-200" />
                    </div>

                    <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-6">
                        <p className="text-sm text-white/90">
                            Your premium plan is active.
                        </p>

                        <p className="text-lg font-semibold mt-1">
                            Enjoy unlimited access to all premium features.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <FaCheckCircle />
                            <span>Unlimited Recipe Uploads</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaCheckCircle />
                            <span>Verified Profile Badge</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaCheckCircle />
                            <span>Ad-Free Experience</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaCheckCircle />
                            <span>Premium Priority Access</span>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-white/20 pt-4">
                        <p className="text-sm text-white/80">
                            Status: Active Premium Member
                        </p>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-md bg-white text-gray-900 rounded-2xl shadow-xl border border-orange-100 p-6 flex flex-col justify-between min-h-[500px]">

                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                PRO ACCESS
                            </span>

                            <FaCrown className="text-orange-500 text-2xl animate-pulse" />
                        </div>

                        <h2 className="text-2xl font-bold text-orange-600">
                            Go Premium
                        </h2>

                        <p className="text-sm text-gray-600 mt-2">
                            Unlock limits and share your culinary creativity.
                        </p>

                        <div className="mt-5 flex items-baseline">
                            <span className="text-5xl font-extrabold">
                                $9.99
                            </span>

                            <span className="ml-2 text-gray-500">
                                /year
                            </span>
                        </div>

                        <ul className="space-y-4 mt-8">
                            <li className="flex items-start gap-3 bg-orange-50 p-3 rounded-xl border border-orange-100">
                                <FaExclamationCircle className="text-orange-500 mt-1" />

                                <span className="text-sm">
                                    Normal users can add only{" "}
                                    <strong>2 recipes</strong>.
                                </span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-500" />
                                <span>Unlimited Recipes</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-500" />
                                <span>Ad-Free Experience</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-500" />
                                <span>Verified Badge</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <form action="/api/checkout_sessions" method="POST">
                            <section>
                                <Button type="submit" role="link" as="a"
                                    // href="YOUR_STRIPE_PAYMENT_LINK"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 text-white font-bold py-3 rounded-xl"
                                >
                                    Upgrade Now
                                </Button>
                            </section>
                        </form>



                        {/* <Button
                        >
                            
                        </Button> */}

                        <p className="text-center text-xs text-gray-400 mt-3">
                            Secure payment hosted by Stripe.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;

