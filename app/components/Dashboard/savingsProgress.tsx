import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { formatCurrency } from "@/app/lib/utils";

const SavingsProgress = () => {
    return (
        <>
            <Card className="border-orange-200 bg-white/80 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-orange-900">
                        Savings Progress
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-orange-800">
                            <span>Progress to Goal</span>
                            <span>
                                {/*savingsProgress.toFixed(1)*/ (10).toFixed(1)}
                                %
                            </span>
                        </div>
                        <Progress
                            // value={Math.min(savingsProgress, 100)} // temporary comment
                            value={Math.min(10, 100)}
                            className="h-3"
                        />
                    </div>
                    <div className="flex items-center justify-between text-orange-700">
                        <span>Remaining to save</span>
                        <span>
                            {formatCurrency(
                                Math.max(
                                    0,
                                    // monthlyData.savingsGoal -
                                    //     totals.actualSavings,
                                    1500 - 1000,
                                ),
                            )}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default SavingsProgress;
