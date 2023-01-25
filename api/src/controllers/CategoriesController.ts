import { Request, Response } from "express"

import Category from "../models/Category"
import dotenv from 'dotenv'

dotenv.config()


export const getCategories = async(req:Request, res:Response) => {
    const cats = await Category.find({})

    const categories = []

    for (let i in cats) {
        categories.push({
            name: cats[i].name,
            img: `${process.env.BASE_URL}${process.env.API_PORT}/public/svg/${cats[i].slug}.svg`,
            slug: cats[i].slug
        })
    }

    res.json({categories})
}