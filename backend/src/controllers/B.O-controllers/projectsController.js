import { SessionHandler } from "../../../data/iSession/iSession.js";
import { Proyectos } from "../../../B.O/Proyectos.js";

export class ProyectosController{
    static async crearProyecto(req, res){

    }

    static async verProyectos(req, res){
        try{
            if(!(SessionHandler.verifySession(req))) return res.status(401).json({
                error: 'No hay sesion para ver sus proyectos.'
            })
            const user = req.session.username
            const projects = await Proyectos.getProjetcsByUser({user})
            return res.status(200).json({
                proyectos: `Los proyectos el usuario ${user} son ${projects}`
            })
        }catch(error){

        }
    }

    static async eliminarProyecto(req, res){

    }

    static async detalleProyecto(req, res){
        
    }


}