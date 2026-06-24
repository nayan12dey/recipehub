"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { FaCheckCircle, FaCrown } from "react-icons/fa";

export default function PremiumSuccessPage() {
    const { data: session } = useSession();

    useEffect(() => {
        const updatePlan = async () => {
            if (!session?.user?.email) return;

            await fetch(
                `http://localhost:5000/users/plan/${session?.user?.email}`,
                {
                    method: "PATCH",
                }
            );
        };

        updatePlan();
    }, [session]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">

            <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 text-center">

                <FaCrown
                    className="mx-auto text-yellow-500 mb-4"
                    size={70}
                />

                <FaCheckCircle
                    className="mx-auto text-green-500 mb-4"
                    size={60}
                />

                <h1 className="text-3xl font-bold text-gray-800">
                    Premium Activated 🎉
                </h1>

                <p className="text-gray-600 mt-4">
                    Thank you for upgrading to Premium Membership.
                </p>

                <p className="text-gray-500 text-sm mt-2">
                    Your account now has access to all premium features.
                </p>

                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mt-6 text-left">

                    <h3 className="font-semibold text-orange-600 mb-3">
                        Premium Benefits
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>✅ Unlimited Recipe Uploads</li>
                        <li>✅ Premium Profile Badge</li>
                        <li>✅ Featured Access</li>
                        <li>✅ Ad-Free Experience</li>
                    </ul>
                </div>

                <Link
                    href="/dashboard/user/profile"
                    className="mt-6 inline-block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
                >
                    Go To Profile
                </Link>
            </div>
        </div>
    );
}