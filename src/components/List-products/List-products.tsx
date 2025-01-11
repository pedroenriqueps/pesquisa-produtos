"use client";

import { useProductContext } from "@/context/products";
import { useState } from "react";
import { ManagementList } from "@/components/Management-list/Management-list";
import { FilterInput } from "@/components/Filter-product/Filter-product";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ListProducts() {
    const { allProducts, loading } = useProductContext();
    const [filter, setFilter] = useState("");

    if (loading) {
        return <ManagementList />;
    }

    if (allProducts.length === 0) {
        return (
            <section>
                <div className="p-4">
                    <FilterInput
                        value={filter}
                        onChange={setFilter}
                        placeholder="Digite o nome do produto para filtrar"
                    />
                </div>
                <p className="font-semibold text-base text-center">
                    Nenhum produto encontrado, crie um{" "}
                    <Link href="/" className="text-blue-600">
                        aqui
                    </Link>
                </p>
            </section>
        );
    }

    return (
        <section>
            <ManagementList>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </ManagementList>
        </section>
    );
}
