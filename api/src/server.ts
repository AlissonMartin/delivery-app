import express from 'express'
import dotenv from 'dotenv'
import { mongoConnect } from './database/mongo'
import path from 'path'
import apiRoutes from './routes/routes'
import cors from 'cors'

dotenv.config()

mongoConnect()

const server = express()

server.use(express.json())
server.use('/public', express.static(path.join(__dirname,'../public')))
server.use(express.urlencoded({extended: true}))

server.use(cors())


server.use(apiRoutes)

server.listen(parseInt(process.env.API_PORT as string), '0.0.0.0', () => console.log(`Listening on port: 6001`))
