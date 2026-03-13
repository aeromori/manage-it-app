import {
    ArrowTrendingDownIcon,
    BanknotesIcon,
    FlagIcon,
    WalletIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "../../lib/utils";

const KeyMetrics = ({
    monthlyIncome,
    savingsGoal,
    totalExpenses,
    actualSavings,
}: {
    monthlyIncome: number;
    savingsGoal: number;
    totalExpenses: number;
    actualSavings: number;
}) => {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-orange-200 bg-white/80 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-orange-900">
                            Monthly Income
                        </CardTitle>
                        <WalletIcon className="size-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-green-700">
                            {formatCurrency(monthlyIncome)}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-orange-200 bg-white/80 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-orange-900">
                            Total Expenses
                        </CardTitle>
                        <ArrowTrendingDownIcon className="size-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-red-700">
                            {formatCurrency(totalExpenses)}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-orange-200 bg-white/80 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-orange-900">
                            Savings Goal
                        </CardTitle>
                        <FlagIcon className="size-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-blue-700">
                            {formatCurrency(savingsGoal)}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-orange-200 bg-white/80 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-orange-900">
                            Actual Savings
                        </CardTitle>
                        <BanknotesIcon className="size-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div
                            className={
                                actualSavings >= 0
                                    ? "text-purple-700"
                                    : "text-red-700"
                            }
                        >
                            {formatCurrency(actualSavings)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default KeyMetrics;
