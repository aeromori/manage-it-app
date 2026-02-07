import React from "react";
import Expenses from "../../components/Expenses/expenses";

const ExpensesPage = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-orange-900 mb-1">Add expenses</h3>
            <p className="text-orange-700">
                Record your spending in one of the four Kakeibo categories
            </p>

            <Expenses />
        </div>
    );
};

export default ExpensesPage;
