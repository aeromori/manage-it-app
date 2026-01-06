"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import {
    HomeIcon,
    Cog6ToothIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

const routes: { name: string; path: string; icon?: any }[] = [
    {
        name: "Dashboard",
        path: "/",
        icon: <HomeIcon className="w-6 h-6" />,
    },
    {
        name: "Tasks",
        path: "/tasks",
        icon: <Cog6ToothIcon className="w-6 h-6" />,
    },
    {
        name: "Users",
        path: "/users",
        icon: <UserGroupIcon className="w-6 h-6" />,
    },
];

const SideBar = () => {
    const [activePage, setActivePage] = useState<string>("/");
    const router = useRouter();

    return (
        <>
            <ul className="space-y-2 mt-4 text-emerald-700">
                {routes.map((route) => (
                    <li key={route.path}>
                        <Link
                            href={route.path}
                            className="flex items-center gap-2 p-2 rounded font-medium hover:bg-emerald-100"
                        >
                            <span className="flex items-center gap-2">
                                {route.icon} {route.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* <Link
                href={"#"}
                onClick={() => {
                    Cookies.remove("user");
                }}
            >
                Logout
            </Link> */}
            <Button
                onClick={() => {
                    Cookies.remove("user");
                    router.push("/login");
                }}
            >
                Logout
            </Button>
        </>
    );
};

export default SideBar;
