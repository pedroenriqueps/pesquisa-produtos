import axios from "axios";
import { FormProductInterface } from "@/context/products";

export const createProduct = async (data: FormProductInterface) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/create-product`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const serverMessage = error.response.data?.message || "Erro desconhecido no servidor.";
            throw new Error(`Erro ao criar produto: ${serverMessage}`);
        }
        throw new Error("Erro ao criar produto. Verifique sua conexão.");
    }
};
