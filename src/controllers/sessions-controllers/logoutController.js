import { instanceSess } from "../../../data/iSession/iSession.js";

export class logoutController{

    static logoutControlPost(req, res){

        try {
            if (!req.session || !req.session.user) {
                return res.json({ mensaje: 'No hay sesion activa' });
            }
            instanceSess.closeSession(req, res);
            } catch (err) {
                return res.json({ err });
            }
    
            }
}