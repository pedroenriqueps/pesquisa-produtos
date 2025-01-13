"use client";

import { useProductContext } from "@/context/products";
import { useState } from "react";
import { ManagementList } from "@/components/Management-list/Management-list";
import { FilterInput } from "@/components/Filter-product/Filter-product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ListProducts() {
    const { allProducts, loading } = useProductContext();
    const [filter, setFilter] = useState("");

    const filteredProducts = allProducts.filter((product) =>
        product.productName.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <section>
            <div className="p-4">
                <FilterInput
                    value={filter}
                    onChange={setFilter}
                    placeholder="Digite o nome do produto para filtrar"
                />
            </div>
            <ManagementList products={filteredProducts} loading={loading}></ManagementList>
        </section>
    );
}
