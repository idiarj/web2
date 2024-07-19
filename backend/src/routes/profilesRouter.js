import { Router } from "express";
import { profilesController } from "../controllers/profilesController.js";

export const profilesRouter = Router()

profilesRouter.get('/bussines', profilesController.getProfilesBussiness)
profilesRouter.get('/system', profilesController.getProfilesSystem)