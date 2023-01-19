import { Request, Response, RequestHandler, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config

interface customJwtPayload extends JwtPayload {
    userId: string
}

export const verify = (req:any, res:Response, next:NextFunction)=> {
    const authorization = req.headers.authorization
    if (authorization) {
        const token = authorization.split(' ')
        
        try {
            const decoded = jwt.verify(token[1], process.env.SECRET as string) as customJwtPayload
            req.token = decoded
            next()
        } catch(error) {
            res.json('token inválido')
            return
        } 
    } else {
        res.json({ error: "Permissão negada" })
    }

}