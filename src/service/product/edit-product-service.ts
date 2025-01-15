import axios from "axios";

export async function editProduct(id: number, data: any) {
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/product/edit-product/${id}`,
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
        }
        throw new Error("Erro ao editar produto. Verifique sua conexão.");
    }
}
