import Stripe from "stripe";
import { env } from "@/env";

export const stripe = new Stripe(env.STRIPE_API_KEY ?? "dummy_key", {
    apiVersion: "2025-11-17.clover",
    typescript: true,
});
