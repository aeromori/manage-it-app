import { Dispatch, SetStateAction } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CategoryWithUI } from "../../types/expenses";
import Loading from "../Loading/loading";

type Expense = {
    selectedCategory: string;
    amount: string;
    description: string;
};

type ExpenseCategoryProps = {
    loading: boolean;
    categories: CategoryWithUI[] | [];
    setExpense: Dispatch<SetStateAction<Expense>>;
    selectedCategory: string;
};
const ExpenseCategory = ({
    loading,
    categories,
    setExpense,
    selectedCategory,
}: ExpenseCategoryProps) => {
    if (loading) {
        return (
            <div className="justify-center h-full w-full">
                <Card className="border-orange-200 bg-white/80 backdrop-blur">
                    <Loading
                        aria-label="Loading Categories"
                        text="Loading Categories"
                    />
                </Card>
            </div>
        );
    }

    return (
        <>
            {!loading && (
                <div className="grid gap-6 lg:grid-cols-2">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const isSelected = category._id === selectedCategory;

                        return (
                            <Card
                                key={category._id}
                                className={`cursor-pointer transition-all ${isSelected ? `${category.border} bg-linear-to-br ${category.gradient} ring-2 ring-${category.color}-400` : "border-orange-200 bg-white/80 hover:bg-orange-50"}`}
                                onClick={() =>
                                    setExpense((prev) => ({
                                        ...prev,
                                        selectedCategory: category._id,
                                        amount: "",
                                        description: "",
                                    }))
                                }
                            >
                                <CardHeader>
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`p-2 rounded-lg bg-white ${category.border}`}
                                        >
                                            <Icon
                                                className={`size-5 ${category.iconColor}`}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-orange-900">
                                                {category.title}
                                            </CardTitle>
                                            <CardDescription className="mt-1">
                                                {category.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default ExpenseCategory;
