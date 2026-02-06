import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/state/store";
import AlertMessage from "./alert";
import { hideAlert } from "../../state/slices/alertSlice";
import { useState, useEffect } from "react";

const GlobalAlert = () => {
    // global state
    const dispatch = useDispatch<AppDispatch>();

    const [show, setShow] = useState<boolean>(false);

    const alert = useSelector((state: RootState) => state.alert);

    useEffect(() => {
        if (alert.active) {
            setShow(true);
        } else {
            // Delay hiding to allow animation to complete
            const timeout = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [alert.active]);

    return (
        <AlertMessage
            show={show}
            message={alert.message}
            type={alert.type}
            active={alert.active}
            onDismiss={() => dispatch(hideAlert())}
        />
    );
};

export default GlobalAlert;
