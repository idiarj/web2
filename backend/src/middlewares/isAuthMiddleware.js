import { instanceSess } from "../../data/iSession/iSession.js"

export const isAuthMiddleware = (req, res, next) => {
    if(instanceSess.verifySession) {
        next();
    } else {
        console.log('estoy en el middleware y no estas autorizado');
        res.redirect('/login'); // Redirige al cliente a la página de inicio de sesión
    }
}