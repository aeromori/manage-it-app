//  if this component is dependent on the
//  other components, those components will automatically
//become a client component and will be included in the JS bundle
import React, { Suspense } from "react";
import AddToCart from "../addToCart";
import Loading from "@/app/components/Loading/loading";

const ProductCard = async () => {
    // test only if it will display the loading component in Suspense
    let data;
    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/users",
            { cache: "no-store" } //  always give fresh data
            // { next: { revalidate: 10 } }
        ).then((res) => (data = res.json()));
    } catch (e) {
        console.error("Error fetching data: ", e);
    }

    console.log({ data });
    return (
        <div className="card p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky">
            <AddToCart />
        </div>
    );
};

export default ProductCard;
