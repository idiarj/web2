import { iPgHandler } from "../data/psql-data/iPgManager.js";

export class Actividades{
    static async crearActividad({projectId, activityName, objective, startDate, endDate, prelacion, resource}){
        console.log(projectId, nombre, objective, startDate, endDate, prelacion, resource)
        // const client = iPgHandler.beginTransaction()
        try {
            // const key = 'addObjective'
            // const params = [projectId, objective]
            // const [{id_objetivo}] = await iPgHandler.exeQuery({key, params, client})
            // const key2 = 'addActivity'
            // const params2 = [id_objetivo, nombre, startDate, endDate]
            // const [{id_actividad}] = await iPgHandler.exeQuery({key: key2, params: params2, client})
            // if(prelacion){
            //     const key3 = 'addPrelation'
            //     const params3 = [id_actividad, prelacion]
            //     await iPgHandler.exeQuery({key: key3, params: params3, client})
            // }
            // if(resource){
            //     const key4 = 'addResource'
            //     const params4 = [id_actividad, resource]
            //     await iPgHandler.exeQuery({key: key4, params: params4, client})
            // }
            return {success: true, msg: `Actividad anadida con exito al proyecto ${projectId}`}
        } catch (error) {
            console.log(error)
            return {success: false, error: error.message}
        }
    }
}