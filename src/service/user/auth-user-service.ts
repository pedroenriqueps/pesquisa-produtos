import axios from "axios";
import api from "@/service/api-service";
import { AuthUserInterface } from "@/components/Form-auth-user/Form-auth-user";

export async function createUser(data: AuthUserInterface) {
    try {
        const response = await api.post(`/auth-user`, data);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 400) {
                    throw new Error("Dados inválidos. Por favor, verifique os campos e tente novamente.");
                } else if (error.response.status === 500) {
                    throw new Error("Erro no servidor. Tente novamente mais tarde.");
                }
                throw new Error(`Erro ao tentar criar o usuário: ${error.response.statusText}`);
            } else if (error.request) {
                throw new Error("Não foi possível se conectar ao servidor. Verifique sua conexão.");
            }
        } else if (error instanceof Error) {
            throw new Error(`Erro desconhecido: ${error.message}`);
        } else {
            throw new Error("Erro inesperado ao tentar criar o usuário.");
        }
    }
}
