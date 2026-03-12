"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Label, TextInput } from "flowbite-react";
import { CurrencyDollarIcon, FlagIcon } from "@heroicons/react/24/outline";
import Loading from "../Loading/loading";

type MonthlyIncomeProps = {
    monthlyIncome: {
        income: string;
        savings: string;
    };
    setMonthlyIncome: React.Dispatch<
        React.SetStateAction<{
            income: string;
            savings: string;
        }>
    >;
    suggestedSavings: number;
    loading: boolean;
};

const SavingsGoal = ({
    monthlyIncome,
    setMonthlyIncome,
    suggestedSavings,
    loading,
}: MonthlyIncomeProps) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <Card className="border-orange-200 bg-white/80 backdrop-blur h-full w-full">
                    <Loading
                        aria-label="Loading monthly income data"
                        text="Loading monthly income data"
                    />
                </Card>
            </div>
        );
    }

    return (
        <div className="h-full">
            <Card className="border-orange-200 bg-white/80 backdrop-blur">
                <>
                    {/* Card Header */}
                    <CardHeader>
                        <div className="flex item-center gap-2">
                            <FlagIcon className="size-5 text-blue-600" />
                            {/* Card Title */}
                            <CardTitle className="text-orange-900">
                                Savings Goal
                            </CardTitle>
                        </div>
                        {/* Card Description */}
                        <CardDescription>
                            <span>
                                How much do you want to save this month?
                            </span>
                        </CardDescription>
                    </CardHeader>
                    {/* Card Content */}
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="savings"
                                className="text-orange-900"
                            >
                                Savings Amount
                            </Label>
                            <div className="relative">
                                <TextInput
                                    id="savings"
                                    type="number"
                                    value={monthlyIncome.savings}
                                    onChange={(e) =>
                                        setMonthlyIncome({
                                            ...monthlyIncome,
                                            savings: e.target.value,
                                        })
                                    }
                                    icon={CurrencyDollarIcon}
                                    color="success"
                                    placeholder="0.00"
                                    step="0.01"
                                />
                            </div>
                        </div>
                        {parseFloat(monthlyIncome.income) > 0 && (
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="text-blue-900">
                                    Suggested: ${suggestedSavings.toFixed(2)}
                                </div>
                                <div className="text-blue-700">
                                    (20% of income)
                                </div>
                            </div>
                        )}
                    </CardContent>
                </>
            </Card>
        </div>
    );
};

export default SavingsGoal;
