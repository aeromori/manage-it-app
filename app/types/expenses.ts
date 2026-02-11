import { ComponentType } from "react";

export type BackendCategory = {
    _id: string;
    category: string;
    description: string;
};

export type CategoryType = "survival" | "optional" | "culture" | "unexpected";

export type CategoryUIConfig = {
    icon: ComponentType<any>;
    gradient: string;
    border: string;
    iconColor: string;
    color: string;
};

// Combining backend category data with UI configuration for easier use in components
export type CategoryWithUI = BackendCategory &
    CategoryUIConfig & { title: string };
