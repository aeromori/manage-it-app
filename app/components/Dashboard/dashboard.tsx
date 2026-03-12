"use client";

import KeyMetrics from "./keyMetrics";
import SavingsProgress from "./savingsProgress";
import CategoriesBreakdown from "./categoriesBreakdown";

const Dashboard = () => {
    return (
        <>
            <KeyMetrics />
            <SavingsProgress />
            <CategoriesBreakdown />
        </>
    );
};

export default Dashboard;
