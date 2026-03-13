import { formatCurrency } from "../../lib/utils";
import { Card, CardContent } from "../ui/card";

type TransactionListProps = {
    total: number;
    numTransactions: number;
};

const TotalExpenses = ({ total, numTransactions }: TransactionListProps) => {
    return (
        <div className="space-y-3">
            {/* Summary */}
            <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-red-50">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-orange-700">
                                Total Expenses
                            </div>
                            <div className="text-orange-900">
                                {numTransactions} transaction
                            </div>
                        </div>
                        <div className="text-red-700">
                            {formatCurrency(total)}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TotalExpenses;
