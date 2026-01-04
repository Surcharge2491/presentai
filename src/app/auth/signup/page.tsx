"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function SignUp() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/presentation";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            // Sign up with Supabase
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: formData.name,
                    },
                    emailRedirectTo: `${window.location.origin}${callbackUrl}`,
                },
            });

            if (signUpError) {
                setError(signUpError.message);
                setLoading(false);
                return;
            }

            // Check if we got a session
            let session = signUpData.session;

            // If no session (email confirmation required), try signing in immediately
            if (signUpData.user && !session) {
                console.log('No session from signup, trying signin...');
                const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });

                if (!signInError && signInData.session) {
                    session = signInData.session;
                }
            }

            if (!session) {
                setError("Account created but couldn't establish session. Please try signing in.");
                setLoading(false);
                return;
            }

            console.log('✅ Supabase session established:', session.access_token ? 'Yes' : 'No');

            // Sync user to Prisma database
            try {
                const syncResponse = await fetch('/api/auth/sync-user', {
                    method: 'POST',
                });

                if (!syncResponse.ok) {
                    throw new Error('Failed to sync user to database');
                }

                console.log('✅ User synced to Prisma');
            } catch (syncErr) {
                console.error('❌ Sync failed:', syncErr);
                setError('Failed to sync user. Please contact support.');
                setLoading(false);
                return;
            }

            // Sign in via NextAuth to establish NextAuth session
            console.log('🔄 Signing in via NextAuth...');
            try {
                const result = await signIn('credentials', {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });

                if (result?.error) {
                    console.error('❌ NextAuth signin failed:', result.error);
                    setError('Account created but signin failed. Please try signing in manually.');
                    setLoading(false);
                    return;
                }

                console.log('✅ NextAuth session established');
            } catch (nextAuthErr) {
                console.error('❌ NextAuth error:', nextAuthErr);
                setError('Account created but signin failed. Please try signing in manually.');
                setLoading(false);
                return;
            }

            // Give sessions time to propagate
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Success! Redirect to callback URL
            console.log(`✅ Redirecting to: ${callbackUrl}`);
            window.location.href = callbackUrl;
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}${callbackUrl}`,
            },
        });

        if (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>Enter your details to get started</CardDescription>
                    {error && (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                        onClick={handleGoogleSignIn}
                    >
                        <FaGoogle className="h-4 w-4" />
                        Sign up with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Creating account..." : "Sign up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center gap-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link href="/auth/signin" className="text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
