"use client";

import { createUser } from "@/service/user/auth-user-service";
import { useForm } from "react-hook-form";
import { userschema } from "@/utils/schemas/create-user-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface AuthUserInterface {
    code: string;
    password: string;
}

export function FormAuthUser() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(userschema)
    });

    const handleFormAuthUser = async (data: AuthUserInterface) => {
        try {
            await createUser(data);
            toast.success("Seja bem vindo");
            reset()
            window.location.assign("/");
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast.error("Usuário não encontrado.");
                } else if (error.response?.status === 401) {
                    toast.error("Credenciais inválidas.");
                } else {
                    toast.error("Erro desconhecido ao tentar fazer login.");
                }
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Não foi possível fazer login. Tente novamente.");
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl text-green-700 text-center my-7">Faça login abaixo</h1>
            <form onSubmit={handleSubmit(handleFormAuthUser)} className="flex flex-col p-4">
                <fieldset className="mb-4">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                        Digite o código de usuário
                    </label>
                    <input
                        id="code"
                        type="text"
                        {...register("code")}
                        className="inputs-default-form"
                    />
                    {errors.code && (
                        <p className="text-red-600 text-sm mt-1">{errors.code.message}</p>
                    )}
                </fieldset>
                <fieldset className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Digite a senha
                    </label>
                    <input
                        id="password"
                        type="text"
                        {...register("password")}
                        className="inputs-default-form"
                    />
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                    )}
                </fieldset>
                <fieldset className="flex justify-center">
                    <button type="submit" className="bg-green-700 text-white p-3 rounded-md font-semibold w-[26%]">
                        Entrar
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
