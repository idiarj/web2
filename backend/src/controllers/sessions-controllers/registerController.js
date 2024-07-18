import { CryptManager } from "../../../sub-sistemas/security/CryptManager.js"
import { registerValidation } from "../../../data/iValidation/iValidation.js"
import { v4 as uuidv4 } from 'uuid'
import users from "../../../data/json-data/users.json" assert { type: "json" }
import { userModel } from "../../../models/userModel.js"

/**
 * Controlador para registrar un usuario
 
 */

export class registerController{

    static async registerControlPost(req, res){
        console.log(`----- REGISTER CONTROLLER ----------`)

        const result = await registerValidation.validateTotal(req.body);


        if(result.error) {


            const [{message}] = result.error.issues
            return res.status(406).json({error: message})

        }

        const usernameCli = result.data['username']
        console.log(`usernameCLi ${usernameCli}`)
        const validUser = await userModel.verifyUser({user: usernameCli});
        console.log('validUser es', validUser)
        if(validUser.success){
            const [{username}] = validUser.resultSet
            const userFromModel = typeof username === 'string' ? username.toLowerCase() : null;
            console.log(`userFromModel ${userFromModel}, usernameCli ${usernameCli.toLowerCase()}, son iguales? ${(userFromModel === usernameCli.toLowerCase())} `)
            if(userFromModel === usernameCli.toLowerCase()) {
                return res.status(400).json({
                    error: "El usuario que estás intentando registrar ya existe."
                });
            }
        }

        

        try {
            console.log('entre en el trycatch del controller')
            const registerResult = await userModel.registerUser(result.data);
           
            if(registerResult && registerResult.success) {
                return res.json({mensaje: 'Usuario registrado exitosamente'});
            } else {
                return res.status(400).json({error: 'No se pudo registrar el usuario'});
            }
        } catch (error) {

            return res.status(400).json({error: 'Error al registrar el usuario', detalle: error.message});
        }
    }
}