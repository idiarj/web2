import { Router } from "express";
import { profilesController } from "../../controllers/sessions-controllers/profilesController.js";

export const profilesRouter = Router()

profilesRouter.get('/', profilesController.getProfiles)