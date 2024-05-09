"use client";


import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function login() {
    
    const router = useRouter()

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");

        const handleLogin = async (e) => {
            e.preventDefault();

            try {
                const response = await fetch("https://bank-app-bankend.onrender.com/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    setTimeout(() => {
                        localStorage.removeItem("token");
                    }, 60 * 60 * 1000); // Remove token after 1 hour (60 minutes * 60 seconds * 1000 milliseconds)
                    router.push("/");
                } else {
                    const data = await response.json();
                    setError(data.message);
                }
            } catch (error) {
                // setError("An error occurred. Please try again.");
            }
        };


        useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
                router.push("/"); // Replace "/home" with the actual home page URL
            }
        }, []);

        return (
            <div className="flex min-h-[100dvh] flex-col">
                <main className="flex-1 bg-gray-100 dark:bg-gray-800">
                    <div className="container mx-auto flex h-full items-center justify-center py-12 md:py-24">
                        <div className="w-full max-w-md space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-950 dark:border-gray-800">
                            <div className="space-y-2 text-center">
                                <div className="flex items-center justify-center" href="#">
                                    <BanknoteIcon className="h-6 w-6" />
                                    <span className="sr-only">Banking App</span>
                                </div>
                                <h1 className="text-3xl font-bold">Sign in to Banking App</h1>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Enter your email and password below to access your account.
                                </p>
                            </div>
                            <form className="space-y-4" onSubmit={handleLogin}>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="m@example.com"
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link
                                            className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
                                            href="reset-password"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        required
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button className="w-full" type="submit">
                                    Sign in
                                </Button>
                            </form>
                            {error && (
                                <div className="text-center text-red-500 dark:text-red-400">
                                    {error}
                                </div>
                            )}
                            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                                Don't have an account?&nbsp;
                                <Link
                                    className="font-medium text-gray-900 hover:underline dark:text-gray-50"
                                    href="signup"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    function BanknoteIcon(props) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="20" height="12" x="2" y="6" rx="2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M6 12h.01M18 12h.01" />
            </svg>
        );
    }

