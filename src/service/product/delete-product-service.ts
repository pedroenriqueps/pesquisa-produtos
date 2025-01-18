import axios from "axios";
import api from "../api-service"

export async function deleteProduct(id: number) {
    try {
        const response = await api.delete(`/product/delete-product/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const serverMessage = error.response.data?.message || "Erro desconhecido no servidor.";
            throw new Error(`Erro ao deletar produto: ${serverMessage}`);
        } else if (error instanceof Error) {
            throw new Error(`Erro ao deletar produto: ${error.message}`);
        } else {
            throw new Error("Erro inesperado ao deletar produto.");
        }
    }
}
