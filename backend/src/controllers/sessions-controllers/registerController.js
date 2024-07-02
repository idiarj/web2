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
        // console.log(req.body)
        const result = await registerValidation.validateTotal(req.body);
        console.log('input validado')
        console.log(result)
        if(result.error) {
            console.log('hay error en la vali')
            return res.json({error: 'Datos incorrectos', error: result.error})
        }
        console.log(`yatusabe ${result.data['username']}`)
        const userExists = await userModel.verifyUser({user: result.data['username']})
        console.log(`el usuario existe? ${userExists}`)
        if(userExists) {
            return res.status(400).json({
            error: "El usuario que estas intentado registrar ya existe."
        })}

        try {
            console.log('entre en el trycatch del controller')
            const registerResult = await userModel.registerUser(result.data);
            // Si `registerUser` devuelve un objeto con información del éxito, puedes verificarlo aquí.
            // Por ejemplo, si devuelve { success: true }, puedes hacer lo siguiente:
            if(registerResult && registerResult.success) {
                return res.json({mensaje: 'Usuario registrado exitosamente'});
            } else {
                // Manejar el caso en que `registerUser` no lanza un error, pero devuelve un estado de no éxito.
                return res.json({error: 'No se pudo registrar el usuario'});
            }
        } catch (error) {
            // Manejar el error si `registerUser` falla y lanza una excepción.
            return res.json({error: 'Error al registrar el usuario', detalle: error.message});
        }
    }
}