import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { auth } from '@/lib/auth'

export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const user = await auth.api.getSession({
            headers: await headers()
        })


        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.user?.email,

            metadata: {
                email: user?.user?.email,
            },

            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: 'price_1TlWJpLLj0q7bGaYbZSJfpo3',
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${origin}/dashboard/user/profile/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}