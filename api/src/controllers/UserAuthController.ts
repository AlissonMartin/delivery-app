import bcrypt from "bcryptjs"
import { Request, Response } from "express"
import { validationResult, matchedData } from "express-validator"
import State from "../models/State"
import User from '../models/User'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { generateUserAccessToken, generateUserRefreshToken } from "../utils/jwt"

dotenv.config()

export const signUp = async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() })
        return
    }

    const data = matchedData(req)

    // Email Validator

    const emailValid = await User.find({ email: data.email })

    if (emailValid.length !== 0) {
        res.json({ error: 'Email ja cadastrado!' })
        return
    }


    // Password
    const passwordHash = await bcrypt.hash(data.password, 10)

    // State Validation

    const stateValid = await State.find({ state: data.state })

    if (stateValid.length == 0) {
        res.json({ error: "Adicione um estado válido" })
        return
    }

    // Creating new User

    const newUser = new User()

    newUser.name = { firstName: data.firstName, lastName: data.lastName },
    newUser.email = data.email
    newUser.password = passwordHash
    newUser.adress = {
        number: data.number,
        street: data.street,
        district: data.district,
        city: data.city,
        state: data.state
    }

    const newUserRes = await newUser.save()

    const refreshToken = generateUserRefreshToken(newUserRes.id)

    const user = await User.findById(newUserRes.id)
    user.refreshToken = refreshToken
    user.save()

    const token = generateUserAccessToken(newUserRes.id)

    res.status(200).json({ user: 'Cadatrado', token, refreshToken })

}

export const signIn = async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() })
        return
    }

    const data = matchedData(req)

    const user: any = await User.findOne({ email: data.email })

    if (!user) {
        res.json({ error: "Email e/ou senha inválidos" })
        return
    }

    const match = await bcrypt.compare(data.password, user.password)

    if (!match) {
        res.json({ error: "Email e/ou senha inválidos" })
        return
    }

    const token = generateUserAccessToken(user.id)

    const refreshToken = generateUserRefreshToken(user.id)

    user.refreshToken = refreshToken

    user.save()

    res.status(200).json({ email: data.email, token, refreshToken })
}

export const Logout = async (req:Request, res:Response)=> {
    const refreshToken = req.body.refreshToken

    const user = await User.findOne({refreshToken: refreshToken})
    user.refreshToken = ""
    user.save()
}