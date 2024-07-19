import { profilesModel } from "../../models/profilesModel.js";
import { SessionHandler } from "../../data/iSession/iSession.js";

export class profilesController{
    
    static async getProfilesSystem(req, res){
        try{
            const validSession = SessionHandler.verifySession(req)
            if(!validSession) return res.status(401).json({error: 'No hay sesion a la cual mirar sus perfiles.'})
            const user = req.session.username
            console.log(user)
            const profiles = await profilesModel.getProfilesSystem({user})
            console.log(profiles)
            req.session.profiles = profiles;
            console.log(req.session)
            return res.json({usuario: user, perfiles: req.session.profiles, sesion: req.session})
        }catch(error){
            return res.status(500).json({detalles: error.message})
        }
    }

    static async getProfilesBussiness(req, res){
        try {
            const profiles = await profilesModel.getProfilesBussines()
            return res.status(200).json({perfiles: profiles})

        } catch (error) {
            return res.status(500).json({detalles: error.message})
        }
    }
}