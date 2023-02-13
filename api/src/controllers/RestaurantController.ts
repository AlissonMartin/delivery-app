import { Request, Response } from "express";
import dotenv from 'dotenv'
import Restaurant from "../models/Restaurant";
import Category from "../models/Category";
import { isObjectIdOrHexString } from "mongoose";
import sharp from 'sharp';

dotenv.config()

export const listRestaurants = async (req:Request, res:Response)=> {
    const offset: any = req.query.offset ? req.query.offset : '0'
    const q = req.query.q
    const category = req.query.cat
    const limit: any = req.query.limit
    const filters: {[k:string]:any} = {}
    if (category) {
        const catItem = await Category.findOne({slug: category})
        const cat = catItem.name
        

        if (cat) {
            filters.category = cat
        }
    }

    if (q) {
        filters.name = {$regex: q, $options: 'i'}
    }

    console.log(filters)

    const restaurantsData = await Restaurant.find(filters).skip(offset ? parseInt(offset) : 0).limit(limit ? parseInt(limit) : 500)

    let restaurants = []

    for (let i in restaurantsData) {
        restaurants.push({
            id: restaurantsData[i].id,
            name: restaurantsData[i].name,
            adress: restaurantsData[i].adress,
            photo: `${process.env.BASE_URL}${process.env.API_PORT}/public/photos/${restaurantsData[i].photo}`,
            banner: `${process.env.BASE_URL}${process.env.API_PORT}/public/banners/${restaurantsData[i].banner}`,
            category: restaurantsData[i].category
        })
    }

    const TotalRestaurants = await Restaurant.find(filters)

    res.json({restaurants, totalRestaurants: TotalRestaurants.length})

}

export const listRestaurant = async (req:Request, res:Response)=> {
    const id = req.params.id

    const validId = isObjectIdOrHexString(id)

    if (!validId) {
        res.json('Id inválido')
        return
    }

    const restaurantData = await Restaurant.findById(id).select('-cnpj -password -refreshToken')

    restaurantData.photo = `${process.env.BASE_URL}${process.env.API_PORT}/public/photos/${restaurantData.photo}`
    restaurantData.banner = `${process.env.BASE_URL}${process.env.API_PORT}/public/banners/${restaurantData.banner}`

    for (let i in restaurantData.foods) {
        restaurantData.foods[i].image = `${process.env.BASE_URL}${process.env.API_PORT}/public/photos/products/${restaurantData.foods[i].image}`
    }

    for (let i in restaurantData.drinks) {
        restaurantData.drinks[i].image = `${process.env.BASE_URL}${process.env.API_PORT}/public/photos/products/${restaurantData.drinks[i].image}`
    }

    res.json(restaurantData)

}

export const addFood = async (req:Request, res:Response)=> {
    const id = req.token.restId
    const name = req.body.name
    const price = req.body.price
    const description = req.body.description
    const photo = req.file
    let filename = ''

    if (photo) {
        filename = `${photo.fieldname}-${Math.floor(Math.random() * 9999)}${Date.now()}.jpg`
        await sharp(photo.buffer).resize(400).toFile(`./public/photos/products/${filename}`)
    }

    const restaurant = await Restaurant.findOneAndUpdate({_id: id}, {
        $push: { foods: {name, price, description, image:filename} }
    })

    if (!restaurant) {
        res.status(404).json({error: 'não encontrado'})
    }


    res.status(200).json('Adicionado com sucesso')
}

export const addDrink = async (req:Request, res:Response)=> {
    const id = req.token.restId
    const name = req.body.name
    const price = req.body.price
    const description = req.body.description
    const photo = req.file
    let filename = ''

    if (photo) {
        filename = `${photo.fieldname}-${Math.floor(Math.random() * 9999)}${Date.now()}.jpg`
        await sharp(photo.buffer).resize(400).toFile(`./public/photos/products/${filename}`)
    }

    const restaurant = await Restaurant.findOneAndUpdate({_id: id}, {
        $push: { drinks: {name, price, description, image:filename} }
    })

    if (!restaurant) {
        res.status(404).json({error: 'não encontrado'})
    }


    res.status(200).json('Adicionado com sucesso')
}