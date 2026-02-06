import { Alert, AlertProps } from "flowbite-react";

interface Props extends AlertProps {
    message: string;
    type: "success" | "error" | "warning" | "info";
    active: boolean;
    show: boolean;
}

const AlertMessage = ({ message, type, onDismiss, active, show }: Props) => {
    const getColor = (type: string) => {
        switch (type) {
            case "success":
                return "success";
            case "error":
                return "failure";
            case "warning":
                return "warning";
            case "info":
                return "info";
            default:
                return "info";
        }
    };

    return (
        <div
            className={`
                fixed bottom-4 right-4 w-80 z-50
                transform transition-transform duration-300
                ${active ? "translate-x-0" : "translate-x-full"}
            `}
        >
            {show && (
                <Alert color={getColor(type)} onDismiss={onDismiss}>
                    <span className="font-medium">
                        {type.charAt(0).toUpperCase() + type.slice(1)}:{" "}
                    </span>
                    {message}
                </Alert>
            )}
        </div>
        // <Alert color={getColor(type)}>
        //     <span className="font-medium">Danger alert!</span> Change a few
        //     things up and try submitting again.
        // </Alert>
    );
};

export default AlertMessage;
