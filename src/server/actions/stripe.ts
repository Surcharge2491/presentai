"use server";

import { env } from "@/env";
import { stripe } from "@/lib/stripe";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export const stripeRedirect = async () => {
    // Debug logging
    console.log("=== STRIPE DEBUG ===");
    console.log("STRIPE_API_KEY:", env.STRIPE_API_KEY ? `SET (${env.STRIPE_API_KEY.substring(0, 20)}...)` : "NOT SET");
    console.log("STRIPE_PRICE_ID:", env.STRIPE_PRICE_ID || "NOT SET");
    console.log("==================");

    // Check if Stripe is configured
    if (!env.STRIPE_API_KEY || !env.STRIPE_PRICE_ID) {
        console.error("❌ Stripe configuration missing:", {
            hasApiKey: !!env.STRIPE_API_KEY,
            hasPriceId: !!env.STRIPE_PRICE_ID
        });
        throw new Error("Payment system is not configured. Please contact support.");
    }

    const session = await auth();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    if (!userId || !userEmail) {
        throw new Error("You must be signed in to upgrade your plan");
    }

    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            stripeCustomerId: true,
        },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const stripeSession = await stripe.checkout.sessions.create({
        customer: user?.stripeCustomerId ?? undefined,
        customer_email: user?.stripeCustomerId ? undefined : userEmail,
        line_items: [
            {
                price: env.STRIPE_PRICE_ID,
                quantity: 1,
            },
        ],
        mode: "subscription",
        success_url: `${appUrl}/presentation?success=true`,
        cancel_url: `${appUrl}/pricing?canceled=true`,
        metadata: {
            userId,
        },
    });

    if (!stripeSession.url) {
        throw new Error("Failed to create checkout session");
    }

    console.log(`✅ Created Stripe checkout session for user: ${userId}`);
    console.log(`🚀 Redirecting to: ${stripeSession.url}`);
    redirect(stripeSession.url);
};

export const manageSubscription = async () => {
    // Check if Stripe is configured
    if (!env.STRIPE_API_KEY) {
        console.warn("Stripe is not configured, redirecting to dashboard");
        redirect("/presentation");
    }

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            stripeCustomerId: true,
        },
    });

    if (!user?.stripeCustomerId) {
        throw new Error("User not found");
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const stripeSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${appUrl}/presentation`,
    });

    redirect(stripeSession.url);
};
