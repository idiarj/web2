import { iPgHandler } from "../data/psql-data/iPgManager.js";

export class Proyectos{

    static async getProjetcsByUser({user}){
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
}