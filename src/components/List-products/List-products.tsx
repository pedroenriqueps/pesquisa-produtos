"use client";

import { useProductContext } from "@/context/products";
import Image from "next/image";
import { useState } from "react";
import { FilterInput } from "@/components/Filter-product/Filter-product";
import { DeleteButton } from "@/components/Delete-product/Delete-product";
import Link from "next/link";
import { LoadingSkeleton } from "../Loading-skeleton/Loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ListProducts() {
    const { allProducts, loading } = useProductContext();
    const [filter, setFilter] = useState("");

    const filteredProducts = allProducts.filter((product) =>
        product.productName.toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (filteredProducts.length === 0) {
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
            <div className="p-4">
                <FilterInput
                    value={filter}
                    onChange={setFilter}
                    placeholder="Digite o nome do produto para filtrar"
                />
            </div>
            <ul className="p-4">
                {filteredProducts.map((product, index) => (
                    <li
                        key={index}
                        className="relative w-full my-5 border border-green-500 p-4 shadow-md"
                    >
                        <div className="my-5 flex justify-around text-lg">
                            <span>{product.productName}</span>
                            <span>
                                {product.productValue.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </span>
                            <span className="absolute top-1 left-1 text-slate-500 text-sm">
                                {product.productCode}
                            </span>
                        </div>
                        <div className="flex justify-center my-4">
                            {product.productUrlImage ? (
                                <Image
                                    src={product.productUrlImage}
                                    alt="Este produto não contém imagem"
                                    width={300}
                                    height={200}
                                />
                            ) : (
                                <span className="text-center text-red-600">Imagem não disponível</span>
                            )}
                        </div>
                        <DeleteButton productId={product.id!} />
                    </li>
                ))}
            </ul>
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
        </section>
    );
}
