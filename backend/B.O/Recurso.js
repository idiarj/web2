import { iPgHandler } from "../data/psql-data/iPgManager.js";

export class Recurso{
    static async crearRecurso({nombre, apellido, cedula}){
        try {
            const key = 'insert_persona'
            const params = [nombre, apellido, cedula]
             await iPgHandler.exeQuery({key, params})
            return {success: true, msg: 'Recurso creado con exito'}
        } catch (error) {
            console.log(error)
            return {success: false, error: `Error al crear el recurso ${error.message}`}
        }
    }

    static async eleminarRecurso({id}){
        try {
            const key = 'delete_persona'
            const params = [id]
            await iPgHandler.exeQuery({key, params})
            return {success: true, msg: "Recurso eliminado con exito."}
        } catch (error) {
            return {success: false, msg: "Error al eliminar el recurso"}
        }
    }

    static async getRecursos(){
        try {
            const key = 'getRecursos'
            const recursos = await iPgHandler.exeQuery({key})
            console.log('los recursos son', recursos)
            return recursos
        } catch (error) {
            console.log(error.message)
            return {error}
        }
    }
}