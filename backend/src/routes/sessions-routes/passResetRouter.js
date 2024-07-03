// backend/src/routes/sessions-routes/passwordResetRouter.js
import { Router } from 'express';
import passwordResetController from '../../controllers/sessions-controllers/passwordResetController.js';

export const passResetRouter = Router();

// Definir la ruta POST para el manejo de la reconfiguración de contraseña
passResetRouter.post('/forgot-password', passwordResetController);

// Exportar el router
export default passResetRouter;