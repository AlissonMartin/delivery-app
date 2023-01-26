import { Request, Response } from "express";
import dotenv from 'dotenv'
import Restaurant from "../models/Restaurant";
import Category from "../models/Category";
import { isObjectIdOrHexString } from "mongoose";

dotenv.config()

export const listRestaurants = async (req:Request, res:Response)=> {
    const offset: any = req.query.offset ? req.query.offset : '0'
    const q = req.query.q
    const category = req.query.cat
    const limit: any = req.query.limit
    const filters: {[k:string]:any} = {}
    if (category) {
        const cat = await Category.findOne({name: category})

        if (cat) {
            filters.category = category
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
            photo: `${process.env.BASE_URL}${process.env.API_PORT}/public/photos/${restaurantsData[i].photo}.jpg`,
            banner: `${process.env.BASE_URL}${process.env.API_PORT}/public/banners/${restaurantsData[i].banner}.jpg`,
            category: restaurantsData[i].category
        })
    }

    const TotalRestaurants = await Restaurant.find()

    res.json({restaurants, TotalRestaurants: TotalRestaurants.length})

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