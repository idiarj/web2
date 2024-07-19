import {iPgHandler} from '../data/psql-data/iPgManager.js'

export class profilesModel{
    static async getProfilesBussines(){
        try {
            const key = 'getRecursosProfile'
            const resultSet = await iPgHandler.exeQuery({key})
            const profiles = resultSet.map((p)=>{
                return p.rol
            })
            console.log(profiles)
            return profiles
        } catch (error) {
            return {error}
        }
    }

    static async getProfilesSystem({user}){
        try {
            const key = ''
        } catch (error) {
            return {error}
        }
    }
}