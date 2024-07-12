import { iPgHandler } from "../data/psql-data/iPgManager.js";
import { userModel } from "../models/userModel.js";

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

    static async createProject({projectName, members}){
        const client = await iPgHandler.beginTransaction()
        try {
            const [{id_proyecto}] = await iPgHandler.exeQuery({key: 'createProject', params: [projectName], client})
            members.forEach(async (element) => {
                let [{id_persona}] = await iPgHandler.exeQuery({key: 'getPersonId', params: [element]})
                await iPgHandler.exeQuery({key: 'insert_member', params: [element]})
            });
            await iPgHandler.commitTransaction(client)
        } catch (error) {
            await iPgHandler.rollbackTransaction(client)
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
    
}