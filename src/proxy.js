import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    console.log(session)

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }



}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
    matcher: ['/dashboard', "/dashboard/:path*", '/dashboard/user', '/dashboard/user/add-recipe', '/dashboard/user/my-recipes', '/dashboard/user/favorites', '/dashboard/user/purchased', '/dashboard/user/profile', '/dashboard/admin', '/dashboard/admin/manage-users', '/dashboard/admin/manage-recipes', '/dashboard/admin/reports', '/dashboard/admin/transactions'],
}


/**
 * /dashboard/user
 * dashboard/user/add-recipe
 * dashboard/user/my-recipes
 * dashboard/user/favorites
 * dashboard/user/purchased
 * dashboard/user/profile
 */


/**
 * 
 * /dashboard/admin/manage-users
 * /dashboard/admin/manage-recipes
 * /dashboard/admin/reports
 * /dashboard/admin/transactions
 */