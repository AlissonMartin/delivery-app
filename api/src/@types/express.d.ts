declare namespace Express {
    export interface Request {
        token: {
            userId?: string,
            restId?: string,
            iat: number
        }
    }
}
