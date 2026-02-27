import { CategoryType } from "../types/expenses";

export const normalizeCategory = (label: string): CategoryType => {
    if (label.includes("Survival")) return "survival";
    if (label.includes("Optional")) return "optional";
    if (label.includes("Culture")) return "culture";
    if (label.includes("Unexpected")) return "unexpected";

    throw new Error(`Unknown category: ${label}`);
};
