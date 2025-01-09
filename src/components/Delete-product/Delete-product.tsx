"use client";

import { FiTrash } from "react-icons/fi";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteProduct } from "@/service/product/delete-product-service";
import { useProductContext } from "@/context/products";

interface DeleteButtonProps {
    productId: number;
}

export function DeleteButton({ productId }: DeleteButtonProps) {
    const { setAllProducts } = useProductContext();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteProduct(productId);
            setAllProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
            toast.success("Produto deletado com sucesso!");
        } catch (error) {
            toast.error("Erro ao deletar o produto. Por favor, tente novamente.");
            throw new Error("Erro ao deletar produto:");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            className={`absolute top-1 right-1 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleDelete}
            disabled={loading}
        >
            {loading ? (
                <span className="loader"><FiTrash color="gray" /></span>
            ) : (
                <FiTrash size={22} color="red" />
            )}
        </button>
    );
}
