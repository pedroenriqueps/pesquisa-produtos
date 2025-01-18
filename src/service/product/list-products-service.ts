import axios from "axios";
import api from "@/service/api-service"

export async function fetchProducts() {
    try {
        const response = await api.get(`/product/list-products`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const serverMessage = error.response.data?.message || "Erro desconhecido no servidor.";
            throw new Error(`Erro ao listar produtos: ${serverMessage}`);
        } else if (error instanceof Error) {
            throw new Error(`Erro ao listar produtos: ${error.message}`);
        }
        throw new Error("Erro inesperado ao listar produtos.");
    }
}
