import { CategoryType, CategoryUIConfig } from "@/app/types/expenses";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export const categoryUIConfig: Record<CategoryType, CategoryUIConfig> = {
    survival: {
        icon: HomeIcon,
        gradient: "from-red-50 to-red-100",
        backgroundColor: "bg-red-100",
        border: "border-red-200",
        iconColor: "text-red-600",
        textColor: "text-red-800",
        color: "red",
    },
    optional: {
        icon: ShoppingCartIcon,
        gradient: "from-blue-50 to-blue-100",
        backgroundColor: "bg-blue-100",
        border: "border-blue-200",
        iconColor: "text-blue-600",
        textColor: "text-blue-800",
        color: "blue",
    },
    culture: {
        icon: BookOpenIcon,
        gradient: "from-green-50 to-green-100",
        backgroundColor: "bg-green-100",
        border: "border-green-200",
        iconColor: "text-green-600",
        textColor: "text-green-800",
        color: "green",
    },
    unexpected: {
        icon: ExclamationCircleIcon,
        gradient: "from-yellow-50 to-yellow-100",
        backgroundColor: "bg-yellow-100",
        border: "border-yellow-200",
        iconColor: "text-yellow-600",
        textColor: "text-yellow-800",
        color: "yellow",
    },
};
