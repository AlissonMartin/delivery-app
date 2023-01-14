import { connection, model, Schema } from "mongoose"

type UserType = {
    name: {
        firstName: string,
        lastName: string,
    },
    email: string,
    password: string,
    adress: {
        number: number,
        street:string,
        district: string,
        city: string,
        state:string
    },
    photo: string,
    refreshToken: string
}

const schema = new Schema<UserType>({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true}
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    adress: {
        number: { type: Number, required: true },
        street: { type: String, required: true },
        district: { type: String, required: true },
        city: {type: String, required: true},
        state: { type: String, required: true },
    },
    photo: String,
    refreshToken: String
})

const modelName: string = 'User'

export default (connection && connection.models[modelName] ? connection.models[modelName] : model<any>(modelName, schema))