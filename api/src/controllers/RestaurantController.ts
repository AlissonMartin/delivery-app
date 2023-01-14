import { Request, Response } from "express";
import dotenv from 'dotenv'
import Restaurant from "../models/Restaurant";
import Category from "../models/Category";
import { isObjectIdOrHexString } from "mongoose";

dotenv.config()

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