import bcrypt from "bcryptjs"
import { Request, Response } from "express"
import  User  from '../models/User'
import path from 'path'
import sharp from "sharp"

export const userInfo = async (req:Request, res:Response)=> {
    const id = req.token.userId

    const user = await User.findById(id).select('-password -refreshToken')

    if (!user) {
        res.status(404).json('Usuário não encontrado')
    } else {
        if (user.photo) {
            user.photo = `${process.env.BASE_URL}${process.env.API_PORT}/public/photos/${user.photo}`
        }
        res.json(user)
    }
}

export const userEdit = async (req:Request, res:Response)=> {
    const id = req.token.userId
    console.log(req.body)
    let filename = ''

    const user = await User.findById(id)
    

    if (user) {

        if (req.body.firstName) {
            user.name.firstName = req.body.firstName
        }
        if (req.body.lastName) {
            user.name.lastName = req.body.lastName
        }
        if (req.body.email ) {
            const userEmail = await User.find({email: req.body.email})
            if (userEmail.length !== 0) {
                return res.json('Email já esta em uso')
            } else {
                user.email = req.body.email
            }
        }
        if (req.body.password) {
            const passwordHash = await bcrypt.hash(req.body.password, 10)
            user.password = passwordHash
        }
        if (req.body.state) {
            user.adress.state = req.body.state
        }
        if (req.body.city) {
            user.adress.city = req.body.city
        }
        if (req.body.district) {
            user.adress.district = req.body.district
        }
        if (req.body.street) {
            user.adress.street = req.body.street
        }
        if (req.body.number) {
            user.adress.number = req.body.number
        }
        if (req.file) {
                filename = `${req.file.fieldname}-${Math.floor(Math.random() * 9999)}${Date.now()}.jpg`
                await sharp(req.file.buffer).resize(400).toFile(path.join(__dirname, '..', '..', 'public', 'photos', filename))
                user.photo = filename
        }

        user.save()
        return res.status(202).json('Informações atualizadas com sucesso')
        

    } else {
        return res.status(404).json('Usuário inválido')
    }
}