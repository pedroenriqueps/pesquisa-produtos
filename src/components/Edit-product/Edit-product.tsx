'use client';

import { DeleteButton } from "../Delete-product/Delete-product";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { ManagementList } from "../Management-list/Management-list";
import { FormProductInterface, useProductContext } from "@/context/products";
import { editProduct } from "@/service/product/edit-product-service";
import { useState } from "react";

export function EditProduct() {
    const { allProducts, loading, setAllProducts } = useProductContext();
    const [editingProduct, setEditingProduct] = useState<FormProductInterface | null>(null);

    const handleEditClick = (product: FormProductInterface) => {
        setEditingProduct(product);
    };

    const handleSave = async () => {
        if (!editingProduct) return;

        try {
            const updatedProduct = await editProduct(editingProduct.id!, editingProduct);

            setAllProducts((prev) => {
                const updatedProducts = [...prev];
                const index = updatedProducts.findIndex(p => p.id === updatedProduct.id);
                if (index !== -1) {
                    updatedProducts[index] = updatedProduct;
                }
                return updatedProducts;
            })

            toast.success("Produto editado com sucesso!");
            setEditingProduct(null);
            window.location.reload()
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Erro ao editar produto: ${error.message}`);
                console.error(error);
            } else {
                toast.error("Erro ao editar produto.");
            }
        }
    };

    const handleInputChange = (field: keyof FormProductInterface, value: any) => {
        setEditingProduct((prev) => (prev ? { ...prev, [field]: value } : null));
    };

    return (
        <section>
            <ManagementList
                loading={loading}
                products={allProducts}
                renderRest={(product: FormProductInterface) => (
                    <>
                        {product.id !== undefined && (
                            <DeleteButton productId={product.id} />
                        )}
                        <button
                            type="button"
                            className="absolute right-1 bottom-1 text-red-600"
                            onClick={() => handleEditClick(product)}
                        >
                            <CiEdit size={24} />
                        </button>
                    </>
                )}
            />

            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nome</label>
                                <input
                                    type="text"
                                    value={editingProduct.productName ?? ""}
                                    onChange={(e) =>
                                        handleInputChange("productName", e.target.value)
                                    }
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Valor</label>
                                <input
                                    type="number"
                                    value={editingProduct.productValue ?? ""}
                                    onChange={(e) =>
                                        handleInputChange("productValue", parseFloat(e.target.value))
                                    }
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    value={editingProduct.productCode ?? ""}
                                    onChange={(e) =>
                                        handleInputChange("productCode", e.target.value)
                                    }
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => setEditingProduct(null)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                    onClick={handleSave}
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
