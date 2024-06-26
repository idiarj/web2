import { instanceSess } from "../../../data/iSession/iSession.js";

export class logoutController{

    static logoutControlPost(req, res){

        try {
            if (!instanceSess.verifySession) {
                return res.json({ mensaje: 'No hay sesion activa' });
            }
            instanceSess.closeSession(req, res);
            return res.json({mensaje: `sesion cerrada con exito`})
            } catch (err) {
                return res.json({ err });
            }
    
            }
}