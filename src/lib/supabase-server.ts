import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

/**
 * Get the current authenticated user from Supabase in server-side code
 * Use this in server actions and API routes
 */
export async function getSupabaseUser() {
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing user sessions.
                    }
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return user
}

/**
 * Get user or throw error if not authenticated
 * Helper for server actions that require authentication
 */
export async function requireUser() {
    const user = await getSupabaseUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    return user
}
