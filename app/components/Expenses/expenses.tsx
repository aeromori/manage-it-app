"use client";

import { useState, ComponentType, SVGProps, useEffect } from "react";
import {
    BookOpenIcon,
    ExclamationCircleIcon,
    HomeIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";

import ExpenseCategory from "./expenseCategory";
import ExpenseDetails from "./expenseDetails";
import ExpenseQuestions from "./expenseQuestions";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
    getExpenseAsync,
    resetMeta,
    resetState,
    saveExpenseAsync,
} from "../../state/slices/expenseSlice";
import dayjs from "dayjs";
import {
    CategoryType,
    CategoryUIConfig,
    CategoryWithUI,
} from "../../types/expenses";

type Expense = {
    selectedCategory: string;
    amount: string;
    description: string;
};
const Expenses = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.expense.loading);
    const loadingSubmit = useSelector(
        (state: RootState) => state.expense.loadingSubmit
    );
    const categoryList = useSelector(
        (state: RootState) => state.expense.categories
    );

    const meta = useSelector((state: RootState) => state.expense.meta);

    const [expense, setExpense] = useState<Expense>({
        selectedCategory: "",
        amount: "",
        description: "",
    });

    const categoryUIConfig: Record<CategoryType, CategoryUIConfig> = {
        survival: {
            icon: HomeIcon,
            gradient: "from-red-50 to-red-100",
            border: "border-red-200",
            iconColor: "text-red-600",
            color: "red",
        },
        optional: {
            icon: ShoppingCartIcon,
            gradient: "from-blue-50 to-blue-100",
            border: "border-blue-200",
            iconColor: "text-blue-600",
            color: "blue",
        },
        culture: {
            icon: BookOpenIcon,
            gradient: "from-green-50 to-green-100",
            border: "border-green-200",
            iconColor: "text-green-600",
            color: "green",
        },
        unexpected: {
            icon: ExclamationCircleIcon,
            gradient: "from-yellow-50 to-yellow-100",
            border: "border-yellow-200",
            iconColor: "text-yellow-600",
            color: "yellow",
        },
    };

    const normalizeCategory = (label: string): CategoryType => {
        if (label.includes("Survival")) return "survival";
        if (label.includes("Optional")) return "optional";
        if (label.includes("Culture")) return "culture";
        if (label.includes("Unexpected")) return "unexpected";

        throw new Error(`Unknown category: ${label}`);
    };

    const categories: CategoryWithUI[] = categoryList.map((cat) => {
        const key = normalizeCategory(cat.category);
        return {
            ...cat,
            ...categoryUIConfig[key],
            title: cat.category,
        };
    });

    useEffect(() => {
        dispatch(getExpenseAsync());
        return () => {
            dispatch(resetState());
        };
    }, []);

    useEffect(() => {
        //  clear forms
        if (meta?.code === 200) {
            setExpense({
                selectedCategory: "",
                amount: "",
                description: "",
            });
        }

        dispatch(resetMeta());
    }, [meta]);

    const selectedCategoryData = categories.find((cat) => {
        return cat._id === expense.selectedCategory;
    });

    const handleSave = () => {
        if (selectedCategoryData === undefined) {
            alert("Please select a category");
            return;
        }
        dispatch(
            saveExpenseAsync({
                category_id: selectedCategoryData?._id, //  must get this when selected a category
                amount: parseFloat(expense.amount || "0"),
                description: expense.description,
                expense_date: dayjs().format("YYYY-MM-DD"),
            })
        );
    };

    return (
        <>
            {/* Expense Categories */}

            <ExpenseCategory
                loading={loading}
                categories={categories}
                setExpense={setExpense}
                selectedCategory={expense.selectedCategory}
            />

            {/* Expense Details */}
            {selectedCategoryData && (
                <ExpenseDetails
                    selectedCategoryData={selectedCategoryData}
                    amount={expense.amount}
                    description={expense.description}
                    setExpense={setExpense}
                    loadingSubmit={loadingSubmit}
                    handleSave={handleSave}
                />
            )}
            <ExpenseQuestions />
        </>
    );
};

export default Expenses;
