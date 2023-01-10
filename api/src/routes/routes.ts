import { Router } from "express";
import * as authValidator from "../middlewares/validators/authValidator";
import * as restaurantValidator from "../middlewares/validators/restaurantValidator";
import * as userController from "../controllers/UserController"
import * as restaurantController from "../controllers/RestaurantController"
import { verify } from '../middlewares/verifyJWT'
import multer, { FileFilterCallback } from 'multer'

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=> {
//         cb(null, './public')
//     },
//     filename: (req, file, cb)=> {
//         cb(null, file.fieldname + '-' + Math.floor(Math.random() * 9999) + Date.now() + '.jpg')
//     }
// })

const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback): void => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({storage: multer.memoryStorage(), fileFilter})

const router = Router()

// users
router.post('/user/signup', authValidator.userSignUp, userController.signUp)
router.post('/user/signin', authValidator.signIn, userController.signIn)
router.put('/user/me')

// restaurant
router.post('/restaurant/signup', authValidator.restaurantSignUp, restaurantController.signUp)
router.post('/restaurant/signin', authValidator.signIn, restaurantController.signIn)
router.put('/restaurant/me', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),restaurantValidator.restaurantEdit ,verify, restaurantController.editAction)

router.get('/restaurants', restaurantController.listRestaurants)
router.get('/restaurant/:id', restaurantController.listRestaurant)

export default router