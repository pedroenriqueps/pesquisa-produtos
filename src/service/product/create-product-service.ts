import axios from "axios";
import { FormProductInterface } from "@/context/products";

export const createProduct = async (data: FormProductInterface) => {
    try {
        const response = await axios.post("/api/product/create-product", data);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const serverMessage = error.response.data?.message || "Erro desconhecido no servidor.";
            throw new Error(`Erro ao criar produto: ${serverMessage}`);
        }
        throw new Error("Erro ao criar produto. Verifique sua conexão.");
    }
};
