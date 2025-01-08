import axios from "axios"

export async function fetchProducts() {
    try {
        const response = await axios.get("/api/product/list-products");
        return response.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const serverMessage = error.response.data?.message || "Erro desconhecido no servidor.";
            throw new Error(`Erro ao listar produto: ${serverMessage}`);
        }
        throw new Error("Erro ao listar produto. Verifique sua conexão.");
    }
}
