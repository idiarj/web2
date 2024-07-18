import { iPgHandler } from "../data/psql-data/iPgManager";

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
            const key = 'delete_person'
        } catch (error) {
            
        }
    }
}