import { syncSupabaseUserToPrisma } from '@/lib/sync-user'
import { NextResponse } from 'next/server'

export async function POST() {
    try {
        const user = await syncSupabaseUserToPrisma()

        if (!user) {
            return NextResponse.json(
                { error: 'Failed to sync user' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.error('Error in sync-user API:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
