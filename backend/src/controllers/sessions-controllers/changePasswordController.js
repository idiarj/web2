import { SessionHandler } from "../../../data/iSession/iSession.js";
import { CryptManager } from "../../../sub-sistemas/security/CryptManager.js";
import users from '../../../data/json-data/users.json' assert { type: "json" }  


export class changePasswordController{
    
    static async changePasswordConroller(req, res){
        const { newPass } = req.body
        console.log(newPass)
        if(req.session.user){
           try{
            // const oldPassword = users[0].password
            users[0].password = await CryptManager.encriptarData({data: newPass})
            // console.log(`old password: ${oldPassword}, new password: ${users[0].password}`)
            SessionHandler.closeSession(req, res)
            return res.json({mensaje: 'Contrasena cambiada con exito, por favor inicia sesion nuevamente'})
        }catch(err){
            return res.json({error: err.message})
        }
        }else{
            return res.json({error: 'No hay ninguna sesion iniciada, por favor inicia sesion para cambiar la contrasena'})
        }
    }
}