import axios from "axios";

const api = axios.create({
    baseURL: process.env.PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.error('Erro na requisição:', error);
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            console.error('Erro na resposta:', {
                status: error.response.status,
                data: error.response.data,
            })

            if (error.response.status === 401) {
                if (typeof window !== 'undefined') {
                    window.location.href = '/user/login';
                }
            }
            else if (error.request) {
                console.error('Erro na requisição:', error.request);
            } else {
                console.error('Erro desconhecido:', error.message);
            }
        }
        return Promise.reject(error)
    }
)

export { api }