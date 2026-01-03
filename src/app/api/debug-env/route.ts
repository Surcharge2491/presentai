import { env } from "@/env";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        STRIPE_API_KEY: env.STRIPE_API_KEY ? "SET ✓" : "NOT SET ✗",
        STRIPE_PRICE_ID: env.STRIPE_PRICE_ID ? "SET ✓" : "NOT SET ✗",
        STRIPE_WEBHOOK_SECRET: env.STRIPE_WEBHOOK_SECRET ? "SET ✓" : "NOT SET ✗",
    });
}
