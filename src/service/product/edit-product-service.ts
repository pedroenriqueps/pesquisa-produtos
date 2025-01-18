import axios from "axios";
import api from "@/service/api-service"

export async function editProduct(id: number, data: any) {
    try {
        const response = await api.put(
            `/product/edit-product/${id}`,
            data,
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
        } else if (error instanceof Error) {
            throw new Error(`Erro ao editar produto: ${error.message}`);
        } else {
            throw new Error("Erro inesperado ao editar produto.");
        }
    }
}
