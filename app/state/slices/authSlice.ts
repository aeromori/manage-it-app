import api from "@/app/api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface user {
    id: string;
    username: string;
    isAdmin?: boolean;
    accessToken: string;
}

interface authState {
    loading: boolean;
    user: user | null;
    error: string | null;
}

const initialState: authState = {
    loading: false,
    user: null,
    error: null,
};

const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        resetState(state) {
            state.loading = false;
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.user = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            });
    },
});

export const loginAsync = createAsyncThunk<
    any,
    { username: string; password: string },
    { rejectValue: string }
>(
    "authentication/loginAsync",
    async (
        credentials: { username: string; password: string },
        { rejectWithValue }
    ) => {
        const { username, password } = credentials;

        try {
            const response = await api.post(`${baseApiUrl}/auth/login`, {
                username,
                password,
            });

            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

export const { setLoading, resetState } = authSlice.actions;

export default authSlice.reducer;
