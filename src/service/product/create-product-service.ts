import axios from "axios"
import api from "../api-service";
import { FormProductInterface } from "@/context/products";

export const createProduct = async (data: FormProductInterface) => {
    try {
        const response = await api.post("/product/create-product", data);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const serverMessage = error.response?.data?.message || "Erro desconhecido no servidor.";
            throw new Error(`Erro ao criar produto: ${serverMessage}`);
        } else if (error instanceof Error) {
            throw new Error(`Erro ao criar produto: ${error.message}`);
        } else {
            throw new Error("Erro inesperado ao criar produto.");
        }
    }
};
