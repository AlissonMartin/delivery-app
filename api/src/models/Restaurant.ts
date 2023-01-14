import { connection, model, Schema } from "mongoose"

interface restaurantType {
    name: string,
    cnpj: string,
    email: string,
    password: string,
    adress: {
        number: number,
        street: string,
        district: string,
        city: string,
        state: string
    },
    products: {
        foods: [{
            productId:any,
            name: string,
            price: number,
            image:string,
            description: string
        }],
        drinks: [{
            productId: any,
            name: string,
            price: number,
            image: string,
            description: string
        }]
    },
    category: string,
    photo: string,
    banner: string,
    refreshToken: string
}

const schema = new Schema<restaurantType>({
    name: {type: String, required: true},
    cnpj: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    adress: {
        number: { type: Number, required: true },
        street: { type: String, required: true },
        district: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
    },
    products: {
        foods: [{
            productId: Schema.Types.ObjectId,
            name: String,
            price: Number,
            image: String,
            description: String
        }],
        drinks: [{
            productId: Schema.Types.ObjectId,
            name: String,
            price: Number,
            image: String,
            description: String
        }]
    },
    category: {type: String, required: true},
    photo: String,
    banner: String,
    refreshToken: String
})

const modelName: string = 'Restaurant'

export default (connection && connection.models[modelName] ? connection.models[modelName] : model<any>(modelName, schema))