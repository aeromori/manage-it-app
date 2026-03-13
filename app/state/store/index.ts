import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import usersReducer from "../slices/userSlice";
import alertReducer from "../slices/alertSlice";
import incomeReducer from "../slices/incomeSlice";
import expenseReducer from "../slices/expenseSlice";
import historyReducer from "../slices/historySlice";
import dashboardReducer from "../slices/dashboardSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        income: incomeReducer,
        expense: expenseReducer,
        history: historyReducer,
        dashboard: dashboardReducer,
        alert: alertReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
