import { stripeRedirect } from "@/server/actions/stripe";
import { auth } from "@/server/auth";
import { checkSubscription } from "@/lib/subscription";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
    // Check if user is authenticated
    const session = await auth();

    console.log("=== CHECKOUT PAGE DEBUG ===");
    console.log("Session:", session?.user ? `User: ${session.user.email}` : "No session");

    if (!session?.user) {
        console.log("❌ No session, redirecting to signin");
        redirect("/auth/signin?callbackUrl=/checkout");
    }

    console.log("✅ User authenticated:", session.user.id);

    // Check if already Pro
    const isPro = await checkSubscription();
    console.log("Is Pro:", isPro);

    if (isPro) {
        console.log("✅ Already Pro, redirecting to presentations");
        redirect("/presentation");
    }

    // Create checkout session and redirect to Stripe
    console.log("🔄 Calling stripeRedirect...");
    await stripeRedirect();

    // This won't be reached as stripeRedirect redirects
    return null;
}
