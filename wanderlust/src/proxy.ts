import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    const user = session?.user
    console.log("User from proxy:", user)

    if (!user) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    console.log("Session from proxy:", session)
//   return NextResponse.redirect(new URL('/', request.url))
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    "/add-destination",
    "/my-bookings",
    "/destination/:path"
  ],
}