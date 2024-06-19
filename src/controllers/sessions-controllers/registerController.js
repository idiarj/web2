import { CryptManager } from "../../../sub-sistemas/security/CryptManager.js"
import { instanceSess } from "../../../data/iSession/iSession.js"
import { v4 as uuidv4 } from 'uuid'
import users from "../../../data/json-data/users.json" assert { type: "json" }

/**
 * Controlador para registrar un usuario
 
 */

export class registerController{

    static async registerControlPost(req, res){
        const {user, email, password} = req.body
        if(users.find(u => u.user === user)) return res.json({error: 'Usuario ya registrado'})
        // if(users.find(u => u.email === email)) return res.json({error: 'Email ya registrado'})
        const hashedPassword = await CryptManager.encriptarData({data: password})
        const newUser = {
            id: uuidv4(), 
            user, 
            email, 
            password: hashedPassword
        }
        users.push(newUser)
        return res.json({mensaje: 'Usuario registrado', data_registrada: newUser})
    }

    static async registerControlGet(req, res){
        return res.json({error: 'Estas usando el endpoint /register pero con el metodo GET, por favor usa el metodo POST para registrarte'})
    }

}