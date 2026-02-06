"use client";

import { useEffect, useState } from "react";
import MonthlyIncome from "./monthlyIncome";
import SavingsGoal from "./savingsGoal";
import BudgetSummary from "./budgetSummary";
import KakeiboWisdom from "./kakeiboWisdom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
    resetState,
    saveIncomeAsync,
    fetchIncomeAsync,
} from "../../state/slices/incomeSlice";
import dayjs from "dayjs";

type MonthlyIncome = {
    income: string;
    savings: string;
};

const Income = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.income.loading);
    const loadingSubmit = useSelector(
        (state: RootState) => state.income.loadingSubmit
    );
    const incomeData = useSelector((state: RootState) => state.income.income);

    const [monthlyIncome, setMonthlyIncome] = useState<MonthlyIncome>({
        income: "",
        savings: "",
    });

    useEffect(() => {
        dispatch(fetchIncomeAsync());
        return () => {
            dispatch(resetState());
        };
    }, []);

    useEffect(() => {
        setMonthlyIncome({
            income: incomeData?.income_amount?.toString() || "",
            savings: incomeData?.savings_goal?.toString() || "",
        });
    }, [incomeData]);

    const income = monthlyIncome.income || "0";
    const savings = monthlyIncome.savings || "0";

    const suggestedSavings = parseFloat(income) * 0.2;
    const availableAfterSavings =
        parseFloat(monthlyIncome.income || "0") -
        parseFloat(monthlyIncome.savings || "0");

    const handleSave = () => {
        console.log("Saved income and savings goal: ", { monthlyIncome });
        dispatch(
            saveIncomeAsync({
                income_amount: parseFloat(monthlyIncome.income || "0"),
                savings_goal: parseFloat(monthlyIncome.savings || "0"),
                period_date: dayjs().format("YYYY-MM-DD"),
            })
        );
    };

    return (
        <>
            {/* <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("PRESSED ENTER");
                }}
            > */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Monthly Income component */}
                <MonthlyIncome
                    monthlyIncome={monthlyIncome}
                    setMonthlyIncome={setMonthlyIncome}
                    loading={loading}
                />

                {/* Savings Goal Component */}
                <SavingsGoal
                    monthlyIncome={monthlyIncome}
                    setMonthlyIncome={setMonthlyIncome}
                    suggestedSavings={suggestedSavings}
                    loading={loading}
                />
            </div>
            <BudgetSummary
                income={income}
                savingsGoal={savings}
                suggestedSavings={suggestedSavings}
                availableAfterSavings={availableAfterSavings}
                handleSave={handleSave}
                loading={loading}
                loadingSubmit={loadingSubmit}
            />
            <KakeiboWisdom />
            {/* </form> */}
        </>
    );
};

export default Income;
