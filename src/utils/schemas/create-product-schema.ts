import * as yup from "yup";

export const productSchema = yup.object().shape({
    productName: yup.string().trim().required("Nome do produto é obrigatório."),
    productUrlImage: yup.string().url("URL inválida.").optional(),
    productValue: yup
        .number()
        .positive("O valor deve ser maior que zero.")
        .required("Valor do produto é obrigatório."),
    productCode: yup.string().trim().optional(),

});
