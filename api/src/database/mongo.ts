import mongoose, {connect} from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', false)

export const mongoConnect = async ()=> {
    try {
        await connect(process.env.MONGODB_URL as string)
        console.log('CONECTADO')
    } catch(error) {
        console.log('Erro de conexão mongoDB', error)
    }
}