import api from "@/app/api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { hideAlert, showAlert } from "./alertSlice";

interface user {
    _id: string;
    name: string;
    username: string;
    address: string;
    featured: boolean;
    birthdate: Date;
}

interface Meta {
    code: number;
    message: string;
}

interface usersState {
    loading: boolean;
    userLoading: boolean;
    users: user[];
    selectedUser: user | null;
    meta: Meta | null;
}

const initialState: usersState = {
    loading: true,
    userLoading: false,
    users: [],
    selectedUser: null,
    meta: null,
};

const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        resetState(state) {
            state.loading = false;
            state.users = [];
            state.meta = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersAsync.pending, (state) => {
                state.users = [];
                state.loading = true;
                state.meta = null;
            })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.meta = null;
            })
            .addCase(fetchUsersAsync.rejected, (state, action) => {
                state.loading = false;
                state.users = [];
                state.meta = action.payload ?? {
                    code: 500,
                    message: "Failed to fetch users",
                };
            })

            // Fetch User Detail
            .addCase(fetchUserDetailAsync.pending, (state) => {
                state.selectedUser = null;
                state.userLoading = true;
                state.meta = null;
            })
            .addCase(fetchUserDetailAsync.fulfilled, (state, action) => {
                state.userLoading = false;
                state.selectedUser = action.payload;
                state.meta = null;
            })
            .addCase(fetchUserDetailAsync.rejected, (state, action) => {
                state.userLoading = false;
                state.selectedUser = null;
                state.meta = action.payload ?? {
                    code: 500,
                    message: "Failed to fetch user detail",
                };
            });
    },
});

export const fetchUsersAsync = createAsyncThunk<
    any,
    void,
    { rejectValue: Meta }
>("users/fetchUsersAsync", async (_, { rejectWithValue, dispatch }) => {
    const user = await Cookies.get("user");
    const token = JSON.parse(user || "{}").accessToken;

    try {
        const response = await api.get(`${baseApiUrl}/users`, {
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

        dispatch(
            showAlert({
                type: "error",
                message:
                    error.response?.data?.message ?? "Failed to fetch users",
            })
        );

        setTimeout(() => {
            dispatch(hideAlert());
        }, 3000);

        return rejectWithValue({
            code: error.response?.status ?? 500,
            message: error.response?.data?.message ?? "Failed to fetch users",
        });
    }
});

export const fetchUserDetailAsync = createAsyncThunk<
    any,
    { id: string },
    { rejectValue: Meta }
>(
    "users/fetchUserDetailAsync",
    async ({ id }, { rejectWithValue, dispatch }) => {
        const user = await Cookies.get("user");
        const token = JSON.parse(user || "{}").accessToken;

        try {
            const response = await api.get(`${baseApiUrl}/users/${id}`, {
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
                    "Failed to fetch user detail",
            });
        }
    }
);

export const { setLoading, resetState } = userSlice.actions;

export default userSlice.reducer;
