import { getSupabaseUser } from '@/lib/supabase-server'
import { db } from '@/server/db'

/**
 * Syncs a Supabase Auth user to the Prisma database
 * Creates new user if they don't exist, updates if they do
 */
export async function syncSupabaseUserToPrisma() {
    try {
        // Get current Supabase user from server-side client
        const user = await getSupabaseUser()

        if (!user) {
            console.error('Failed to get Supabase user: No user found')
            return null
        }

        // Check if user exists in Prisma
        const existingUser = await db.user.findUnique({
            where: { email: user.email! }
        })

        if (existingUser) {
            console.log('✅ User already exists in Prisma:', existingUser.email)
            // Update existing user
            return await db.user.update({
                where: { email: user.email! },
                data: {
                    name: user.user_metadata.name || user.email?.split('@')[0],
                    image: user.user_metadata.avatar_url,
                    emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : null,
                }
            })
        } else {
            console.log('🆕 Creating new user in Prisma:', {
                id: user.id,
                email: user.email,
                name: user.user_metadata.name
            })
            // Create new user in Prisma with Supabase user ID
            const newUser = await db.user.create({
                data: {
                    id: user.id, // Use Supabase UUID
                    email: user.email!,
                    name: user.user_metadata.name || user.email?.split('@')[0],
                    image: user.user_metadata.avatar_url,
                    emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : null,
                    role: 'USER',
                    hasAccess: true, // Give free tier access by default (Pro features gated by checkSubscription)
                }
            })
            console.log('✅ User created in Prisma:', newUser.email)
            return newUser
        }
    } catch (error) {
        console.error('Error syncing user to Prisma:', error)
        return null
    }
}
