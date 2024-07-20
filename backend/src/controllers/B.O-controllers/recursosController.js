import { Recurso } from "../../../B.O/Recurso.js";
import { SessionHandler } from "../../../data/iSession/iSession.js";
import { registerValidation } from "../../../data/iValidation/iValidation.js";
export class recursoController{
    static async recursosGet(req, res){
        try {
            console.log('entre al controlador get de recursos')
            // if(!SessionHandler.verifySession(req)) return res.status(401).json({error: 'No estas autorizado para ver los recursos, por favor inicia sesion primero.'})
            const recursos = await Recurso.getRecursos()
            console.log('los recursos en el controlador son', recursos)
            return res.status(200).json({recursos})
        } catch (error) {
            return res.status(500).json({mensaje: "Error al ejecutar el controlador", detalle: error.message})
        }
    }
    static async recursosPost(req, res){
        const result = registerValidation.validateUpate(req.body)
        if(result.error) return res.status(400).json({error: 'Error en la validacion', detalle: result.error})
        const {nombre, apellido, cedula} = req.body

        try {
            console.log('entre al controlador get de recursos')
            // if(!SessionHandler.verifySession(req)) return res.status(401).json({error: 'No estas autorizado para ver los recursos, por favor inicia sesion primero.'})
            const recurso = await Recurso.crearRecurso({nombre, apellido, cedula})
            console.log(`el recurso que acabo de crear es`, recurso)
            if(!recurso.success) return res.status(500).json({mensaje: recurso.msg})
            return res.status(200).json({mensaje: recurso.msg})
        } catch (error) {
            return res.status(500).json({error: 'Error al crear el recurso', detalle: error.message})
        }
    }
}