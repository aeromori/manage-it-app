import { CategoryType } from "../types/expenses";

export const normalizeCategory = (label: string): CategoryType => {
    if (label.includes("Survival")) return "survival";
    if (label.includes("Optional")) return "optional";
    if (label.includes("Culture")) return "culture";
    if (label.includes("Unexpected")) return "unexpected";

    throw new Error(`Unknown category: ${label}`);
};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

export const calculateTotals = (
    transactions: any[],
    expenseCategories: any[],
) => {
    const totals: Record<string, number> = {};

    // initialize totals
    expenseCategories.forEach((cat) => {
        totals[cat.category] = 0;
    });

    // sum expenses
    transactions.forEach((t) => {
        const categoryName = t.category_id?.category;

        if (categoryName && totals[categoryName] !== undefined) {
            totals[categoryName] += t.amount;
        }
    });

    return totals;
};
