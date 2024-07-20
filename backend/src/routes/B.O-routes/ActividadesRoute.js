import { Router } from 'express'
import { ActividadesController } from '../../controllers/B.O-controllers/ActividadesController.js'

export const ActividadesRouter = Router()
ActividadesRouter.post('/', ActividadesController.createActividad)
ActividadesRouter.delete('/', ActividadesController.deleteActividad)
ActividadesRouter.post('/asignar', ActividadesController.AsignarActividades)
ActividadesRouter.get('/:projectId', ActividadesController.getActividades)