import React from "react";
import { Card, CardContent } from "../ui/card";
import { CalendarDateRangeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";
import dayjs from "dayjs";

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

type TransactionListProps = {
    selectedDate: Date | null;
    filteredTransactions: Transaction[];
    formatCurrency: (amount: number) => string;
    deleteTransaction: (transactionId: string) => void;
    loading: boolean;
};
const TransactionList = ({
    selectedDate,
    filteredTransactions,
    formatCurrency,
    deleteTransaction,
    loading,
}: TransactionListProps) => {
    const formatDate = (dateString: string) => {
        return dayjs(dateString).format("MMM D, YYYY");
        // return new Date(dateString).toLocaleDateString("en-US", {
        //     month: "short",
        //     day: "numeric",
        //     year: "numeric",
        //     hour: "2-digit",
        //     minute: "2-digit",
        // });
    };

    const formatMonthYear = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="space-y-3">
                <Card
                    key="loading"
                    className="border-orange-200 bg-white/80 backdrop-blur animate-pulse"
                >
                    <CardContent className="pt-6">
                        <div className="text-center py-8 text-orange-600">
                            <CalendarDateRangeIcon className="size-12 mx-auto mb-3 opacity-50" />
                            <p>Loading transactions...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
                <Card
                    key="empty"
                    className="border-orange-200 bg-white/80 backdrop-blur"
                >
                    <CardContent className="pt-6">
                        <div className="text-center py-8 text-orange-600">
                            <CalendarDateRangeIcon className="size-12 mx-auto mb-3 opacity-50" />
                            <p>No transactions found</p>
                            <p className="text-orange-500 text-sm">
                                {selectedDate
                                    ? `No transactions in ${formatMonthYear(selectedDate)}`
                                    : "Start tracking your expenses to see them here"}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                filteredTransactions.map((transaction) => {
                    const Icon = transaction.categoryUI.icon;
                    const backgroundColor =
                        transaction.categoryUI.backgroundColor;
                    const border = transaction.categoryUI.border;
                    const textColor = transaction.categoryUI.textColor;

                    return (
                        <Card
                            key={transaction._id}
                            className="border-orange-200 bg-white/80 backdrop-blur hover:shadow-md transition-shadow"
                        >
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`p-2 rounded-lg ${border} ${backgroundColor}`}
                                    >
                                        {Icon && <Icon className="size-5" />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1 min-w-0">
                                                <div className="text-orange-900 truncate">
                                                    {transaction.description}
                                                </div>
                                                <div className="text-orange-600 text-sm">
                                                    {formatDate(
                                                        transaction.expense_date.toString()
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className="text-red-700">
                                                    {formatCurrency(
                                                        transaction.amount
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <div
                                                className={`rounded-lg mt-2 p-1 ${textColor} ${border} ${backgroundColor}`}
                                            >
                                                <span className="text-xs">
                                                    {transaction.category_id.category
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        transaction.category_id.category.slice(
                                                            1
                                                        )}{" "}
                                                </span>
                                            </div>
                                            {/* <Badge variant="outline" className={colorClass}>
                                    {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                                  </Badge> */}

                                            <Button
                                                // ghost
                                                size="sm"
                                                onClick={() =>
                                                    deleteTransaction(
                                                        transaction._id
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                                            >
                                                <TrashIcon className="size-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })
            )}
        </div>
    );
};

export default TransactionList;
