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

router.post('/user/refresh', userAuthController.RefreshToken)
router.post('/user/logout', verify, userAuthController.Logout)

// restaurant
router.post('/restaurant/signup',upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), authValidator.restaurantSignUp, restaurantAuthController.signUp)
router.post('/restaurant/signin', authValidator.signIn, restaurantAuthController.signIn)
router.put('/restaurant/me', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), restaurantValidator.restaurantEdit, verify, restaurantAuthController.editAction)
router.post('/restaurant/food', upload.single('photo'), verify, restaurantController.addFood)
router.post('/restaurant/drink', upload.single('photo'), verify, restaurantController.addDrink)

router.get('/restaurants', restaurantController.listRestaurants)
router.get('/restaurant/:id', restaurantController.listRestaurant)

router.post('/restaurant/refresh', restaurantAuthController.RefreshToken )
router.post('/restaurant/logout',verify, restaurantAuthController.Logout)


router.get('/categories', CategoriesController.getCategories)

export default router