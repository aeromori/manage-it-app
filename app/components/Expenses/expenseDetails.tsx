import React, { ComponentType, SVGProps } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button, Label, Spinner, Textarea, TextInput } from "flowbite-react";
import {
    ArrowDownCircleIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

type Category = {
    title: string;
    description: string;
    type: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    color: string;
    gradient: string;
    border: string;
    iconColor: string;
};

type ExpenseDetailsProps = {
    selectedCategoryData: Category | undefined;
    loadingSubmit: boolean;
    handleSave: () => void;
};

const ExpenseDetails = ({
    selectedCategoryData,
    loadingSubmit,
    handleSave,
}: ExpenseDetailsProps) => {
    console.log({ selectedCategoryData });
    return (
        <>
            <Card
                className={`border-orange-200 bg-linear-to-br  w-full ${selectedCategoryData?.gradient}`}
            >
                <CardHeader>
                    <CardTitle className="text-orange-900">
                        Expense Details
                    </CardTitle>
                    <CardDescription>
                        Adding to {selectedCategoryData?.title}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="income" className="text-orange-900">
                            Amount
                        </Label>
                        <div className="relative">
                            <TextInput
                                id="income"
                                type="number"
                                className="
                                [&_input]:bg-green-50
                                [&_input]:border-green-300
                                [&_input]:focus:ring-green-400
                                [&_input]:focus:border-green-400
                                "
                                // value={monthlyIncome.income}
                                // onChange={(e) =>
                                //     setMonthlyIncome({
                                //         ...monthlyIncome,
                                //         income: e.target.value,
                                //     })
                                // }
                                icon={CurrencyDollarIcon}
                                color="success"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <Label htmlFor="income" className="text-orange-900">
                            Description (Optional)
                        </Label>
                        <div className="relative">
                            <Textarea
                                id="income"
                                className="
                                [&_input]:bg-green-50
                                [&_input]:border-green-300
                                [&_input]:focus:ring-green-400
                                [&_input]:focus:border-green-400
                                "
                                // value={monthlyIncome.income}
                                // onChange={(e) =>
                                //     setMonthlyIncome({
                                //         ...monthlyIncome,
                                //         income: e.target.value,
                                //     })
                                // }
                                color="success"
                                placeholder="What did you buy?"
                            />
                        </div>
                    </div>
                    <div className="">
                        <Button
                            className="bg-orange-600 hover:bg-orange-700 w-full"
                            size="lg"
                            onClick={() => handleSave()}
                            type="submit"
                        >
                            {!loadingSubmit && (
                                <>
                                    <ArrowDownCircleIcon className="size-4 mr-2" />
                                    Add Expense
                                </>
                            )}

                            {loadingSubmit && (
                                <>
                                    <Spinner
                                        aria-label="Spinner"
                                        size="sm"
                                        light
                                    />
                                    <span className="pl-3">Loading...</span>
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default ExpenseDetails;
