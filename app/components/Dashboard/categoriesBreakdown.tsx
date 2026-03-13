import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "../../lib/utils";
import { CategoryWithUI } from "../../types/expenses";

type TotalExpenseByCategory = {
    [key: string]: number;
};

type CategoriesBreakdownProps = {
    expenseCategories: CategoryWithUI[] | [];
    totalExpenses: number;
    totalExpenseByCategory: TotalExpenseByCategory;
};

const CategoriesBreakdown = ({
    expenseCategories,
    totalExpenses,
    totalExpenseByCategory,
}: CategoriesBreakdownProps) => {
    return (
        <>
            <Card className="border-orange-200 bg-white/80 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-orange-900">
                        Kakeibo Categories
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {expenseCategories.map((category) => {
                            const amount =
                                totalExpenseByCategory[category.category];
                            const percentage =
                                totalExpenses > 0
                                    ? (amount / totalExpenses) * 100
                                    : 0;

                            return (
                                <div key={category._id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-orange-900">
                                                {category.category}
                                            </div>
                                            <div className="text-orange-600">
                                                {category.description}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-orange-900">
                                                {formatCurrency(amount)}
                                            </div>
                                            <div className="text-orange-600">
                                                {percentage.toFixed(1)}%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`h-2 rounded-full ${category.progressBgColor}`}
                                            style={{
                                                width: `${percentage}%`,
                                                minWidth:
                                                    percentage > 0
                                                        ? "2%"
                                                        : "0%",
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default CategoriesBreakdown;
