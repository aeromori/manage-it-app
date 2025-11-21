import React from "react";
import Header from "./header";
import SideBar from "./sidebar";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {/* <Header /> */}
            <div className="flex">
                <div className="w-1/6 h-screen pl-2 pr-2 bg-green-50">
                    {/* Title */}
                    <div className="p-2">
                        <h4 className="text-4xl font-bold bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent tracking-tight">
                            Manage It
                        </h4>
                    </div>
                    {/* Sidebar and routes */}
                    <div>
                        <SideBar />
                    </div>
                </div>
                <div className="flex-1 pl-2">{children}</div>
            </div>
        </>
    );
};

export default BaseLayout;
