import { iPgHandler } from "../data/psql-data/iPgManager.js";

export class Proyectos{

    static async editProject({projectId, newProjectName, newMembers, newObjective, newStartDate, newEndDate, newState}) {
        const client = await iPgHandler.beginTransaction()
        try {
            let queryParams = [];
            let querySetParts = [];
    
            // Construir dinámicamente la consulta SQL
            if (newProjectName) {
                queryParams.push(newProjectName);
                querySetParts.push(`nombre_proyecto = $${queryParams.length}`);
            }
            if (newState) {
                const [{id_estado}] = await iPgHandler.exeQuery({key: 'getStateId', params: [newState], client});
                queryParams.push(id_estado);
                querySetParts.push(`id_estado = $${queryParams.length}`);
            }
            if (newStartDate) {
                queryParams.push(newStartDate);
                querySetParts.push(`fecha_inicio = $${queryParams.length}`);
            }
            if (newEndDate) {
                queryParams.push(newEndDate);
                querySetParts.push(`fecha_fin = $${queryParams.length}`);
            }
    
            if (querySetParts.length > 0) {
                queryParams.push(projectId);
                let updateQuery = `UPDATE proyectos SET ${querySetParts.join(', ')} WHERE id_proyecto = $${queryParams.length}`;
                await iPgHandler.exeQuery({query: updateQuery, params: queryParams, client});
            }
    
            // Actualizar el objetivo del proyecto si se proporciona
            if (newObjective) {
                await iPgHandler.exeQuery({key: 'updateObjective', params: [projectId, newObjective], client});
            }
    
            // Actualizar los miembros del proyecto si se proporciona la lista de nuevos miembros
            if (newMembers) {
                // Aquí deberías implementar la lógica para actualizar los miembros del proyecto
                // Esto puede incluir eliminar los miembros actuales y agregar los nuevos
            }
    
            await iPgHandler.commitTransaction(client);
            return {success: true, message: `Proyecto actualizado con éxito`};
        } catch (error) {
            await iPgHandler.rollbackTransaction(client);
            return {success: false, message: 'Error al actualizar el proyecto'};
        }
    }

    static async getProjects({userId}){
        try {
            console.log(`el user id es ${userId}`)
            const key = 'getPreInfoProjects'
            const params = [userId]
            const resultSet = await iPgHandler.exeQuery({key, params})
            return resultSet
        } catch (error) {
            console.log(error)
            return {error}
        }
    }

    static async deleteProject({project}){
        const client = await iPgHandler.beginTransaction()
        // console.log('el cliente es', client)
        try {
            await iPgHandler.exeQuery({key: "deleteObjectiveProject", params: [project], client})
            await iPgHandler.exeQuery({key: "deleteProjectMembers", params: [project], client})
            await iPgHandler.exeQuery({key: "deleteProject", params: [project], client})
            await iPgHandler.commitTransaction(client)
            return {success: true}
        } catch (error) {
            await iPgHandler.rollbackTransaction(client)
            return {success: false, error}
        }
    }

    static async createProject({owner, projectName, members, objective, startDate, endDate, state}) {
        const client = await iPgHandler.beginTransaction()
        try {
            const [{id_estado}] = await iPgHandler.exeQuery({key: 'getStateId', params: [state], client})
            const [{id_proyecto}] = await iPgHandler.exeQuery({key: 'createProject', params: [projectName, id_estado, startDate, endDate], client})
            
            await iPgHandler.exeQuery({key: 'addObjective', params: [id_proyecto, objective], client})
            let [{id_persona}] = await iPgHandler.exeQuery({key: 'getPerson', params: [owner], client})
            await iPgHandler.exeQuery({key: 'addOwner', params: [id_proyecto, id_persona], client}) 

            console.log(`por ahora todo bien, creare ${projectName, id_proyecto} con el estado ${state} y el objetivo ${objective}`)
            console.log(`la fecha de inicio es ${startDate} y la de final es ${endDate}`)
            console.log(`cantidad de miembros: ${members.length}`)
            if(members.length > 0){
                members.forEach(async (m) => {
                    console.log(m)
                    let [{id_persona}] = await iPgHandler.exeQuery({key: 'getPerson', params: [m.cedula], client})
                    m.profiles.forEach( async (p)=>{
                        console.log(p)
                        let [{id_perfil}] = await iPgHandler.exeQuery({key: 'getProfileId', params: [p]})
                        await iPgHandler.exeQuery({key: 'addMember', params: [id_proyecto, id_persona, id_perfil], client})
                    })
                });
            }

            await iPgHandler.commitTransaction(client)
            return {success: true, message: `Proyecto ${projectName} creado con exito por ${owner}`}
        } catch (error) {

            await iPgHandler.rollbackTransaction(client)
            return { succes: false, message: 'Error al crear el proyecto'}
        }
    }

    static async getMembers({project}){
        try {
            const key = 'getMembers'
            const params = [project]
            const resultSet = await iPgHandler.exeQuery({key, params})
            const members = resultSet.map((e)=>{
                return e.member
            })
            return members
        } catch (error) {
            return {error}
        }
    }

    static async getStates(){
        try {
            const key = 'getStates'
            const params = []
            const resultSet = await iPgHandler.exeQuery({key, params})
            const states = resultSet.map((e)=>{
                return e.state
            })
            return states
        } catch (error) {
            return {error}
        }
    }
}