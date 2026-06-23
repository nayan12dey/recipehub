import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {

    const headersList = await headers();

    const origin = headersList.get("origin");

    const user = await auth.api.getSession({
        headers: await headers(),
    });

    const { searchParams } = new URL(request.url);

    const recipeId = searchParams.get("recipeId");

    const session = await stripe.checkout.sessions.create({

        customer_email: user.user.email,

        line_items: [
            {
                price: "price_1TlaXxLLj0q7bGaYmSPdDIqT",
                quantity: 1,
            },
        ],

        mode: "payment",

        success_url: `${origin}/recipes/success?recipeId=${recipeId}&session_id={CHECKOUT_SESSION_ID}`,


    });

    return NextResponse.redirect(
        session.url,
        303
    );
}