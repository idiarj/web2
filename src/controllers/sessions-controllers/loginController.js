import { validateUser } from "../../../utils/validatiotest.js"
import { instanceSess } from "../../../data/iSession/iSession.js"
import users from "../../../data/json-data/users.json" assert { type: "json" }

export class loginController {

    /**
     * Controlador para logear a un usuario
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     *
     */
    static async loginControlPost(req, res){
        const {user, password}= req.body
        console.log(`user: ${user}, password: ${password}`)

        if(!user || !password) return res.json({error: 'Por favor ingrese usuario y contraseña'})
        const valid = await validateUser(user, password);
        // console.log('valid es dentro del loginController', valid)
        if(!valid) return res.json({error: 'Usuario o contraseña incorrectos'});
        console.log(instanceSess.verifySession(req))
        if(instanceSess.verifySession(req)) return res.json({mensaje: 'ya tienes una sesion iniciada, por favor haz logout para iniciar una nueva session'});
        
        instanceSess.createSession(req)
        console.log(req.session.id)
        return res.json({mensaje: `Sesion iniciada, bienvenido ${req.session.user}`})  
}

    static async loginControlGet(req, res){
        if(instanceSess.verifySession(req)) return res.json({metodo: req.method, mensaje: `Bienvenido ${req.session.user}`})
        return res.json({mensaje: 'No hay una sesion iniciada'})
    }

}

