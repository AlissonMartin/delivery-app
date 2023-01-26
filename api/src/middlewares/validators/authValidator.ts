import { check, checkSchema } from "express-validator";

export const userSignUp = checkSchema({
    firstName: {
        trim:true,
        isLength: {
            options: { min: 2}
        },
        errorMessage: "O nome precisa de pelo menos 2 caracteres"
    },
    lastName: {
        trim: true,
        isLength: {
            options: { min: 2 }
        },
        errorMessage: "O sobrenome precisa de pelo menos 2 caracteres"
    },
    email: {
        isEmail:true,
        normalizeEmail: true,
        notEmpty: true,
        errorMessage: "Adicione um email válido"
    },
    password: {
        isLength: {
            options: { min: 4 }
        },
        errorMessage: "A senha precisa de ao menos 4 caracteres"
    },
    number: {
        notEmpty: true,
        errorMessage: 'Endereço inválido'
    },
    street: {
        trim: true,
        notEmpty: true,
        errorMessage: 'Endereço inválido'
    },
    district: {
        trim: true,
        notEmpty: true,
        errorMessage: 'Endereço inválido'
    },
    city: {
        trim: true,
        notEmpty: true,
        errorMessage: 'Endereço inválido'
    },
    state: {
        trim: true,
        notEmpty:true,
        errorMessage: 'Endereço inválido'
    }
})

export const signIn = checkSchema({
    email: {
        isEmail: true,
        normalizeEmail: true,
        notEmpty: true,
        trim: true,
        errorMessage: "Adicione um email válido"
    },
    password: {
        notEmpty: true,
        errorMessage: "Adicione uma senha válida"
    }
})

export const restaurantSignUp = checkSchema({
    name: {
        trim: true,
        isLength: {
            options: { min: 2 }
        },
        errorMessage: "O nome precisa de pelo menos 2 caracteres"
    },
    description: {

    },
    email: {
        isEmail: true,
        normalizeEmail: true,
        notEmpty: true,
        errorMessage: "Adicione um email válido"
    },
    password: {
        isLength: {
            options: { min: 3 }
        },
        errorMessage: "A senha precisa de ao menos 4 caracteres"
    },
    cnpj: {
        notEmpty: true,
        errorMessage: 'Digite um CNPJ válido'
    },
    number: {
        isInt: true,
        notEmpty: true,
        errorMessage: 'Endereço inválido'
    },
    street: {
        trim: true,
        notEmpty: true,
        errorMessage: 'Endereço inválido'
    },
    district: {
        trim: true,
        notEmpty: true,
        errorMessage: 'Endereço inválido'
    },
    city: {
        trim: true,
        notEmpty: true,
        errorMessage: 'Endereço inválido'
    },
    state: {
        trim: true,
        notEmpty: true,
        errorMessage: 'Endereço inválido'
    },
    category: {
        trim: true,
        notEmpty:true,
        errorMessage: 'Adicione uma categoria válida'
    }
})
