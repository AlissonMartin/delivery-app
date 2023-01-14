import { connection, model, Schema } from "mongoose"

interface stateModelType {
    name: string,
    slug: string
}

const schema = new Schema<stateModelType>({
    name: { type: String, required: true },
    slug: {type: String, required: true}
})

const modelName: string = 'Category'

export default (connection && connection.models[modelName] ? connection.models[modelName] : model<any>(modelName, schema))