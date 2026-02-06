"use client";

import React, { useState } from "react";
import { Label, Spinner, TextInput } from "flowbite-react";
import Loading from "../Loading/loading";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { WalletIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

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
    loading: boolean;
};

const MonthlyIncome = ({
    monthlyIncome,
    setMonthlyIncome,
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
            <Card className="border-orange-200 bg-white/80 backdrop-blur h-full">
                <>
                    {/* Card Header */}
                    <CardHeader>
                        <div className="flex item-center gap-2">
                            <WalletIcon className="size-5 text-green-600" />
                            {/* Card Title */}
                            <CardTitle className="text-orange-900">
                                Monthly Income
                            </CardTitle>
                        </div>
                        {/* Card Description */}
                        <CardDescription>
                            <span>
                                Enter your total monthly income after taxes
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="income" className="text-orange-900">
                                Income Amount
                            </Label>
                            <div className="relative">
                                <TextInput
                                    id="income"
                                    type="number"
                                    value={monthlyIncome.income}
                                    onChange={(e) =>
                                        setMonthlyIncome({
                                            ...monthlyIncome,
                                            income: e.target.value,
                                        })
                                    }
                                    icon={CurrencyDollarIcon}
                                    color="success"
                                    placeholder="0.00"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </CardContent>
                </>
            </Card>
        </div>
    );
};

export default MonthlyIncome;
