import api from "@/app/api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { hideAlert, showAlert } from "./alertSlice";
import dayjs from "dayjs";

interface Meta {
    code: number;
    message: string;
}

interface expense {
    _id: string;
    monthly_budget_id: string;
    category_id: string;
    amount: number;
    description: string;
    expense_date: Date;
}

interface category {
    _id: string;
    category: string;
    description: string;
}

interface expenseState {
    loading: boolean;
    loadingSubmit: boolean;
    expense: expense | null;
    categories: category[] | [];
    meta: Meta | null;
}

const initialState: expenseState = {
    loading: true,
    loadingSubmit: false,
    expense: null,
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

        return response.data;
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
                error.response?.data?.message ??
                "Failed to fetch expense categories",
        });
    }
});

export const saveExpenseAsync = createAsyncThunk<
    any,
    {
        category_id: string;
        amount: number;
        description: string;
        expense_date: string;
    },
    { rejectValue: Meta }
>(
    "expense/saveExpenseAsync",
    async (expenseData, { rejectWithValue, dispatch }) => {
        const user = await Cookies.get("user");
        const token = JSON.parse(user || "{}").accessToken;

        try {
            const response = await api.post(
                `${baseApiUrl}/expenses`,
                expenseData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            dispatch(
                showAlert({
                    type: "success",
                    message: "Expense saved successfully",
                }),
            );

            setTimeout(() => {
                dispatch(hideAlert());
            }, 3000);

            return response.data;
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
                    code: 0,
                    message: "Network error. Please check your connection",
                });
            }

            dispatch(
                showAlert({
                    type: "error",
                    message:
                        error.response?.data?.message ||
                        "Failed to save expense",
                }),
            );

            setTimeout(() => {
                dispatch(hideAlert());
            }, 3000);

            return rejectWithValue(
                error.response?.data?.message || "Failed to save expense",
            );
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
        builder
            //  Get Expense Categories
            .addCase(getCategoriesAsync.pending, (state) => {
                state.loading = true;
                state.categories = [];
            })
            .addCase(getCategoriesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getCategoriesAsync.rejected, (state, action) => {
                state.loading = false;
                state.categories = [];
                state.meta = action.payload ?? {
                    code: 500,
                    message: "Failed to fetch expense categories",
                };
            })

            //  Save Expense
            .addCase(saveExpenseAsync.pending, (state) => {
                state.loadingSubmit = true;
                state.meta = null;
            })
            .addCase(saveExpenseAsync.fulfilled, (state, action) => {
                state.loadingSubmit = false;
                state.expense = action.payload;
                state.meta = {
                    code: 200,
                    message: "Expense saved successfully",
                };
            })
            .addCase(saveExpenseAsync.rejected, (state, action) => {
                state.loadingSubmit = false;
                state.meta = action.payload ?? {
                    code: 500,
                    message: "Failed to save expense data",
                };
            });
    },
});

export const { setLoading, resetState, resetMeta } = expenseSlice.actions;

export default expenseSlice.reducer;
