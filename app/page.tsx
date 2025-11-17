import Link from "next/link";
import Image from "next/image";
import ProductCard from "./components/ProductCard/productCard";
import { Suspense } from "react";
import Loading from "./components/Loading/loading";

export default async function Home() {
    return (
        <main>
            <div className="flex">
                <div className="max-w-4xl p-10 bg-gray-200 rounded-xl shadow-xl">
                    <h1 className="text-3xl">Welcome to dashboard!</h1>

                    <p className="mt-3">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>
            {/* <Suspense fallback={<Loading />}>
                <ProductCard />
            </Suspense> */}
        </main>
    );
}
