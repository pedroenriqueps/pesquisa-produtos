"use client";

import Image from "next/image";
import { LoadingSkeleton } from "../Loading-skeleton/Loading-skeleton";
import { FormProductInterface } from "@/context/products";

interface ManagementListProps {
    products: FormProductInterface[];
    loading: boolean;
    renderRest?: (product: FormProductInterface) => React.ReactNode;
    children?: React.ReactNode;
}

export function ManagementList({
    products,
    loading,
    renderRest,
    children,
}: ManagementListProps) {
    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <>
            <ul className="p-4">
                {products
                    .slice()
                    .reverse()
                    .map((product, index) => (
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
                    ))}
            </ul>
            {children}
        </>
    );
}
