"use client";

import { manageSubscription, stripeRedirect } from "@/server/actions/stripe";
import { useTransition } from "react";
import { toast } from "sonner";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(async () => {
            try {
                if (isPro) {
                    await manageSubscription();
                } else {
                    await stripeRedirect();
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        });
    };

    return (
        <button
            disabled={isPending}
            onClick={onClick}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
            {isPro ? "Manage Subscription" : "Upgrade to Pro"}
        </button>
    );
};
