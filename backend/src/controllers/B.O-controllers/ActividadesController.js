import { Actividades } from "../../../B.O/Actividades.js";

export class ActividadesController{
    static async createActividad(req, res){
        try {
            const {projectId} = req.params
            const {activityName, objective, startDate, endDate, prelacion, resource} = req.body
            console.log(req.params, req.body)
            const activity = await Actividades.crearActividad({projectId, activityName, objective, startDate, endDate, prelacion, resource})
            if(!activity.success) return res.status(500).json({error: activity.error})
            return res.status(200).json({msg: activity.msg})
        } catch (error) {
            return res.status(500).json({errorCatch: error.message})
        }
    }

    static async deleteActividad(req, res){

    }

    static async AsignarActividades(req, res){

    }

    static async getActividades(req, res){
        try {
            
        } catch (error) {
            
        }
    }
}