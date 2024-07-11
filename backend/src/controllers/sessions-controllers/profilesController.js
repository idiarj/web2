import { userModel } from "../../../models/userModel.js";
import { SessionHandler } from "../../../data/iSession/iSession.js";

export class profilesController{
    
    static async getProfiles(req, res){
        try{
            const validSession = SessionHandler.verifySession(req)
            if(!validSession) return res.status(401).json({error: 'No hay sesion a la cual mirar sus perfiles.'})
            const user = req.session.username
            console.log(user)
            const profiles = await userModel.getProfiles({user})
            console.log(profiles)
            req.session.profiles = profiles;
            console.log(req.session)
            return res.json({usuario: user, perfiles: req.session.profiles, sesion: req.session})
        }catch(error){
            return {error}
        }
    }
}