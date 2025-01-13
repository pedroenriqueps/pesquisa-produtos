import axios from "axios";

export async function fetchProducts() {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/list-products`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const serverMessage = error.response.data?.message || "Erro desconhecido no servidor.";
            throw new Error(`Erro ao listar produtos: ${serverMessage}`);
        }
        throw new Error("Erro ao listar produtos. Verifique sua conexão.");
    }
}
