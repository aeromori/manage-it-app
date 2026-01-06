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
                    <h1 className="text-3xl font-bold">
                        Welcome to your Manage It Dashboard
                    </h1>

                    <p className="mt-3">
                        Manage It is inspired by the <i>Japanese Kakeibo</i>{" "}
                        method, a mindful approach to understanding and
                        improving your financial habits. Instead of simply
                        tracking numbers, Manage It helps you reflect on your
                        spending, set intentional goals, and make thoughtful
                        decisions with your money. By combining simplicity,
                        awareness, and planning, Manage It empowers you to stay
                        in control, reduce unnecessary expenses, and build
                        healthier financial routines with clarity and purpose.
                    </p>
                </div>
            </div>
            {/* <Suspense fallback={<Loading />}>
                <ProductCard />
            </Suspense> */}
        </main>
    );
}
