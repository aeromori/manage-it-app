import api from "../../api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { hideAlert, showAlert } from "./alertSlice";
import dayjs from "dayjs";

interface Meta {
    code: number;
    message: string;
}

interface category {
    _id: string;
    category: string;
    description: string;
}

interface transaction {
    _id: string;
    monthly_budget_id: string;
    category_id: category;
    amount: number;
    description: string;
    expense_date: Date;
}

interface expenseState {
    loading: boolean;
    loadingCategories: boolean;
    loadingDelete: boolean;
    transactions: transaction[];
    categories: category[] | [];
    meta: Meta | null;
}

const initialState: expenseState = {
    loading: true,
    loadingCategories: true,
    loadingDelete: false,
    transactions: [],
    categories: [],
    meta: null,
};

const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCategoriesAsync = createAsyncThunk<
    any,
    void,
    { rejectValue: Meta }
>("expense/getCategoriesAsync", async (_, { rejectWithValue, dispatch }) => {
    const user = await Cookies.get("user");
    const token = JSON.parse(user || "{}").accessToken;

    try {
        const response = await api.get(`${baseApiUrl}/expenses/categories`, {
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
        }

        return rejectWithValue({
            code: error.response?.status ?? 500,
            message:
                error.response?.body?.message ??
                "Failed to fetch expense categories",
        });
    }
});

export const getExpensesAsync = createAsyncThunk<
    any,
    { date?: Date; category_id?: string },
    { rejectValue: Meta }
>("expense/getExpensesAsync", async (query, { rejectWithValue, dispatch }) => {
    const user = await Cookies.get("user");
    const token = JSON.parse(user || "{}").accessToken;

    try {
        const response = await api.get(`${baseApiUrl}/expenses`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            params: {
                date: query.date
                    ? dayjs(query.date).format("YYYY-MM-DD")
                    : undefined,
                category_id: query.category_id || undefined,
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
        }

        return rejectWithValue({
            code: error.response?.status ?? 500,
            message:
                error.response?.body?.message ?? "Failed to fetch expenses",
        });
    }
});

export const deleteExpenseAsync = createAsyncThunk<
    any,
    string,
    { rejectValue: Meta }
>(
    "expense/deleteExpenseAsync",
    async (expenseId, { rejectWithValue, dispatch }) => {
        const user = await Cookies.get("user");
        const token = JSON.parse(user || "{}").accessToken;

        try {
            const response = await api.delete(
                `${baseApiUrl}/expenses/${expenseId}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            dispatch(
                showAlert({
                    type: "success",
                    message: "Expense deleted successfully",
                }),
            );

            setTimeout(() => {
                dispatch(hideAlert());
            }, 3000);

            return expenseId;
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

                return rejectWithValue({
                    code: 503,
                    message: "Network error. Please check your connection",
                });
            }

            dispatch(
                showAlert({
                    type: "error",
                    message:
                        error.response?.body?.message ??
                        "Failed to delete expense",
                }),
            );

            setTimeout(() => {
                dispatch(hideAlert());
            }, 3000);

            return rejectWithValue({
                code: error.response?.status ?? 500,
                message:
                    error.response?.body?.message ?? "Failed to delete expense",
            });
        }
    },
);

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        resetState(): expenseState {
            return { ...initialState };
        },
        resetMeta(state) {
            state.meta = null;
        },
    },
    extraReducers: (builder) => {
        //  Get Expenses
        builder
            //  Get Expense Categories
            .addCase(getCategoriesAsync.pending, (state) => {
                state.loadingCategories = true;
                state.categories = [];
            })
            .addCase(getCategoriesAsync.fulfilled, (state, action) => {
                state.loadingCategories = false;
                state.categories = action.payload;
            })
            .addCase(getCategoriesAsync.rejected, (state, action) => {
                state.loadingCategories = false;
                state.categories = [];
                state.meta = action.payload ?? {
                    code: 500,
                    message: "Failed to fetch expense categories",
                };
            })
            .addCase(getExpensesAsync.pending, (state) => {
                state.loading = true;
                state.transactions = [];
            })
            .addCase(getExpensesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(getExpensesAsync.rejected, (state, action) => {
                state.loading = false;
                state.transactions = [];
                state.meta = action.payload ?? {
                    code: 500,
                    message: "Failed to fetch expenses",
                };
            })

            .addCase(deleteExpenseAsync.pending, (state) => {
                state.loadingDelete = true;
            })
            .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
                state.loadingDelete = false;
                state.transactions = state.transactions.filter(
                    (transaction) => transaction._id !== action.payload,
                );
            })
            .addCase(deleteExpenseAsync.rejected, (state, action) => {
                state.loadingDelete = false;
                state.meta = action.payload ?? {
                    code: 500,
                    message: "Failed to delete expense",
                };
            });
    },
});

export const { setLoading, resetState, resetMeta } = expenseSlice.actions;

export default expenseSlice.reducer;
