import { recursoController } from "../../controllers/B.O-controllers/recursosController.js";
import { Router } from "express";

export const recursosRouter = Router()

recursosRouter.get('/', recursoController.recursosGet)