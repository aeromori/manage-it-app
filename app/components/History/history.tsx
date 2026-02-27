"use client";

import { useState, useEffect } from "react";
import SearchHistory from "./searchHistory";
import TotalExpenses from "./totalExpenses";
import TransactionList from "./transactionList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
    getExpensesAsync,
    getCategoriesAsync,
    resetState,
} from "../../state/slices/historySlice";
import { normalizeCategory } from "@/app/lib/utils";
import { categoryUIConfig } from "@/app/lib/category/ui-config";

type Category = {
    _id: string;
    category: string;
    description: string;
};

type Transaction = {
    _id: string;
    monthly_budget_id: string;
    category_id: Category;
    amount: number;
    description: string;
    expense_date: Date;
    categoryUI: {
        icon: React.ComponentType<any>;
        gradient: string;
        border: string;
        iconColor: string;
        color: string;
        backgroundColor: string;
        textColor: string;
    };
};

const History = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.history.loading);
    const loadingCategories = useSelector(
        (state: RootState) => state.history.loadingCategories
    );
    const transactions = useSelector(
        (state: RootState) => state.history.transactions
    );
    const categories = useSelector(
        (state: RootState) => state.history.categories
    );

    const [filters, setFilters] = useState<{
        category_id: string;
        month: Date | null;
    }>({
        category_id: "all",
        month: null,
    });
    const [total, setTotal] = useState<number>(0);

    const transactionsWithUI: Transaction[] = transactions.map((txn) => {
        const key = normalizeCategory(txn.category_id.category);
        const ui = categoryUIConfig[key];

        return {
            ...txn,
            categoryUI: ui,
        };
    });

    useEffect(() => {
        dispatch(getExpensesAsync({ date: filters.month || undefined }));
        dispatch(getCategoriesAsync());
        return () => {
            resetState();
        };
    }, []);

    useEffect(() => {
        if (transactions.length) {
            const total = transactions.reduce((sum, p) => sum + p.amount, 0);
            setTotal(total);
        } else {
            setTotal(0);
        }
    }, [transactions]);

    useEffect(() => {
        dispatch(
            getExpensesAsync({
                category_id: filters.category_id,
                date: filters.month || undefined,
            })
        );
    }, [filters]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const deleteTransaction = (transactionId: string) => {
        console.log(`Delete transaction with ID: ${transactionId}`);
    };

    return (
        <>
            <SearchHistory
                categories={categories}
                loadingCategories={loadingCategories}
                filters={filters}
                setFilters={setFilters}
            />
            <TotalExpenses
                total={total}
                numTransactions={transactions.length}
                formatCurrency={formatCurrency}
            />
            <TransactionList
                selectedDate={filters.month}
                filteredTransactions={transactionsWithUI}
                formatCurrency={formatCurrency}
                deleteTransaction={deleteTransaction}
                loading={loading}
            />
        </>
    );
};

export default History;
