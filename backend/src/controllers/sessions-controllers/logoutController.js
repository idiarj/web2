import { SessionHandler } from "../../../data/iSession/iSession.js";

export class logoutController{

    static async logoutControlPost(req, res){
    try {
        if (!SessionHandler.verifySession(req)) {
            return res.json({ mensaje: 'No hay sesion activa' });
        }
        const result = await SessionHandler.closeSession(req);
        return res.json(result);
    } catch (err) {
        return res.json({ err });
    }
}
}