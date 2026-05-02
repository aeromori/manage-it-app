import api from "../../api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { hideAlert, showAlert } from "./alertSlice";
import dayjs from "dayjs";

interface Meta {
    code: number;
    message: string;
}

interface MonthlyBudget {
    _id: string;
    user_id: string;
    income_amount: number;
    savings_goal: number;
    period_date: Date;
}

interface ExpenseCategory {
    _id: string;
    category: string;
    description: string;
}

interface Expense {
    _id: string;
    monthly_budget_id: string;
    category_id: ExpenseCategory | null;
    amount: number;
    description?: string;
    expense_date: Date;
}

interface dashboardState {
    monthly_budget: MonthlyBudget | null;
    expenses: Expense[] | [];
    total_expenses: number;
    expense_categories: ExpenseCategory[] | [];
    loading: boolean;
    meta: Meta | null;
}

const initialState: dashboardState = {
    monthly_budget: null,
    expenses: [],
    total_expenses: 0,
    expense_categories: [],
    loading: true,
    meta: null,
};

const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const getDashboardDataAsync = createAsyncThunk<
    any,
    { date: string },
    { rejectValue: Meta }
>(
    "dashboard/getDashboardDataAsync",
    async (query, { rejectWithValue, dispatch }) => {
        const user = await Cookies.get("user");
        const token = JSON.parse(user || "{}").accessToken;

        try {
            const response = await api.get(`${baseApiUrl}/dashboard`, {
                params: {
                    date: dayjs(query.date).format("YYYY-MM-DD"),
                },
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            return response.body;
        } catch (error: any) {
            if (!error.response) {
                dispatch(
                    showAlert({
                        type: "error",
                        message: "Network error. Please check your connection",
                    }),
                );

                setTimeout(() => {
                    dispatch(hideAlert());
                }, 3000);

                return rejectWithValue({ code: 500, message: "Network error" });
            }
        }
    },
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        resetState(): dashboardState {
            return { ...initialState };
        },
        resetMeta(state) {
            state.meta = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardDataAsync.pending, (state) => {
                state.loading = true;
                state.monthly_budget = null;
                state.expense_categories = [];
                state.expenses = [];
                state.total_expenses = 0;
                state.meta = null;
            })
            .addCase(getDashboardDataAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.monthly_budget = action.payload.monthly_budget;
                state.expenses = action.payload.expenses;
                state.total_expenses = action.payload.total_expenses;
                state.expense_categories = action.payload.expense_categories;
            })
            .addCase(getDashboardDataAsync.rejected, (state, action) => {
                state.loading = false;
                state.monthly_budget = null;
                state.expense_categories = [];
                state.expenses = [];
                state.total_expenses = 0;
                state.meta = action.payload ?? {
                    code: 500,
                    message: "An error occurred while fetching dashboard data",
                };
            });
    },
});

export const { setLoading, resetState, resetMeta } = dashboardSlice.actions;

export default dashboardSlice.reducer;
