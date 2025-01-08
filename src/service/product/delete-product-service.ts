import axios from "axios";

export async function deleteProduct(id: number) {
    try {
        const response = await axios.delete(`/api/product/delete-product/?id=${id}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const serverMessage = error.response.data?.message || "Erro desconhecido no servidor.";
            throw new Error(`Erro ao deletar produto: ${serverMessage}`);
        }
        throw new Error("Erro ao deletar produto. Verifique sua conexão.");
    }
}
