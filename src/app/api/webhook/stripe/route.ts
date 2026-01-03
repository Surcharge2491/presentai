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

    // Log webhook event for debugging
    console.log(`[Stripe Webhook] Received event: ${event.type}`);

    // Handle checkout session completion (initial subscription)
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

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
                    subscription.current_period_end * 1000,
                ),
                hasAccess: true, // Grant access
            },
        });

        console.log(`[Stripe Webhook] Granted access to user: ${session.metadata.userId}`);
    }

    // Handle successful invoice payment (recurring subscription renewal)
    if (event.type === "invoice.payment_succeeded") {
        const invoice = event.data.object as Stripe.Invoice;

        // Only process subscription invoices (not one-off invoices)
        if (!invoice.subscription) {
            return new NextResponse(null, { status: 200 });
        }

        const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string,
        );

        await db.user.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0]?.price.id ?? "",
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000,
                ),
                hasAccess: true, // Ensure access is granted
            },
        });

        console.log(`[Stripe Webhook] Renewed subscription: ${subscription.id}`);
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

        console.log(`[Stripe Webhook] Revoked access for subscription: ${subscription.id}`);
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
                    subscription.current_period_end * 1000,
                ),
                hasAccess: subscription.status === "active",
            },
        });

        console.log(`[Stripe Webhook] Updated subscription: ${subscription.id}, status: ${subscription.status}`);
    }

    return new NextResponse(null, { status: 200 });
}
