import { connection, model, Schema } from "mongoose"

interface stateModelType {
    name: string,
}

const schema = new Schema<stateModelType>({
    name: { type: String, required: true }
})

const modelName: string = 'Category'

export default (connection && connection.models[modelName] ? connection.models[modelName] : model<any>(modelName, schema))