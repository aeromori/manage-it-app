"use client";

import { useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import KeyMetrics from "./keyMetrics";
import SavingsProgress from "./savingsProgress";
import CategoriesBreakdown from "./categoriesBreakdown";

import { AppDispatch, RootState } from "../../state/store";

import {
    getDashboardDataAsync,
    resetState,
} from "../../state/slices/dashboardSlice";
import { calculateTotals, normalizeCategory } from "../../lib/utils";
import { CategoryWithUI } from "../../types/expenses";
import { categoryUIConfig } from "../../lib/category/ui-config";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    const loading = useSelector((state: RootState) => state.dashboard.loading);

    // Dashboard data
    const monthly_budget = useSelector(
        (state: RootState) => state.dashboard.monthly_budget,
    );
    const expenses = useSelector(
        (state: RootState) => state.dashboard.expenses,
    );
    const total_expenses = useSelector(
        (state: RootState) => state.dashboard.total_expenses,
    );
    const expense_categories = useSelector(
        (state: RootState) => state.dashboard.expense_categories,
    );
    const meta = useSelector((state: RootState) => state.dashboard.meta);

    const actualSavings =
        monthly_budget?.income_amount && total_expenses
            ? monthly_budget.income_amount - total_expenses
            : 0;

    const totalExpenseByCategory = calculateTotals(
        expenses,
        expense_categories,
    );

    const categories: CategoryWithUI[] = expense_categories.map((cat) => {
        const key = normalizeCategory(cat.category);
        return {
            ...cat,
            ...categoryUIConfig[key],
            title: cat.category,
        };
    });

    useEffect(() => {
        dispatch(getDashboardDataAsync({ date: dayjs().toISOString() }));

        return () => {
            dispatch(resetState());
        };
    }, []);

    return (
        <>
            <KeyMetrics
                monthlyIncome={monthly_budget?.income_amount || 0}
                savingsGoal={monthly_budget?.savings_goal || 0}
                totalExpenses={total_expenses || 0}
                actualSavings={actualSavings}
            />
            <SavingsProgress
                savingsGoal={monthly_budget?.savings_goal || 0}
                actualSavings={actualSavings}
            />
            <CategoriesBreakdown
                expenseCategories={categories || []}
                totalExpenseByCategory={totalExpenseByCategory}
                totalExpenses={total_expenses || 0}
            />
        </>
    );
};

export default Dashboard;
