"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { data: session } = useSession();
    const router = useRouter();

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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-orange-100 p-6">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Profile
                    </h1>
                    <p className="text-sm text-gray-500">
                        Update your personal information
                    </p>
                </div>

                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <Image
                            width={100}
                            height={100}
                            src={session?.user?.image || "/avatar.png"}
                            alt="profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-orange-200 shadow-md"
                        />
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleUpdate} className="space-y-4">

                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={session?.user?.name}
                            className="mt-1 w-full border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none p-3 rounded-xl transition"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Profile Image URL</label>
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
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition-all shadow-md"
                    >
                        Update Profile
                    </Button>

                </form>

            </div>
        </div>
    );
};

export default ProfilePage;