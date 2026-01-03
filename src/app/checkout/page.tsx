import { stripeRedirect } from "@/server/actions/stripe";
import { auth } from "@/server/auth";
import { checkSubscription } from "@/lib/subscription";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
    // Check if user is authenticated
    const session = await auth();

    if (!session?.user) {
        // Redirect to sign in with callback to return here
        redirect("/auth/signin?callbackUrl=/checkout");
    }

    // Check if already Pro
    const isPro = await checkSubscription();

    if (isPro) {
        // Already Pro, redirect to presentations
        redirect("/presentation");
    }

    // Create checkout session and redirect to Stripe
    await stripeRedirect();

    // This won't be reached as stripeRedirect redirects
    return null;
}
