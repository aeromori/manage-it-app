import React, { ComponentType, SVGProps } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Category = {
    title: string;
    description: string;
    type: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    color: string;
    gradient: string;
    border: string;
    iconColor: string;
};

type ExpenseCategoryProps = {
    categories: Category[];
    setSelectedCategory: (value: string) => void;
    selectedCategory: string;
};
const ExpenseCategory = ({
    categories,
    setSelectedCategory,
    selectedCategory,
}: ExpenseCategoryProps) => {
    return (
        <>
            {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = category.type === selectedCategory;

                return (
                    <Card
                        key={category.type}
                        className={`cursor-pointer transition-all ${isSelected ? `${category.border} bg-linear-to-br ${category.gradient} ring-2 ring-${category.color}-400` : "border-orange-200 bg-white/80 hover:bg-orange-50"}`}
                        onClick={() => setSelectedCategory(category.type)}
                    >
                        <CardHeader>
                            <div className="flex items-start gap-3">
                                <div
                                    className={`p-2 rounded-lg bg-white ${category.border}`}
                                >
                                    <Icon
                                        className={`size-5 ${category.iconColor}`}
                                    />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-orange-900">
                                        {category.title}
                                    </CardTitle>
                                    <CardDescription className="mt-1">
                                        {category.description}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                );
            })}
        </>
    );
};

export default ExpenseCategory;
