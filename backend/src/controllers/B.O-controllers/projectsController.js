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
                proyectos: `Los proyectos el usuario ${user} son ${projects.join(', ')}`
            })
        }catch(error){

        }
    }

    static async eliminarProyecto(req, res){
        try{
            if(!(SessionHandler.verifySession(req))) return res.status(401).json({
                error: 'No hay sesion para eliminar un proyecto.'
            })
            const {id} = req.body
            const deleted = await Proyectos.deleteProject({id})
            return res.status(200).json({
                deleted: `El proyecto con id ${id} fue ${deleted ? 'eliminado' : 'no eliminado'}`
            })
        }catch(error){

        }
        }

        static async detalleProyecto(req, res){
        
        }

        static async verMiembrosProyecto(req, res){
            try{
                if(!(SessionHandler.verifySession(req))) return res.status(401).json({
                    error: 'No hay sesion para ver los miembros de un proyecto.'
                })
                const {id} = req.body
                const members = await Proyectos.getMembers({id})
                return res.status(200).json({
                    miembros: `Los miembros del proyecto con id ${id} son ${members.join(', ')}`
                })
            }catch(error){

            }
        }

    }




