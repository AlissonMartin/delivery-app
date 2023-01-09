import { connection, model, Schema } from "mongoose"

interface stateModelType {
    state: string,
    abbreviation: string
}

const schema = new Schema<stateModelType>({
    state: {type: String, required: true},
    abbreviation: {type: String, required: true}
})

const modelName: string = 'State'

export default (connection && connection.models[modelName] ? connection.models[modelName] : model<any>(modelName, schema))