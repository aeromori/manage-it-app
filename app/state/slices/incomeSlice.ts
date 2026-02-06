import api from "@/app/api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { hideAlert, showAlert } from "./alertSlice";
import dayjs from "dayjs";

interface Meta {
    code: number;
    message: string;
}

interface income {
    _id: string;
    // user_id: string;
    income_amount: number;
    savings_goal: number;
    period_date: Date;
}

interface incomeState {
    loading: boolean;
    loadingSubmit: boolean;
    income: income | null;
    meta: Meta | null;
}

const initialState: incomeState = {
    loading: true,
    loadingSubmit: false,
    income: null,
    meta: null,
};

const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchIncomeAsync = createAsyncThunk<
    any,
    void,
    { rejectValue: Meta }
>("income/fetchIncomeAsync", async (_, { rejectWithValue, dispatch }) => {
    const user = await Cookies.get("user");
    const token = JSON.parse(user || "{}").accessToken;
    const dateToday = dayjs().format("YYYY-MM-DD");

    try {
        const response = await api.get(`${baseApiUrl}/monthly-budget`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            params: {
                dateToday,
            },
        });

        return response.data;
    } catch (error: any) {
        if (!error.response) {
            dispatch(
                showAlert({
                    type: "error",
                    message: "Network error. Please check your connection",
                })
            );

            setTimeout(() => {
                dispatch(hideAlert());
            }, 3000);
        }

        return rejectWithValue({
            code: error.response?.status ?? 500,
            message:
                error.response?.data?.message ??
                "Failed to fetch income details",
        });
    }
});

export const saveIncomeAsync = createAsyncThunk<
    any,
    {
        income_amount: number;
        savings_goal: number;
        period_date: string;
    },
    { rejectValue: Meta }
>(
    "income/saveIncomeAsync",
    async (incomeData, { rejectWithValue, dispatch }) => {
        const user = await Cookies.get("user");
        const token = JSON.parse(user || "{}").accessToken;

        try {
            const response = await api.post(
                `${baseApiUrl}/monthly-budget`,
                incomeData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(
                showAlert({
                    type: "success",
                    message: "Income data saved successfully",
                })
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
                    })
                );

                setTimeout(() => {
                    dispatch(hideAlert());
                }, 3000);

                return rejectWithValue({
                    code: 0,
                    message: "Network error. Please check your connection",
                });
            }

            return rejectWithValue(
                error.response?.data?.message || "Failed to save income data"
            );
        }
    }
);

const incomeSlice = createSlice({
    name: "income",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        resetState(state) {
            state.loading = false;
            state.income = null;
            state.meta = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncomeAsync.pending, (state) => {
                state.income = null;
                state.loading = true;
                state.meta = null;
            })
            .addCase(fetchIncomeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.income = action.payload;
                state.meta = null;
            })
            .addCase(fetchIncomeAsync.rejected, (state, action) => {
                state.loading = false;
                state.income = null;
                state.meta = action.payload ?? {
                    code: 500,
                    message: "Failed to fetch income details",
                };
            })

            // Save Income Data
            .addCase(saveIncomeAsync.pending, (state) => {
                state.loadingSubmit = true;
                state.meta = null;
            })
            .addCase(saveIncomeAsync.fulfilled, (state, action) => {
                state.loadingSubmit = false;
                state.income = action.payload;
                state.meta = null;
            })
            .addCase(saveIncomeAsync.rejected, (state, action) => {
                state.loadingSubmit = false;
                state.meta = action.payload ?? {
                    code: 500,
                    message: "Failed to save income data",
                };
            });
    },
});

export const { setLoading, resetState } = incomeSlice.actions;

export default incomeSlice.reducer;
