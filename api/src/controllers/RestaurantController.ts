import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Restaurant from "../models/Restaurant";
import State from "../models/State";
import bcrypt from 'bcryptjs'
import Category from "../models/Category";
import { isObjectIdOrHexString } from "mongoose";
import sharp from 'sharp'
import fs from 'fs'

dotenv.config()

export const signUp = async (req: Request, res: Response)=> {
    const errors =  validationResult(req)

    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() })
        return
    }

    const data = matchedData(req)

    // Email validation

    const emailValid = await Restaurant.findOne({email: data.email})

    if (emailValid) {
        res.json({error: "Email já cadastrado"})
        return
    }

    // State validation

    const stateValid = await State.findOne({state: data.state})

    if (!stateValid) {
        res.json({error: "Selecione um estado válido"})
        return
    }

    // Password

    const passwordHash = await bcrypt.hash(data.password, 10)

    // Category

    const cat = await Category.findOne({name: data.category})

    if (!cat) {
        res.json({error: "Categoria inválida"})
        return
    }

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

    const newRestRes = await newRest.save()

    const token = jwt.sign({restId: newRestRes.id}, process.env.SECRET as string)

    res.json({restaurant: "Cadastrado!", token})

}

export const signIn = async(req:Request, res:Response)=> {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.json(errors.mapped())
        return
    }

    const data = matchedData(req)

    // Email validation

    const restaurant:any = await Restaurant.findOne({email: data.email})
    console.log(restaurant)

    if (!restaurant) {
        res.json('Email e/ou senha inválidos')
        return
    }

    const compare = await bcrypt.compare(data.password, restaurant.password)

    if (!compare) {
        res.json('Senha inválida')
        return
    }

    const token = jwt.sign({ restId: restaurant.id }, process.env.SECRET as string)

    res.json({email: restaurant.email, token})
}

export const listRestaurants = async (req:Request, res:Response)=> {
    const offset: any = req.query.offset ? req.query.offset : '0'
    const category = req.query.category
    const limit: any = req.query.limit
    const filters: {[k:string]:any} = {}

    if (category) {
        const cat = await Category.findOne({name: category})

        if (cat) {
            filters.category = category
        }
    }


    const adsData = await Restaurant.find(filters).skip(offset ? parseInt(offset) : 0).limit(limit ? parseInt(limit) : 500)

    let ads = []

    for (let i in adsData) {
        ads.push({
            id: adsData[i].id,
            name: adsData[i].name,
            adress: adsData[i].adress,
            photo: adsData[i].photo,
            category: adsData[i].category
        })
    }

    res.json(ads)

}

export const listRestaurant = async (req:Request, res:Response)=> {
    const id = req.params.id

    const validId = isObjectIdOrHexString(id)

    if (!validId) {
        res.json('Id inválido')
        return
    }

    const restaurantData = await Restaurant.findById(id).select('-cnpj -password')

    res.json(restaurantData)

}

export const editAction = async(req:Request, res:Response)=> {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.json({error: errors.mapped()})
        return
    }

    const data = matchedData(req)
    const restId = req.token.restId

    const restaurant = await Restaurant.findById(restId)


    if (data.name) {
        restaurant.name = data.name
    }

    if (data.email) {
        const emailValid = await Restaurant.findOne({email: data.email})

        if (emailValid) {
            res.json({error: 'Email já existe'})
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
            fs.unlink(`./public/photos/${restaurant.photo}`, (err)=> {
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