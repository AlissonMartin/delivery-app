import { Router } from "express";
import * as authValidator from "../middlewares/validators/authValidator";
import * as restaurantValidator from "../middlewares/validators/restaurantValidator";
import * as userController from "../controllers/UserController"
import * as userAuthController from "../controllers/UserAuthController"
import * as restaurantController from "../controllers/RestaurantController"
import * as restaurantAuthController from "../controllers/RestaurantAuthController"
import * as CategoriesController from "../controllers/CategoriesController"
import { verify } from '../middlewares/verifyJWT'
import multer, { FileFilterCallback } from 'multer'

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
router.post('/user/signup', authValidator.userSignUp, userAuthController.signUp)
router.post('/user/signin', authValidator.signIn, userAuthController.signIn)
router.put('/user/me')

// restaurant
router.post('/restaurant/signup', authValidator.restaurantSignUp, restaurantAuthController.signUp)
router.post('/restaurant/signin', authValidator.signIn, restaurantAuthController.signIn)
router.put('/restaurant/me', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), restaurantValidator.restaurantEdit, verify, restaurantAuthController.editAction)

router.get('/restaurants', restaurantController.listRestaurants)
router.get('/restaurant/:id', restaurantController.listRestaurant)

router.post('/restaurant/refresh', )

router.get('/categories', CategoriesController.getCategories)

export default router