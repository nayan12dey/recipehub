import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

import {
    FaCheckCircle,
    FaUtensils,
} from "react-icons/fa";

export default async function RecipePurchaseSuccess({ searchParams }) {

    const params = await searchParams;

    const sessionId = params?.session_id;
    const recipeId = params?.recipeId;

   
  
    const checkoutSession =
        await stripe.checkout.sessions.retrieve(sessionId);

    if (checkoutSession.payment_status !== "paid") {
        redirect("/");
    }

    
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    
    let recipe = null;

    try {
        const recipeRes = await fetch(
            `http://localhost:5000/recipes/${recipeId}`,
            { cache: "no-store" }
        );

        recipe = await recipeRes.json();

    } catch (err) {
        console.error("Recipe fetch error:", err);
    }

  
    try {
        const res = await fetch(
            "http://localhost:5000/payments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recipeId,

                    
                    recipeName: recipe?.recipeName,
                    recipeImage: recipe?.recipeImage,
                    category: recipe?.category,
                    cuisineType: recipe?.cuisineType,

                    userEmail: session?.user?.email,
                    userId: session?.user?.id,

                    stripeSessionId: sessionId,
                    amount: checkoutSession.amount_total,
                    paymentStatus: checkoutSession.payment_status,
                    purchasedAt: new Date(),
                }),
            }
        );

        console.log("Payment save status:", res.status);

    } catch (error) {
        console.error("PAYMENT SAVE ERROR:", error);
    }

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

                <div className="flex gap-3 mt-6">

                    <Link
                        href="/dashboard/user/purchased"
                        className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold"
                    >
                        My Purchases
                    </Link>

                    <Link
                        href="/recipes"
                        className="flex-1 border border-orange-500 text-orange-500 py-3 rounded-xl font-semibold"
                    >
                        Browse More
                    </Link>

                </div>

            </div>
        </div>
    );
}