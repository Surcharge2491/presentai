import { env } from "@/env";
import { stripe } from "@/lib/stripe";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            env.STRIPE_WEBHOOK_SECRET ?? "",
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );

        if (!session?.metadata?.userId) {
            return new NextResponse("User id is required", { status: 400 });
        }

        await db.user.update({
            where: {
                id: session.metadata.userId,
            },
            data: {
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0]?.price.id ?? "",
                stripeCurrentPeriodEnd: new Date(
                    (subscription as any).current_period_end * 1000,
                ),
                hasAccess: true, // Grant access
            },
        });
    }

    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );

        await db.user.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0]?.price.id ?? "",
                stripeCurrentPeriodEnd: new Date(
                    (subscription as any).current_period_end * 1000,
                ),
                hasAccess: true, // Ensure access is granted
            },
        });
    }

    // Handle subscription cancellation
    if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as Stripe.Subscription;

        await db.user.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                hasAccess: false, // Revoke access
                stripeSubscriptionId: null,
                stripePriceId: null,
            },
        });
    }

    // Handle subscription updates (upgrades/downgrades)
    if (event.type === "customer.subscription.updated") {
        const subscription = event.data.object as Stripe.Subscription;

        await db.user.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0]?.price.id ?? "",
                stripeCurrentPeriodEnd: new Date(
                    (subscription as any).current_period_end * 1000,
                ),
                hasAccess: subscription.status === "active",
            },
        });
    }

    return new NextResponse(null, { status: 200 });
}
