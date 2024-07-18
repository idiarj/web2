import { Router } from 'express'
import { ProyectosController } from '../../controllers/B.O-controllers/projectsController.js'

export const ProyectosRouter = Router()

ProyectosRouter.post('/crearProyecto', ProyectosController.crearProyecto)
ProyectosRouter.delete('/:projectId', ProyectosController.eliminarProyecto)
ProyectosRouter.get('/:id', ProyectosController.detalleProyecto)
ProyectosRouter.get('/', ProyectosController.verProyectos)