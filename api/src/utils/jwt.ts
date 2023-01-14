import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

export const generateUserAccessToken = (userId: string)=> {

    const token = jwt.sign({ userId: userId }, process.env.SECRET as string, { expiresIn: '1m' })

    return token
}

export const generateUserRefreshToken = (userId:string)=> {

    const refreshToken = jwt.sign({ userId: userId }, process.env.SECRET as string)

    return refreshToken
}

export const generateRestaurantAccessToken = (restId: string) => {

    const token = jwt.sign({ restId: restId }, process.env.SECRET as string, { expiresIn: '1m' })

    return token
}


export const generateRestaurantRefreshToken = (restId: string) => {

    const token = jwt.sign({ restId: restId }, process.env.SECRET as string)

    return token
}
