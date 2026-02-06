import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const KakeiboWisdom = () => {
    return (
        <>
            <Card className="border-orange-300 bg-linear-to-br from-amber-50 to-orange-100">
                <CardHeader>
                    <CardTitle className="text-orange-900">
                        Kakeibo Wisdom
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-orange-800">
                    <p>
                        <strong>Step 1:</strong> At the beginning of each month,
                        record your income and set a realistic savings goal.
                    </p>
                    <p>
                        <strong>Step 2:</strong> Calculate your available
                        spending budget by subtracting your savings goal from
                        your income.
                    </p>
                    <p>
                        <strong>Step 3:</strong> Track every expense throughout
                        the month in one of the four categories.
                    </p>
                    <p>
                        <strong>Step 4:</strong> At month end, reflect on your
                        spending and adjust for next month.
                    </p>
                </CardContent>
            </Card>
        </>
    );
};

export default KakeiboWisdom;
