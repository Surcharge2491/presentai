import { getSupabaseUser } from '@/lib/supabase-server'
import { db } from '@/server/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        // Get password from request body (optional)
        const body = await req.json().catch(() => ({}))
        const { password } = body

        // Get current Supabase user
        const user = await getSupabaseUser()

        if (!user) {
            return NextResponse.json(
                { error: 'No authenticated user found' },
                { status: 401 }
            )
        }

        // Check if user exists in Prisma
        const existingUser = await db.user.findUnique({
            where: { email: user.email! }
        })

        if (existingUser) {
            // Update existing user (optionally update password)
            const updateData: any = {
                name: user.user_metadata.name || user.email?.split('@')[0],
                image: user.user_metadata.avatar_url,
                emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : null,
            }

            // If password provided and user doesn't have one, hash and save it
            if (password && !existingUser.password) {
                updateData.password = await bcrypt.hash(password, 10)
            }

            const updatedUser = await db.user.update({
                where: { email: user.email! },
                data: updateData
            })

            return NextResponse.json({ success: true, user: updatedUser })
        } else {
            // Create new user
            const userData: any = {
                id: user.id,
                email: user.email!,
                name: user.user_metadata.name || user.email?.split('@')[0],
                image: user.user_metadata.avatar_url,
                emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : null,
                role: 'USER',
                hasAccess: true,
            }

            // Hash and save password if provided
            if (password) {
                userData.password = await bcrypt.hash(password, 10)
            }

            const newUser = await db.user.create({
                data: userData
            })

            console.log('✅ User created in Prisma with password:', newUser.email)
            return NextResponse.json({ success: true, user: newUser })
        }
    } catch (error) {
        console.error('Error in sync-user API:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
