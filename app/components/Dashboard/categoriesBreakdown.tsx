import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "../../lib/utils";

const CategoriesBreakdown = () => {
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
                        {[
                            {
                                name: "Survival (Needs)",
                                key: "survival" as const,
                                color: "bg-red-500",
                                description:
                                    "Food, housing, utilities, transport",
                            },
                            {
                                name: "Optional (Wants)",
                                key: "optional" as const,
                                color: "bg-blue-500",
                                description:
                                    "Dining out, shopping, subscriptions",
                            },
                            {
                                name: "Culture",
                                key: "culture" as const,
                                color: "bg-green-500",
                                description:
                                    "Books, events, hobbies, self-improvement",
                            },
                            {
                                name: "Unexpected",
                                key: "unexpected" as const,
                                color: "bg-yellow-500",
                                description: "Emergency expenses, repairs",
                            },
                        ].map((category) => {
                            // const amount =
                            //     totals.expensesByCategory[category.key];
                            // const percentage =
                            //     totals.totalExpenses > 0
                            //         ? (amount / totals.totalExpenses) * 100
                            //         : 0;

                            const amount = 100;
                            const percentage =
                                500 > 0 ? (amount / 500) * 100 : 0;

                            return (
                                <div key={category.key} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-orange-900">
                                                {category.name}
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
                                            className={`h-2 rounded-full ${category.color}`}
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
