"use client";

import React, { ComponentType, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
    HomeIcon,
    ArrowLeftEndOnRectangleIcon,
    UserGroupIcon,
    BookOpenIcon,
    WalletIcon,
    ShoppingCartIcon,
    ClockIcon,
    ChartPieIcon,
    TrophyIcon,
} from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";
import { useRouter, usePathname } from "next/navigation";

interface SideBarProps {
    setActivePage: (path: string) => void;
    activePage: string;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    isAdmin?: boolean;
    username?: string;
}
interface routesType {
    id: number;
    name: string;
    path: string;
    icon?: ComponentType<{ className?: string }>;
}

const baseRoutes: routesType[] = [
    {
        id: 1,
        name: "Dashboard",
        path: "/",
        icon: HomeIcon,
    },
    {
        id: 2,
        name: "Income",
        path: "/income",
        icon: WalletIcon,
    },
    {
        id: 3,
        name: "Expenses",
        path: "/expenses",
        icon: ShoppingCartIcon,
    },
    {
        id: 4,
        name: "History",
        path: "/history",
        icon: ClockIcon,
    },
    {
        id: 5,
        name: "Summary",
        path: "/summary",
        icon: ChartPieIcon,
    },
    {
        id: 6,
        name: "Achievements",
        path: "/achievements",
        icon: TrophyIcon,
    },
];

const adminRoutes: routesType[] = [
    { id: 7, name: "Users", path: "/users", icon: UserGroupIcon },
];

const SideBar = ({
    setActivePage,
    activePage,
    setIsOpen,
    isOpen,
    isAdmin,
    username,
}: SideBarProps) => {
    const router = useRouter();

    // put user to routes array if account is admin
    const routes: routesType[] = isAdmin
        ? [...baseRoutes, ...adminRoutes]
        : baseRoutes;

    const handleNavigate = (path: string) => {
        setActivePage(path);
    };

    const onLogout = () => {
        Cookies.remove("user");
        router.push("/login");
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r 
                border-orange-200 min-h-screen flex flex-col transform transition-transform 
                duration-300 ease-in-out overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <BookOpenIcon className="size-8 text-orange-600" />
                            <h2 className="text-orange-800">Manage It</h2>
                        </div>
                        {/* Close button for mobile */}
                        <button
                            className="md:hidden bg-none text-orange-600 hover:text-orange-800"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="size-6">x</span>
                        </button>
                    </div>
                    <p className="text-sm text-orange-600">Kakeibo Budgeting</p>
                </div>

                {/* User Info */}
                <div className="px-6 py-4 border-b border-orange-100 bg-amber-50">
                    <p className="text-sm text-orange-700">Logged in as</p>
                    <p className="text-orange-900">{username && username}</p>
                    {isAdmin && isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-orange-200 text-orange-800 text-xs rounded">
                            Admin
                        </span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 overflow-y-auto">
                    <ul className="space-y-1">
                        <>
                            {routes.map((route) => {
                                const Icon = route.icon;
                                const isActive = activePage === route.path;

                                return (
                                    <li key={route.id}>
                                        <button
                                            onClick={() => {
                                                handleNavigate(route.path);
                                                router.push(route.path);
                                            }}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                                isActive
                                                    ? "bg-orange-100 text-orange-900"
                                                    : "text-orange-700 hover:bg-orange-50"
                                            }`}
                                        >
                                            {Icon && (
                                                <Icon className="size-5" />
                                            )}

                                            <span>{route.name}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </>
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-3 border-t border-orange-200 shrink-0">
                    <Button
                        onClick={onLogout}
                        outline={true}
                        color={"yellow"}
                        className="w-full justify-start gap-3 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-900"
                    >
                        <ArrowLeftEndOnRectangleIcon className="size-5" />
                        Logout
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SideBar;
