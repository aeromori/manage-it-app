"use client";

import { Provider } from "react-redux";
import { store } from "./state/store";
import GlobalAlert from "./components/Alert/globalAlert";

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Provider store={store}>
                <GlobalAlert />
                {children}
            </Provider>
        </>
    );
}
