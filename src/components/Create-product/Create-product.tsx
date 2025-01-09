"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "@/utils/schemas/create-product-schema";
import { useProductContext } from "@/context/products";
import { useState } from "react";
import { createProduct } from "@/service/product/create-product-service";
import { FormProductInterface } from "@/context/products";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function FormCreateProduct() {
    const { addProduct } = useProductContext();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormProductInterface>({
        resolver: yupResolver(productSchema),
        defaultValues: {
            productValue: 0,
        },
    });

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Por favor, envie um arquivo de imagem.");
                return;
            }

            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "imagesz");
            formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);

            try {
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!response.ok) {
                    throw new Error("Erro ao fazer upload da imagem");
                }

                const data = await response.json();
                setValue("productUrlImage", data.secure_url);
                setValue("cloudinaryPublicId", data.public_id);
                setImagePreview(data.secure_url);
            } catch {
                toast.error("Não foi possível fazer o upload da imagem. Tente novamente.");
            } finally {
                setLoading(false);
            }
        } else {
            toast.warning("Nenhum arquivo selecionado.");
        }
    };

    const handleForm = async (product: FormProductInterface) => {
        try {
            await addProduct(product);
            await createProduct(product);
            setImagePreview(null);
            reset();
            toast.success("Produto adicionado com sucesso.");
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            toast.error("Houve um erro ao criar produto.");
        }
    };

    return (
        <>
            <div className="w-full">
                <form onSubmit={handleSubmit(handleForm)} className="flex flex-col p-4">
                    <fieldset className="mb-4">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do Produto
                        </label>
                        <input
                            id="productName"
                            type="text"
                            {...register("productName")}
                            className="inputs-default-form"
                        />
                        {errors.productName && (
                            <p className="text-red-600 text-sm mt-1">{errors.productName.message}</p>
                        )}
                    </fieldset>

                    <fieldset className="mb-4">
                        <label htmlFor="productUrlImage" className="block text-sm font-medium text-gray-700 mb-1">
                            Imagem do Produto (opcional)
                        </label>
                        <input
                            id="productUrlImage"
                            type="file"
                            accept="image/*"
                            className="inputs-default-form w-full outline-none border border-black rounded-md shadow-sm focus:border-2 h-10 py-2 pl-2"
                            onChange={handleImageUpload}
                        />
                        {loading && <p className="text-sm text-gray-500 text-center">Carregando...</p>}
                        {imagePreview && (
                            <div className="flex justify-center mt-2">
                                <img src={imagePreview} alt="Imagem do Produto" className="w-40 h-40 object-cover rounded-md" />
                            </div>
                        )}
                    </fieldset>

                    <fieldset className="mb-4">
                        <label htmlFor="productValue" className="block text-sm font-medium text-gray-700 mb-1">
                            Valor do Produto
                        </label>
                        <input
                            id="productValue"
                            type="number"
                            step="0.01"
                            {...register("productValue")}
                            className="inputs-default-form"
                        />
                        {errors.productValue && (
                            <p className="text-red-600 text-sm mt-1">{errors.productValue.message}</p>
                        )}
                    </fieldset>

                    <fieldset className="mb-4">
                        <label htmlFor="productCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Código do Produto (opcional)
                        </label>
                        <input
                            id="productCode"
                            type="text"
                            {...register("productCode")}
                            className="inputs-default-form"
                        />
                        {errors.productCode && (
                            <p className="text-red-600 text-sm mt-1">{errors.productCode.message}</p>
                        )}
                    </fieldset>

                    <fieldset className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-700 text-white p-3 rounded-md font-semibold"
                        >
                            Adicionar Produto
                        </button>
                    </fieldset>
                </form>
            </div>

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
        </>
    );
}
