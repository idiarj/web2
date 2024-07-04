import { instanceSess } from "../../data/iSession/iSession.js"

export const isAuthMiddleware = (req, res, next) => {
    console.log(req.session)
    console.log('body')
    console.log(req.body)
    console.log(instanceSess.verifySession)
    if(instanceSess.verifySession(req, res)) {
        console.log('hay sesion')
        next();
    } else {
        console.log('estoy en el middleware y no estas autorizado');
        res.json({error: 'No autorizado.'}); 
    }
}