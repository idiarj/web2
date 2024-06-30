
import { instanceSess } from "../../../data/iSession/iSession.js"
// import users from "../../../data/json-data/users.json" assert { type: "json" }
import { loginValidation } from "../../../data/iValidation/iValidation.js"
import { userModel } from "../../../models/userModel.js"

export class loginController {

    /**
     * Controlador para logear a un usuario
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     *
     */
    static async loginControlPost(req, res){
        const result = await loginValidation.validateTotal(req.body)
        if(instanceSess.verifySession(req)) return res.json({mensaje: `Ya hay una sesion iniciada con el usuario ${req.session.username}`}  )
        if(result.error) return res.status(400).json({mensaje: 'Datos no validos', error: result.error})
        const {username, password} = result.data
        console.log(`Usuario: ${username}, Password: ${password}`)
        // const userFound = users.find(u => u.username === username && u.password === password)
        // console.log(userFound)

        const validUser = await userModel.verifyUser({user: username})
        const validPassword = await userModel.verifyPassword({username, password})
        console.log('el usuario es valido?', validUser)
        console.log('la contrasena es valida?', validPassword)

        if(!validUser) return res.status(400).json({error: 'Este nombre de usuario no existe.'})
        if(!validPassword) return res.status(400).json({error: 'La contrasena es incorrecta, intente de nuevo.'})
        
        instanceSess.createSession(req)
        return res.json({mensaje: `Usuario ${username} logeado`})

    }

    static async loginControlGet(req, res){
        console.log(req.session)
        console.log(req.body)
        if(instanceSess.verifySession(req)) return res.json({metodo: req.method, mensaje: `Bienvenido ${req.session.username}`})
        return res.json({mensaje: 'No hay una sesion iniciada'})
    }

}

