import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        console.error("Erro ao configurar a requisição:", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error("Erro na resposta do servidor:", {
                    status: error.response.status,
                    data: error.response.data,
                });

                if (error.response.status === 401 && typeof window !== "undefined") {
                    console.error("erro, usuário não autorizado")
                }
            } else if (error.request) {
                console.error("Erro na requisição (sem resposta):", error.request);
            } else {
                console.error("Erro desconhecido:", error.message);
            }
        } else {
            console.error("Erro genérico:", error);
        }
        return Promise.reject(error);
    }
);

export default api;
