import { Router } from 'express'
import { ProyectosController } from '../../controllers/B.O-controllers/projectsController'

export const ProyectosRouter = Router()

ProyectosRouter.post('/crearProyecto', ProyectosController.crearProyecto)
ProyectosRouter.delete('/eliminarProyecto', ProyectosController.eliminarProyecto)
ProyectosRouter.get('/:id', ProyectosController.detalleProyecto)