import { Spinner } from "flowbite-react";

export default function Loading({ text }: { text?: string }) {
    return (
        <div className="flex items-center justify-center">
            <Spinner aria-label="Spinner" size="sm" light />
            <span className="pl-3 loading-dots">{`${text ?? "Loading"}`}</span>
        </div>
    );
}
