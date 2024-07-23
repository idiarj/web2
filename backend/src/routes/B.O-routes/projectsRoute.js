import { Router } from 'express'
import { ProyectosController } from '../../controllers/B.O-controllers/projectsController.js'

export const ProyectosRouter = Router()

ProyectosRouter.post('/', ProyectosController.crearProyecto)
ProyectosRouter.delete('/:projectId', ProyectosController.eliminarProyecto)
ProyectosRouter.get('/:projectId', ProyectosController.detalleProyecto)
ProyectosRouter.get('/', ProyectosController.verProyectos)