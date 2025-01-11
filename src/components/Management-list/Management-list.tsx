"use client";
import { useProductContext } from "@/context/products";
import Image from "next/image";
import { LoadingSkeleton } from "../Loading-skeleton/Loading-skeleton";

export function ManagementList({ renderRest, children }: { renderRest?: any; children?: React.ReactNode }) {
    const { allProducts, loading } = useProductContext();

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <>
            <ul className="p-4">
                {allProducts.map((product, index) => (
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
                        <div className="flex justify-end gap-2 mt-2">
                            {renderRest && renderRest(product)}
                        </div>
                    </li>
                )).reverse()}
            </ul>
            {children}
        </>
    );
}
