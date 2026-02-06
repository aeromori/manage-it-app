import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertState {
    message: string;
    type: AlertType;
    active: boolean;
}

const initialState: AlertState = {
    message: "",
    type: "info",
    active: false,
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        showAlert: (
            state,
            action: PayloadAction<{ message: string; type: AlertType }>
        ) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.active = true;
        },
        hideAlert: (state) => {
            state.active = false;
            state.message = "";
        },
    },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
