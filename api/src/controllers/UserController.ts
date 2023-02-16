import bcrypt from "bcryptjs"
import { json, Request, Response } from "express"
import { validationResult, matchedData } from "express-validator"
import  User  from '../models/User'
import dotenv from 'dotenv'

export const userInfo = async (req:Request, res:Response)=> {
    const id = req.token.userId

    const user = await User.findById(id).select('-password -refreshToken')

    if (!user) {
        res.status(404).json('Usuário não encontrado')
    } else {
        res.json(user)
    }
}