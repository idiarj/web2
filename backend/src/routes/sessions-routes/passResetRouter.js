// backend/src/routes/sessions-routes/passwordResetRouter.js
import { Router } from 'express';
import { PasswordResetController } from '../../controllers/sessions-controllers/passwordResetController.js';

export const passResetRouter = Router();

// Definir la ruta POST para el manejo de la reconfiguración de contraseña
passResetRouter.post('/forgot-password', PasswordResetController.sendPasswordResetEmail);

// Exportar el router
export default passResetRouter;