import { check, checkSchema } from "express-validator";

export const restaurantEdit = checkSchema({
    name: {
        trim: true,
        isLength: {
            options: { min: 2 }
        },
        errorMessage: "O nome precisa de pelo menos 2 caracteres"
    },
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "Adicione um email válido"
    },
    password: {
        isLength: {
            options: { min: 4 }
        },
        errorMessage: "A senha precisa de ao menos 4 caracteres"
    },
    cnpj: {
        errorMessage: 'Digite um CNPJ válido'
    },
    number: {
        isInt: true,
        errorMessage: 'Endereço inválido'
    },
    street: {
        trim: true,
        errorMessage: 'Endereço inválido'
    },
    district: {
        trim: true,
        errorMessage: 'Endereço inválido'
    },
    city: {
        trim: true,
        errorMessage: 'Endereço inválido'
    },
    state: {
        trim: true,
        errorMessage: 'Endereço inválido'
    }
})