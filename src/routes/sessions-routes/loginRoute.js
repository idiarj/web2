import { Router } from 'express'
import { loginController } from '../../controllers/sessions-controllers/loginController.js'
/**
 * @type {Router} - Enrutador para las peticiones POST y GET del endpoint /login.
 */
export const loginRouter = Router()

loginRouter.post('/', loginController.loginControlPost)
loginRouter.get('/', loginController.loginControlGet)