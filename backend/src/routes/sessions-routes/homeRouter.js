import { Router } from 'express'
import { homeController } from '../../controllers/homeController.js'

export const homeRouter = Router()

homeRouter.get('/', homeController.homeController)