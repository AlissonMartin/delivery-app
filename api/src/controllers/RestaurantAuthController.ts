import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Restaurant from "../models/Restaurant";
import State from "../models/State";
import bcrypt from 'bcryptjs'
import Category from "../models/Category";
import sharp from 'sharp'
import fs from 'fs'
import { generateRestaurantAccessToken, generateRestaurantRefreshToken } from "../utils/jwt";

dotenv.config()

export const signUp = async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() })
        return
    }

    const data = matchedData(req)

    // Email validation

    const emailValid = await Restaurant.findOne({ email: data.email })

    if (emailValid) {
        res.json({ error: "Email já cadastrado" })
        return
    }

    // State validation

    const stateValid = await State.findOne({ state: data.state })

    if (!stateValid) {
        res.json({ error: "Selecione um estado válido" })
        return
    }

    // Password

    const passwordHash = await bcrypt.hash(data.password, 10)

    // Category

    const cat = await Category.findOne({ name: data.category })

    if (!cat) {
        res.json({ error: "Categoria inválida" })
        return
    }

    // Photo

    const photo = req.file

    if(!photo) {
        res.status(400).json('Adicione uma imagem')
        return
    }

    const filename = `${photo.fieldname}-${Math.floor(Math.random() * 9999)}${Date.now()}`
    await sharp(photo.buffer).resize(400).toFile(`./public/photos/${filename}`)

    

    // creating new restaurant

    const newRest = new Restaurant()

    newRest.name = data.name,
        newRest.email = data.email,
        newRest.cnpj = data.cnpj,
        newRest.password = passwordHash,
        newRest.adress = {
            number: data.number,
            street: data.street,
            district: data.district,
            city: data.city,
            state: data.state
        },
        newRest.category = data.category
        newRest.photo = filename

    const newRestRes = await newRest.save()

    // Refresh Token

    const refreshToken = generateRestaurantRefreshToken(newRestRes.id)

    const restaurant = await Restaurant.findById(newRestRes.id)
    restaurant.refreshToken = refreshToken
    restaurant.save()

    const token = generateRestaurantAccessToken(newRestRes.id)

    res.json({ restaurante: "Cadastrado!", token, refreshToken })

}

export const signIn = async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.json(errors.mapped())
        return
    }

    const data = matchedData(req)

    // Email validation

    const restaurant: any = await Restaurant.findOne({ email: data.email })

    if (!restaurant) {
        res.json('Email e/ou senha inválidos')
        return
    }

    const compare = await bcrypt.compare(data.password, restaurant.password)

    if (!compare) {
        res.json('Senha inválida')
        return
    }

    const token = generateRestaurantAccessToken(restaurant.id)

    const refreshToken = generateRestaurantRefreshToken(restaurant.id)

    restaurant.refreshToken = refreshToken

    restaurant.save()

    res.json({ email: restaurant.email, token, refreshToken })
}

export const editAction = async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() })
        return
    }

    const data = matchedData(req)
    const restId = req.token.restId

    const restaurant = await Restaurant.findById(restId)


    if (data.name) {
        restaurant.name = data.name
    }

    if (data.email) {
        const emailValid = await Restaurant.findOne({ email: data.email })

        if (emailValid) {
            res.json({ error: 'Email já existe' })
            return
        }

        restaurant.email = data.email
    }

    if (data.password) {
        const passwordHash = await bcrypt.hash(data.password, 10)
        restaurant.password = passwordHash
    }

    const file = req.files as any
    const photo = file.photo[0]
    const banner = file.banner[0]


    if (photo) {
        const filename = `${photo.fieldname}-${Math.floor(Math.random() * 9999)}${Date.now()}.jpg`
        await sharp(photo.buffer).resize(400).toFile(`./public/photos/${filename}`)
        if (restaurant.photo) {
            fs.unlink(`./public/photos/${restaurant.photo}`, (err) => {
                if (err) {
                    console.log('It failed')
                } else {
                    console.log('Successfully deleted')
                }
            })
        }
        restaurant.photo = filename
    }

    if (banner) {
        const filename = `${banner.fieldname}-${Math.floor(Math.random() * 9999)}${Date.now()}.jpg`
        await sharp(banner.buffer).resize(1200, 300).toFile(`./public/banners/${filename}`)
        if (restaurant.banner) {
            fs.unlink(`./public/photos/${restaurant.banner}`, (err) => {
                if (err) {
                    console.log('It failed')
                } else {
                    console.log('Successfully deleted')
                }
            })
        }
        restaurant.banner = filename

    }

    restaurant.save()

    res.json("Dados atualizados")
}

export const RefreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken

    if (!refreshToken) {
        return res.json('Envie um token')
    }

    const validRefreshToken = await Restaurant.findOne({refreshToken: refreshToken})
    if (!validRefreshToken) {
        return res.json('Token inválido')
    }

    try {
        jwt.verify(refreshToken, process.env.SECRET as string)

        const token = jwt.sign({ restId: validRefreshToken.id }, process.env.SECRET as string)

        res.json({ token: token, refreshToken: refreshToken })

    } catch(error) {
        res.json('Token inválido')
    }

}

export const Logout = async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken

    const restaurant = await Restaurant.findOne({ refreshToken: refreshToken })

    if (!restaurant) {
        res.status(404).json('Token inválido')
    }
    restaurant.refreshToken = ""
    restaurant.save()
    res.status(200).json('Logout com sucesso')
}