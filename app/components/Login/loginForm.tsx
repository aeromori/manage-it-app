"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Button, Spinner } from "flowbite-react";
import Cookies from "js-cookie";
import {
    BookOpenIcon,
    ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { loginAsync, resetState } from "../../state/slices/authSlice";

interface AuthCredentials {
    id: string;
    username: string;
    token: string;
}

const LoginForm = () => {
    const router = useRouter();

    //  global states (redux)
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);

    //  states
    const [username, setUsername] = useState("adrian25");
    const [password, setPassword] = useState("ryuzakiL-25");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        //  redux will handle the authentication including the loading and error states
        dispatch(loginAsync({ username, password }));
    };

    useEffect(() => {
        return () => {
            dispatch(resetState());
        };
    }, []);

    useEffect(() => {
        if (user) {
            Cookies.set(
                "user",
                JSON.stringify({
                    accessToken: user.accessToken,
                    username: user.username,
                    isAdmin: user.isAdmin,
                }),
                { expires: 1 }
            );
            router.push("/");
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg border border-orange-200 p-8">
                    {/* Logo and Title */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <BookOpenIcon className="size-12 text-orange-600" />
                            <h1 className="text-orange-800">Manage It</h1>
                        </div>
                        <p className="text-orange-700">
                            Master your finances with the Japanese Kakeibo
                            method
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="username"
                                className="text-orange-900"
                            >
                                Username
                            </label>
                            <TextInput
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="border-orange-200 focus:border-orange-400"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-orange-900"
                            >
                                Password
                            </label>
                            <TextInput
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="border-orange-200 focus:border-orange-400"
                                required
                            />
                        </div>

                        {/* Demo Credentials */}
                        {user && (
                            <div className="mt-6 p-4 bg-amber-50 rounded border border-amber-200">
                                <Spinner /> Redirecting to dashboard...
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                        >
                            {!loading && (
                                <>
                                    <ArrowRightEndOnRectangleIcon className="size-4 mr-2" />
                                    Sign In
                                </>
                            )}

                            {loading && (
                                <>
                                    <Spinner
                                        aria-label="Spinner"
                                        size="sm"
                                        light
                                    />
                                    <span className="pl-3">Loading...</span>
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
