import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    ArrowDownCircleIcon,
    ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { Button, Spinner } from "flowbite-react";
import Loading from "../Loading/loading";

type BudgetSummary = {
    suggestedSavings: number;
    income: string;
    savingsGoal: string;
    availableAfterSavings: number;
    handleSave: () => void;
    loading: boolean;
    loadingSubmit: boolean;
};

const BudgetSummary = ({
    income,
    savingsGoal,
    suggestedSavings,
    availableAfterSavings,
    handleSave,
    loading,
    loadingSubmit,
}: BudgetSummary) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <Card className="border-orange-200 bg-white/80 backdrop-blur h-full w-full">
                    <Loading
                        aria-label="Loading Budget Summary"
                        text="Loading Budget Summary"
                    />
                </Card>
            </div>
        );
    }

    return (
        <>
            {/* Summary Card */}
            <Card className="border-orange-200 bg-white/80 backdrop-blur">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <ClipboardDocumentIcon className="size-5 text-purple-600" />
                        <CardTitle className="text-orange-900">
                            Budget Summary
                        </CardTitle>
                    </div>
                    <CardDescription>
                        Your available budget after savings
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-linear-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                            <span className="text-green-900">
                                Monthly Income
                            </span>
                            <span className="text-green-800">
                                ${parseFloat(income || "0").toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                            <span className="text-blue-900">Savings Goal</span>
                            <span className="text-blue-800">
                                - ${parseFloat(savingsGoal || "0").toFixed(2)}
                            </span>
                        </div>
                        <div className="h-px bg-orange-300" />
                        <div className="flex items-center justify-between p-4 bg-linear-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                            <span className="text-purple-900">
                                Available to Spend
                            </span>
                            <span className="text-purple-800">
                                ${availableAfterSavings.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end">
                <Button
                    className="bg-orange-600 hover:bg-orange-700"
                    size="lg"
                    onClick={() => handleSave()}
                    type="submit"
                >
                    {!loadingSubmit && (
                        <>
                            <ArrowDownCircleIcon className="size-4 mr-2" />
                            Save Settings
                        </>
                    )}

                    {loadingSubmit && (
                        <>
                            <Spinner aria-label="Spinner" size="sm" light />
                            <span className="pl-3">Loading...</span>
                        </>
                    )}
                </Button>
            </div>
        </>
    );
};

export default BudgetSummary;
