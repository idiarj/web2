import {Router} from 'express'
import { logoutController } from '../../controllers/sessions-controllers/logoutController.js';

export const logoutRouter = Router();

logoutRouter.post('/', logoutController.logoutControlPost)