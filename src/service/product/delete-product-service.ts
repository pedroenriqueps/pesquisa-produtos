import axios from "axios";

export async function deleteProduct(id: number) {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/delete-product`, {
            params: { id },
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const serverMessage = error.response.data?.message || "Erro desconhecido no servidor.";
            throw new Error(`Erro ao deletar produto: ${serverMessage}`);
        }
        throw new Error("Erro ao deletar produto. Verifique sua conexão.");
    }
}
