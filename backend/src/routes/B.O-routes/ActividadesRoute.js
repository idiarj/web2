import { Router } from 'express'
import { ActividadesController } from '../../controllers/B.O-controllers/ActividadesController.js'

export const ActividadesRouter = Router()
ActividadesRouter.post('/:projectId', ActividadesController.createActividad)
ActividadesRouter.delete('/:projectId', ActividadesController.deleteActividad)
ActividadesRouter.post('/:projectId/asignar', ActividadesController.AsignarActividades)
ActividadesRouter.get('/:projectId', ActividadesController.getActividades)