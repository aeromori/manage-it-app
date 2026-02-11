import { Dispatch, SetStateAction } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button, Label, Spinner, Textarea, TextInput } from "flowbite-react";
import { CurrencyDollarIcon, PlusIcon } from "@heroicons/react/24/outline";
import { CategoryWithUI } from "../../types/expenses";

type Expense = {
    selectedCategory: string;
    amount: string;
    description: string;
};

type ExpenseDetailsProps = {
    selectedCategoryData: CategoryWithUI | undefined;
    loadingSubmit: boolean;
    amount: string;
    description: string;
    setExpense: Dispatch<SetStateAction<Expense>>;
    handleSave: () => void;
};

const ExpenseDetails = ({
    selectedCategoryData,
    loadingSubmit,
    amount,
    description,
    setExpense,
    handleSave,
}: ExpenseDetailsProps) => {
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
                                icon={CurrencyDollarIcon}
                                color="success"
                                placeholder="0.00"
                                step="0.01"
                                value={amount}
                                onChange={(e) =>
                                    setExpense((prev) => ({
                                        ...prev,
                                        amount: e.target.value,
                                    }))
                                }
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
                                color="success"
                                placeholder="What did you buy?"
                                value={description}
                                onChange={(e) => {
                                    setExpense((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }));
                                }}
                            />
                        </div>
                    </div>
                    <div className="">
                        <Button
                            className="bg-orange-600 hover:bg-orange-700 w-full"
                            size="lg"
                            onClick={() => handleSave()}
                            type="submit"
                            disabled={!amount || loadingSubmit}
                        >
                            {!loadingSubmit && (
                                <>
                                    <PlusIcon className="size-4 mr-2" />
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
