import Image from "next/image";

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <div className=" rounded-2xl mt-5 mb-5 p-10 bg-amber-500">
            <Image
                src="/meme-guy-face-isolated-vector-11464313.avif"
                width={250}
                height={250}
                alt="meme guy"
            />
        </div>
    );
    // return <p>Loading...</p>;
}
