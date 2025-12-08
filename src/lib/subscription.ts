import { auth } from "@/server/auth";
import { db } from "@/server/db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const session = await auth();

    if (!session?.user?.id) {
        return false;
    }

    const user = await db.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    });

    if (!user) {
        return false;
    }

    const isValid =
        user.stripePriceId &&
        user.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid;
};
