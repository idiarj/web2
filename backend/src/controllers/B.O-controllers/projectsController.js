import { SessionHandler } from "../../../data/iSession/iSession.js";
import { Proyectos } from "../../../B.O/Proyectos.js";
import { projectValidation } from "../../../data/iValidation/iValidation.js";

export class ProyectosController{
    static async crearProyecto(req, res){
        console.log(`el body es`, req.body)
        const result = await projectValidation.validateTotal(req.body)
        if(!result.success){
            console.log('error en las validaciones')
            console.log(result.error.issues)
            return res.status(400).json({
            mensaje: 'Error en las validaciones al crear el proyecto',
            error: result.error.issues
        })}
        const {projectName, members, objective, startDate, endDate, state} = req.body
        try {
            const owner = req.session.userid
            console.log(`el id de usuario del creador del proyecto es ${owner}`)
            const response = await Proyectos.createProject({owner, projectName, members, objective, startDate, endDate, state})
            console.log(response)
            if(!response.success) return res.status(400).json({ error: response.message})
            return res.status(200).json({ mensaje: response.message})
        } catch (error) {
            return {error}
        }

    }

    static async verProyectos(req, res){
        const {username, userid} = req.session
        try{
            if(!(SessionHandler.verifySession(req))) return res.status(401).json({
                error: 'No hay sesion para ver sus proyectos.'
            })
            
            const projects = await Proyectos.getProjects({userId: userid})
            return res.status(200).json({
                projects
            })
        }catch(error){
            return res.status(500).json({mensaje: `Error al ver los proyectos del usuario ${username}.`, detalle: error.message})
        }
    }

    static async eliminarProyecto(req, res){
        try{
            if(!(SessionHandler.verifySession(req))) return res.status(401).json({
                error: 'No hay sesion para eliminar un proyecto.'
            })
            const {projectId} = req.params
            const {success} = await Proyectos.deleteProject({project: projectId})
            console.log(success)
            return res.status(200).json({
                deleted: `El proyecto con id ${projectId} fue ${success ? 'eliminado' : 'no eliminado'}`
            })
        }catch(error){

        }
        }

        static async detalleProyecto(req, res){
            try {
                const { projectId } = req.params
                console.log(projectId)
                console.log(`asincronia paralela go brr`)
                const [projectInfo, members, objectives] = await Promise.all([
                    Proyectos.getProject({projectId}), 
                    Proyectos.getMembers({projectId}),
                    Proyectos.getObjectives({projectId}),
                ])
                console.log('project',projectInfo.resultSet)
                console.log('members',members)
                console.log('objetivos',objectives)
                if(!projectInfo.success || !members.success || !objectives.success) return res.status(500).json({mensaje: 'Error interno.'})
                return res.status(200).json({
                    projectInfo: projectInfo.resultSet,
                    members: members.resultSet,
                    objectives: objectives.resultSet
                })
            } catch (error) {
                return res.status(500).json({
                    error: error.message
                })
            }
        
        }

        static async verMiembrosProyecto(req, res){
            try{
                if(!(SessionHandler.verifySession(req))) return res.status(401).json({
                    error: 'No hay sesion para ver los miembros de un proyecto.'
                })
                const {projectName} = req.body
                const members = await Proyectos.getMembers({id})
                return res.status(200).json({
                    miembros: `Los miembros del proyecto con id ${id} son ${members.join(', ')}`
                })
            }catch(error){

            }
        }

    }




