"use client";

import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import SideBar from "./sidebar";
import { usePathname } from "next/navigation";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const [activePage, setActivePage] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const user = Cookies.get("user");
        const parsedUser = user ? JSON.parse(user) : null;
        const username = parsedUser ? parsedUser.username : "Guest";
        const isAdmin: boolean = parsedUser ? parsedUser.isAdmin : false;

        setUsername(username);
        setIsAdmin(isAdmin);
        setActivePage(pathname);
    }, []);

    return (
        <>
            {/* <Header /> */}
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex">
                {/* Sidebar */}
                <SideBar
                    setActivePage={setActivePage}
                    activePage={activePage}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    isAdmin={isAdmin}
                    username={username}
                />

                {/* Children pages */}
                <div className="flex-1 overflow-auto">
                    {/* Mobile Header with Menu Button */}
                    <div className="md:hidden sticky top-0 z-30 bg-white border-b border-orange-200 px-4 py-3 flex items-center justify-between">
                        <Button
                            onClick={() => setIsOpen(true)}
                            outline
                            size="sm"
                            className="border-orange-200 text-orange-700 hover:bg-orange-50"
                        >
                            <Bars3Icon className="size-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <h2 className="text-orange-800">Manage It</h2>
                        </div>
                        <div className="w-10" />
                    </div>
                    <div className="container mx-auto px-4 md:px-8 py-4 md:py-8 max-w-7xl">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BaseLayout;
