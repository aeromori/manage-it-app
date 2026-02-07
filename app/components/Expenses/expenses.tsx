"use client";

import React, { useState, ComponentType, SVGProps } from "react";
import {
    BookOpenIcon,
    ExclamationCircleIcon,
    HomeIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import ExpenseCategory from "./expenseCategory";
import ExpenseDetails from "./expenseDetails";

type Categories = {
    title: string;
    description: string;
    type: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    color: string;
    gradient: string;
    border: string;
    iconColor: string;
};
const Expenses = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const categories: Categories[] = [
        {
            type: "survival",
            title: "Survival (Needs)",
            description: "Food, rent, utilities, transportation",
            icon: HomeIcon,
            color: "red",
            gradient: "from-red-50 to-red-100",
            border: "border-red-200",
            iconColor: "text-red-600",
        },
        {
            type: "optional",
            title: "Optional (Wants)",
            description: "Dining out, entertainment, shopping",
            icon: ShoppingCartIcon,
            color: "blue",
            gradient: "from-blue-50 to-blue-100",
            border: "border-blue-200",
            iconColor: "text-blue-600",
        },
        {
            type: "culture",
            title: "Culture",
            description: "Books, courses, hobbies, museums",
            icon: BookOpenIcon,
            color: "green",
            gradient: "from-green-50 to-green-100",
            border: "border-green-200",
            iconColor: "text-green-600",
        },
        {
            type: "unexpected",
            title: "Unexpected",
            description: "Medical, repairs, emergencies",
            icon: ExclamationCircleIcon,
            color: "yellow",
            gradient: "from-yellow-50 to-yellow-100",
            border: "border-yellow-200",
            iconColor: "text-yellow-600",
        },
    ];

    const selectedCategoryData = categories.find(
        (cat) => cat.type === selectedCategory
    );

    return (
        <>
            {/* Expense Categories */}
            <div className="grid gap-6 lg:grid-cols-2">
                <ExpenseCategory
                    categories={categories}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                />
            </div>
            {/* Expense Details */}
            {selectedCategoryData && (
                <ExpenseDetails
                    selectedCategoryData={selectedCategoryData}
                    loadingSubmit={false}
                    handleSave={() => {}}
                />
            )}
        </>
    );
};

export default Expenses;
