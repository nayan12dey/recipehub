import Link from "next/link";
import { FaCheckCircle, FaUtensils } from "react-icons/fa";

export default function RecipePurchaseSuccess() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">

            <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 text-center">

                <FaUtensils
                    className="mx-auto text-orange-500 mb-4"
                    size={70}
                />

                <FaCheckCircle
                    className="mx-auto text-green-500 mb-4"
                    size={60}
                />

                <h1 className="text-3xl font-bold text-gray-800">
                    Recipe Purchased 🎉
                </h1>

                <p className="text-gray-600 mt-4">
                    Your payment was completed successfully.
                </p>

                <p className="text-gray-500 text-sm mt-2">
                    This recipe has been added to your Purchased Recipes.
                </p>

                <div className="bg-green-50 border border-green-100 rounded-xl p-4 mt-6">

                    <h3 className="font-semibold text-green-600">
                        Purchase Successful
                    </h3>

                    <p className="text-sm text-gray-600 mt-2">
                        You can now view this recipe anytime from
                        your dashboard.
                    </p>
                </div>

                <div className="flex gap-3 mt-6">

                    <Link
                        href="/dashboard/user/purchased"
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
                    >
                        My Purchases
                    </Link>

                    <Link
                        href="/recipes"
                        className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-xl font-semibold"
                    >
                        Browse More
                    </Link>

                </div>
            </div>
        </div>
    );
}