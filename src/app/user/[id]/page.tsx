import { SubscriptionButton } from "@/components/subscription-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { format } from "date-fns";
import { Mail, User as UserIcon, Calendar } from "lucide-react";
import { notFound, redirect } from "next/navigation";

export default async function UserProfilePage({
    params,
}: {
    params: { id: string };
}) {
    const session = await auth();
    if (!session?.user) {
        redirect("/auth/signin");
    }

    // Only allow viewing own profile
    if (session.user.id !== params.id) {
        redirect("/");
    }

    const user = await db.user.findUnique({
        where: { id: params.id },
    });

    if (!user) {
        notFound();
    }

    const isPro =
        !!user.stripePriceId &&
        !!user.stripeCurrentPeriodEnd &&
        user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now();

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("")
            .substring(0, 2);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 pt-24">
            <div className="mx-auto max-w-4xl space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Profile Dashboard</h1>
                    <Badge variant={isPro ? "default" : "secondary"} className="text-lg px-4 py-1">
                        {isPro ? "Pro Plan" : "Free Plan"}
                    </Badge>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* User Info Card */}
                    <Card className="md:col-span-2 shadow-lg border-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserIcon className="h-5 w-5 text-primary" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                    <AvatarImage src={user.image ?? ""} />
                                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                                        {getInitials(user.name ?? "User")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-bold">{user.name}</h2>
                                    <div className="flex items-center text-gray-500">
                                        <Mail className="mr-2 h-4 w-4" />
                                        {user.email}
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 pt-4 border-t">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Member Since</p>
                                        <div className="flex items-center mt-1">
                                            <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                                            {user.emailVerified
                                                ? format(user.emailVerified, "MMMM d, yyyy")
                                                : "N/A"}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Account Type</p>
                                        <p className="mt-1 font-medium capitalize">
                                            {user.role.toLowerCase()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Subscription Card */}
                    <Card className="shadow-lg border-none h-fit">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-xl">💎</span>
                                Subscription
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Current Plan</p>
                                <p className="text-2xl font-bold text-primary">
                                    {isPro ? "Pro" : "Free"}
                                </p>
                            </div>

                            {isPro && user.stripeCurrentPeriodEnd && (
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Renews On</p>
                                    <p className="font-medium">
                                        {format(user.stripeCurrentPeriodEnd, "MMMM d, yyyy")}
                                    </p>
                                </div>
                            )}

                            <div className="pt-4">
                                <SubscriptionButton isPro={isPro} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
