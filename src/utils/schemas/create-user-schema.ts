import * as yup from "yup";

export const userschema = yup.object().shape({
    code: yup
        .string()
        .required("O código de usuário é obrigatório.")
        .min(4, "O tamanho mínimo do código de usuário é 4 caracteres.")
        .max(32, "O tamanho máximo do código de usuário é 32 caracteres."),
    password: yup
        .string()
        .required("A senha é obrigatória.")
        .min(4, "A senha deve ter pelo menos 4 caracteres.")
        .max(128, "A senha pode ter no máximo 128 caracteres.")
        .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
        .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
        .matches(/[0-9]/, "A senha deve conter pelo menos um número.")
        .matches(/[@$!%*?&#]/, "A senha deve conter pelo menos um caractere especial.")
});
