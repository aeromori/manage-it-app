import api from "@/app/api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface user {
    _id: string;
    name: string;
    username: string;
    address: string;
    featured: boolean;
    birthdate: Date;
}

interface usersState {
    loading: boolean;
    userLoading: boolean;
    users: user[];
    selectedUser: user | null;
    error: string | null;
}

const initialState: usersState = {
    loading: true,
    userLoading: false,
    users: [],
    selectedUser: null,
    error: null,
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
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersAsync.pending, (state) => {
                state.users = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.error = null;
            })
            .addCase(fetchUsersAsync.rejected, (state, action) => {
                state.loading = false;
                state.users = [];
                state.error = action.payload || "Failed to fetch users";
            })

            // Fetch User Detail
            .addCase(fetchUserDetailAsync.pending, (state) => {
                state.selectedUser = null;
                state.userLoading = true;
                state.error = null;
            })
            .addCase(fetchUserDetailAsync.fulfilled, (state, action) => {
                state.userLoading = false;
                state.selectedUser = action.payload;
                state.error = null;
            })
            .addCase(fetchUserDetailAsync.rejected, (state, action) => {
                state.userLoading = false;
                state.selectedUser = null;
                state.error = action.payload || "Failed to fetch user detail";
            });
    },
});

export const fetchUsersAsync = createAsyncThunk<
    any,
    void,
    { rejectValue: string }
>("users/fetchUsersAsync", async (_, { rejectWithValue }) => {
    const user = await Cookies.get("user");
    const token = JSON.parse(user || "{}").accessToken;

    try {
        const response = await api.get(`${baseApiUrl}/users`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue("Failed to fetch users");
    }
});

export const fetchUserDetailAsync = createAsyncThunk<
    any,
    { id: string },
    { rejectValue: string }
>("users/fetchUserDetailAsync", async ({ id }, { rejectWithValue }) => {
    const user = await Cookies.get("user");
    const token = JSON.parse(user || "{}").accessToken;

    try {
        const response = await api.get(`${baseApiUrl}/users/${id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue("Failed to fetch user detail");
    }
});

export const { setLoading, resetState } = userSlice.actions;

export default userSlice.reducer;
