import Image from "next/image";
import { Spinner } from "flowbite-react";

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <div className=" rounded-2xl mt-5 mb-5 p-10 bg-amber-500">
            <Spinner aria-label="Spinner" size="sm" light />
        </div>
    );
    // return <p>Loading...</p>;
}
