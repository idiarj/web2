
import { instanceSess } from "../../../data/iSession/iSession.js"
import users from "../../../data/json-data/users.json" assert { type: "json" }
import { loginValidation } from "../../../data/iValidation/iValidation.js"

export class loginController {

    /**
     * Controlador para logear a un usuario
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     *
     */
    static async loginControlPost(req, res){
        const result = await loginValidation.validateTotal(req.body)
        if(instanceSess.verifySession(req)) return res.json({mensaje: `Ya hay una sesion iniciada con el usuario ${req.session.user}`}  )
        if(result.error) return res.json({mensaje: 'Datos incorrectos', error: result.error})
        const {user, password} = result.data
        const userFound = users.find(u => u.user === user)
        if(userFound){
            instanceSess.createSession(req)
            return res.json({mensaje: `Usuario ${user} logeado`})
        }else{
            return res.statusCode(422).json({mensaje: 'Datos incorrectos'})
        }
        
        
        
    }

    static async loginControlGet(req, res){
        if(instanceSess.verifySession(req)) return res.json({metodo: req.method, mensaje: `Bienvenido ${req.session.user}`})
        return res.json({mensaje: 'No hay una sesion iniciada'})
    }

}

