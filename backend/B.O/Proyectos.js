import { iPgHandler } from "../data/psql-data/iPgManager.js";

export class Proyectos{

    static async getProjectsByUser({user}){
        try {
            const key = 'getProjectsByUser'
            const params = [user]
            const resultSet = await iPgHandler.exeQuery({key, params})
            const projects = resultSet.map((e)=>{
                return e.project
            })
            console.log(projects)
            return projects
        } catch (error) {
            return {error}
        }
    }

    static async deleteProject({project}){
        try {
            const key = 'deleteProject'
            const params = [project]
            const resultSet = await iPgHandler.exeQuery({key, params})
            return resultSet
        } catch (error) {
            return {error}
        }
    }

    static async createProject({owner, projectName, members, objective, startDate, endDate, state}) {
        const client = await iPgHandler.beginTransaction()
        try {
            const [{id_estado}] = await iPgHandler.exeQuery({key: 'getStateId', params: [state], client})
            const [{id_proyecto}] = await iPgHandler.exeQuery({key: 'createProject', params: [projectName, id_estado, startDate, endDate], client})
            
            await iPgHandler.exeQuery({key: 'addObjective', params: [id_proyecto, objective], client})
            await iPgHandler.exeQuery({key: 'addOwner', params: [id_proyecto, owner], client}) 

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