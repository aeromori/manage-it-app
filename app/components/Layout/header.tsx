"use client";
import React, { Suspense, useState } from "react";

const Header = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="m-0 px-2 py-3 flex justify-between items-center bg-gray-300">
                <h1 className="text-2xl font-bold text-sky-600">NextJs</h1>

                {/* Mobile Menu */}
                <nav className="hidden md:flex space-x-6">
                    <a href="/" className="text-gray-700 hover:text-sky-600">
                        Home
                    </a>
                    <a
                        href="/users"
                        className="text-gray-700 hover:text-sky-600"
                    >
                        Users
                    </a>
                    <a
                        href="/about"
                        className="text-gray-700 hover:text-sky-600"
                    >
                        About
                    </a>
                    <a
                        href="/contact"
                        className="text-gray-700 hover:text-sky-600"
                    >
                        Contact
                    </a>
                </nav>

                {/* Mobile button */}
                <button
                    className="md:hidden flex flex-col justify-center items-center
                    w-10 h-10
                    rounded-md border border-gray-300
                    bg-white hover:bg-gray-100
                    active:bg-gray-200
                    transition"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>
            {/* Mobile menu */}
            {open && (
                <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-2 space-y-2">
                    <a
                        href="/"
                        className="block text-gray-700 hover:text-sky-600"
                    >
                        Home
                    </a>
                    <a
                        href="/users"
                        className="block text-gray-700 hover:text-sky-600"
                    >
                        Users
                    </a>
                    <a
                        href="/about"
                        className="block text-gray-700 hover:text-sky-600"
                    >
                        About
                    </a>
                    <a
                        href="/contact"
                        className="block text-gray-700 hover:text-sky-600"
                    >
                        Contact
                    </a>
                </nav>
            )}
        </>
    );
};

export default Header;
