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

        //Obtiene el resultao e las validaciones con zod
        const result = await registerValidation.validateTotal(req.body);

        //Si hay errores en la validaciones terminara la ejecucion de la funcion 
        //y devolvera error en la consola del browser
        if(result.error) {
            // console.log(result)
            // console.log(result.success)
            // console.log(result.error.issues)

            const [{message}] = result.error.issues
            return res.status(406).json({error: 'Datos incorrectos', error: message})

        }

        //String con el nombre de usuario en minuscula que el cliente ingreso.
        const username = result.data['username']
        const userFromModelResult = await userModel.verifyUser({user: username});
        console.log(userFromModelResult)


        if (userFromModelResult.error) {
            return res.status(400).json({error: 'Error al verificar el usuario', detalle: userFromModelResult.error});
        }

        const userFromModel = typeof userFromModelResult === 'string' ? userFromModelResult.toLowerCase() : null;

        if(userFromModel === username.toLowerCase()) {
            return res.status(400).json({
                error: "El usuario que estás intentando registrar ya existe."
            });
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