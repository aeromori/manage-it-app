"use client";

import { useState, useEffect } from "react";

import ExpenseCategory from "./expenseCategory";
import ExpenseDetails from "./expenseDetails";
import ExpenseQuestions from "./expenseQuestions";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
    getCategoriesAsync,
    resetMeta,
    resetState,
    saveExpenseAsync,
} from "../../state/slices/expenseSlice";
import dayjs from "dayjs";
import { CategoryType, CategoryWithUI } from "../../types/expenses";
import { categoryUIConfig } from "@/app/lib/category/ui-config";
import { normalizeCategory } from "@/app/lib/utils";

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

    const categories: CategoryWithUI[] = categoryList.map((cat) => {
        const key = normalizeCategory(cat.category);
        return {
            ...cat,
            ...categoryUIConfig[key],
            title: cat.category,
        };
    });

    useEffect(() => {
        dispatch(getCategoriesAsync());
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
