import { SessionHandler } from "../../data/iSession/iSession.js"

export const isAuthMiddleware = (req, res, next) => {
    console.log(req.session)
    console.log('body')
    console.log(req.body)
    console.log(SessionHandler.verifySession)
    if(SessionHandler.verifySession(req, res)) {
        console.log('hay sesion')
        next();
    } else {
        console.log('estoy en el middleware y no estas autorizado');
        res.status(401).json({error: 'No autorizado.'}); 
    }
}