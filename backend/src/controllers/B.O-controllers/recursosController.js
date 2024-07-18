import { Recurso } from "../../../B.O/Recurso.js";
import { SessionHandler } from "../../../data/iSession/iSession.js";

export class recursoController{
    static async recursosGet(req, res){
        try {
            console.log('entre al controlador get de recursos')
            if(!SessionHandler.verifySession(req)) return res.status(401).json({error: 'No estas autorizado para ver los recursos, por favor inicia sesion primero.'})
            const recursos = await Recurso.getRecursos()
            console.log('los recursos en el controlador son', recursos)
            return res.status(200).json({recursos})
        } catch (error) {
            return res.status(500).json({mensaje: "Error al ejecutar el controlador", detalle: error.message})
        }
    }
}