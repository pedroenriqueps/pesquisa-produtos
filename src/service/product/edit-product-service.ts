import { FormProductInterface } from "@/context/products";
import axios from "axios";

export async function EditProduct(productData: FormProductInterface) {
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/product/edit-product/${productData.id}`,
            productData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const serverMessage = error.response.data?.message || "Erro desconhecido no servidor.";
            throw new Error(`Erro ao editar produto: ${serverMessage}`);
        }
        throw new Error("Erro ao editar produto. Verifique sua conexão.");
    }
}
