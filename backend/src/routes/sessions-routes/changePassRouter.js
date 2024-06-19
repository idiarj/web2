import {Router} from 'express'
import { changePasswordController } from '../../controllers/sessions-controllers/changePasswordController.js'

export const changePassRouter = Router()

changePassRouter.patch('/', changePasswordController.changePasswordConroller)