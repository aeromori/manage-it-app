import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button, Datepicker, Select } from "flowbite-react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Category = {
    _id: string;
    category: string;
    description: string;
};

type SearchHistoryProps = {
    filters: {
        category_id: string;
        month: Date | null;
    };
    setFilters: React.Dispatch<
        React.SetStateAction<{
            category_id: string;
            month: Date | null;
        }>
    >;
    categories: Category[] | [];
    loadingCategories: boolean;
};
const SearchHistory = ({
    filters,
    setFilters,
    categories,
    loadingCategories,
}: SearchHistoryProps) => {
    useEffect(() => {
        if (filters.month === null) {
            const dateInput = document.getElementById(
                "datepicker"
            ) as HTMLInputElement | null;

            if (dateInput) {
                dateInput.value = "ADAWDA";
            }
        }
    }, [filters.month]);

    console.log({ filters });

    return (
        <div className="space-y-3">
            <Card className="border-orange-200 bg-white/80 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-orange-900">Filters</CardTitle>
                    <CardDescription>
                        Filter transactions by category or time period
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-orange-900">Category</label>
                            <Select
                                id="expenseCategory"
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        category_id: e.target.value,
                                    }))
                                }
                                disabled={loadingCategories}
                            >
                                {loadingCategories ? (
                                    <option key="loading" value="loading">
                                        Loading Categories...
                                    </option>
                                ) : (
                                    <>
                                        <option key="all" value="all">
                                            All
                                        </option>
                                        {categories.map((cat) => (
                                            <option
                                                key={cat._id}
                                                value={cat._id}
                                            >
                                                {cat.category}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-orange-900">
                                Select Month
                            </label>
                            <div className="flex gap-2 w-full">
                                <div className="flex-9">
                                    <Datepicker
                                        id="datepicker"
                                        className="border-orange-200 text-orange-700 hover:bg-orange-50"
                                        defaultValue={
                                            filters.month ?? undefined
                                        }
                                        showClearButton={true}
                                        onChange={(date) => {
                                            console.log(date);
                                            setFilters((prev) => ({
                                                ...prev,
                                                month: date,
                                            }));
                                        }}
                                        value={filters.month ?? undefined}
                                        placeholder="Select date"
                                    />
                                </div>
                                <div className="flex-1">
                                    {filters.month && (
                                        <Button
                                            outline
                                            color={"yellow"}
                                            size="icon"
                                            onClick={() => {
                                                // Reset filters logic here
                                                console.log("Reset filters");
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    // category: "all",
                                                    month: new Date(), //null,
                                                }));
                                            }}
                                            className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-black p-3"
                                        >
                                            <XMarkIcon className="size-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SearchHistory;
